import { GoogleGenAI, type Content } from '@google/genai';
import { NextResponse } from 'next/server';
import {
  MAX_MODEL_CHAT_MESSAGES,
  normalizeYantraChatMessages,
  YANTRA_MODEL,
  yantraSystemPrompt,
  type YantraChatMessage,
} from '@/src/features/chat/yantra-chat';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';
import { upsertAuthenticatedChatHistory } from '@/src/lib/supabase/chat-history';

export const runtime = 'nodejs';

type ChatRequestBody = {
  messages?: YantraChatMessage[];
};

function toGeminiContent(message: YantraChatMessage): Content {
  return {
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const fullConversation = normalizeYantraChatMessages(body.messages);
    const messages = fullConversation.slice(-MAX_MODEL_CHAT_MESSAGES);

    if (messages.length === 0) {
      return NextResponse.json({ error: 'A message is required to start the chat.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing Gemini API key. Set GEMINI_API_KEY in your environment.' },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: YANTRA_MODEL,
      contents: messages.map(toGeminiContent),
      config: {
        systemInstruction: yantraSystemPrompt,
        temperature: 0.7,
        maxOutputTokens: 700,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      throw new Error('Yantra returned an empty response.');
    }

    if (hasSupabaseEnv()) {
      try {
        await upsertAuthenticatedChatHistory([...fullConversation, { role: 'assistant', content: reply }]);
      } catch (error) {
        console.error('Yantra chat history persistence error:', error);
      }
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Yantra chat error:', error);

    return NextResponse.json(
      { error: 'Yantra is unavailable right now. Please try again in a moment.' },
      { status: 500 },
    );
  }
}
