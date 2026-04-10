import type { RoomBlueprint } from '@/src/features/rooms/room-blueprint';
import { createClient } from './server';

type PythonRoomRow = {
  id: string;
  topic: string;
  room_number: number;
  title: string;
  learning_goal: string;
  concept_summary: string;
  difficulty: string;
  estimated_minutes: number;
  starter_code: string;
  expected_output_hint: string;
  success_criteria: string[];
  starter_guidance: string[];
  banned_concepts: string[];
  phase_label: string;
};

function rowToBlueprint(row: PythonRoomRow): RoomBlueprint {
  return {
    id: row.id,
    topic: row.topic,
    roomNumber: row.room_number,
    title: row.title,
    learningGoal: row.learning_goal,
    conceptSummary: row.concept_summary,
    difficulty: row.difficulty as RoomBlueprint['difficulty'],
    estimatedMinutes: row.estimated_minutes,
    starterCode: row.starter_code,
    expectedOutputHint: row.expected_output_hint,
    successCriteria: row.success_criteria,
    starterGuidance: row.starter_guidance,
    bannedConcepts: row.banned_concepts,
    phaseLabel: row.phase_label,
  };
}

export async function fetchPythonRooms(): Promise<RoomBlueprint[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('python_rooms')
      .select('*')
      .order('topic')
      .order('room_number');

    if (error || !data || data.length === 0) {
      console.warn('python_rooms table unavailable, using local blueprints as fallback.');
      const { roomBlueprints } = await import('@/src/features/rooms/room-blueprints');
      return roomBlueprints;
    }

    return data.map(rowToBlueprint);
  } catch {
    console.warn('Supabase unreachable, using local blueprints as fallback.');
    const { roomBlueprints } = await import('@/src/features/rooms/room-blueprints');
    return roomBlueprints;
  }
}

export async function fetchPythonRoomById(id: string): Promise<RoomBlueprint | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('python_rooms')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const { roomBlueprints } = await import('@/src/features/rooms/room-blueprints');
      return roomBlueprints.find((r) => r.id === id) ?? null;
    }

    return rowToBlueprint(data);
  } catch {
    const { roomBlueprints } = await import('@/src/features/rooms/room-blueprints');
    return roomBlueprints.find((r) => r.id === id) ?? null;
  }
}
