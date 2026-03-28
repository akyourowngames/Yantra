'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Circle,
  Code2,
  Database,
  HelpCircle,
  Layers3,
  LogOut,
  Play,
  Save,
  Settings2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { ChatProvider, useChatWidget } from '@/src/features/chat/ChatWidget';
import YantraAmbientBackground from '@/src/features/dashboard/YantraAmbientBackground';
import type { StudentDashboardProfile } from '@/src/features/dashboard/student-dashboard-model';
import { buildRoomHref, getYantraRoomBySlug } from '@/src/features/rooms/room-content';
import type {
  YantraRoomDataset,
  YantraRoomField,
  YantraRoomFile,
  YantraRoomSchema,
  YantraRoomType,
} from '@/src/features/rooms/room-schema';

type RoomExperienceProps = {
  learner: StudentDashboardProfile;
  room: YantraRoomSchema;
};

const fieldMeta: Record<
  YantraRoomField,
  {
    label: string;
    icon: LucideIcon;
    accent: string;
  }
> = {
  python: { label: 'Python', icon: Code2, accent: 'from-white/14 via-white/8 to-transparent' },
  'web-dev': { label: 'Web Dev', icon: Layers3, accent: 'from-white/12 via-white/7 to-transparent' },
  'machine-learning': { label: 'Machine Learning', icon: BrainCircuit, accent: 'from-white/15 via-white/9 to-transparent' },
  'data-science': { label: 'Data Science', icon: Database, accent: 'from-white/14 via-white/8 to-transparent' },
  'ai-foundations': { label: 'AI Foundations', icon: Sparkles, accent: 'from-white/15 via-white/9 to-transparent' },
  javascript: { label: 'JavaScript', icon: Code2, accent: 'from-white/14 via-white/8 to-transparent' },
  design: { label: 'Design', icon: Layers3, accent: 'from-white/13 via-white/7 to-transparent' },
};

const roomTypeLabels: Record<YantraRoomType, string> = {
  concept: 'Concept Room',
  practice: 'Practice Room',
  debug: 'Debug Room',
  project: 'Project Room',
  reflection: 'Reflection Room',
  quiz: 'Quiz Room',
};

const mentorActionCopy: Record<string, string> = {
  hint: 'Give a hint',
  explain: 'Explain the concept',
  review: 'Review my logic',
  nudge: 'Nudge me forward',
  'next-step': 'What should I do next?',
};

function formatLevel(level: YantraRoomSchema['level']) {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function buildMentorPrompt(room: YantraRoomSchema, learner: StudentDashboardProfile, action: string) {
  const actionLabel = mentorActionCopy[action] ?? 'Help me';

  return [
    `${actionLabel} inside ${room.title}.`,
    `Learner: ${learner.firstName}.`,
    `Field: ${fieldMeta[room.field].label}.`,
    `Task: ${room.instructions.task}`,
  ].join(' ');
}

function buildMentorMessage(room: YantraRoomSchema, learner: StudentDashboardProfile) {
  return `You are inside ${room.title}, ${learner.firstName}. Stay precise, finish one clean pass, and only call the mentor when your own reasoning hits a wall.`;
}

function getPrimaryResource(room: YantraRoomSchema) {
  return room.resources[0] ?? null;
}

function getDefaultFile(room: YantraRoomSchema) {
  return room.workspace.starter_state.files?.[0] ?? null;
}

function RoomWordmark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-[0_18px_50px_rgba(255,255,255,0.06)]">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0.35)_40%,transparent_72%)] font-semibold text-black">
          Y
        </div>
      </div>

      <div className="font-['Space_Grotesk'] text-2xl font-semibold leading-none tracking-[-0.06em] text-white">YANTRA.</div>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - value / 100);

  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <svg className="-rotate-90" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-mono text-[9px] uppercase tracking-[0.14em] text-white">{value}%</span>
    </div>
  );
}

function CodeSurface({
  file,
  dataset,
}: {
  file: YantraRoomFile | null;
  dataset: YantraRoomDataset | undefined;
}) {
  const lines = file?.content.split('\n') ?? [];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
      <div className="overflow-hidden rounded-[2rem] bg-[#111111]/92 shadow-[0_32px_90px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.06] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
              {file?.language ?? 'workspace'}
            </span>
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
              {file?.path ?? 'Untitled'}
            </span>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-white/30 sm:inline">Live Draft</span>
        </div>

        <div className="overflow-x-auto px-3 py-4 sm:px-5 sm:py-5">
          <div className="min-w-[34rem]">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5">
              <div className="select-none text-right font-mono text-[11px] leading-7 text-white/18">
                {lines.map((_, index) => (
                  <div key={`line-${index + 1}`}>{index + 1}</div>
                ))}
              </div>

              <pre className="overflow-hidden whitespace-pre-wrap break-words font-mono text-[13px] leading-7 text-white/88">
                {file?.content ?? 'No workspace file available for this room yet.'}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {dataset ? (
          <div className="overflow-hidden rounded-[2rem] bg-white/[0.05] shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Dataset Surface</div>
                <div className="mt-1 text-sm font-medium text-white">{dataset.name}</div>
              </div>
              <Database className="h-4 w-4 text-white/45" />
            </div>

            <div className="overflow-x-auto px-4 pb-4 sm:px-5 sm:pb-5">
              <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
                <thead>
                  <tr>
                    {dataset.columns.map((column) => (
                      <th
                        key={column}
                        className="whitespace-nowrap px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.sample_rows.map((row, index) => (
                    <tr key={`row-${index}`} className="bg-white/[0.04]">
                      {dataset.columns.map((column) => (
                        <td key={`${index}-${column}`} className="whitespace-nowrap rounded-2xl px-3 py-3 text-white/78">
                          {String(row[column])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <div className="rounded-[2rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.06] backdrop-blur-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Execution Frame</div>
          <div className="mt-3 text-sm leading-7 text-white/72">
            {dataset
              ? 'Inspect the dataset first, then write your reasoning in a way the mentor can verify quickly.'
              : 'Keep the logic readable. One stable pass matters more than adding clever complexity too early.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuidedSurface({ room }: { room: YantraRoomSchema }) {
  const promptText = room.workspace.starter_state.text ?? room.instructions.task;
  const uiBlocks = room.workspace.starter_state.ui_blocks ?? [];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="rounded-[2rem] bg-[#111111]/92 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.06] backdrop-blur-2xl sm:p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">Prompt Draft</div>
        <pre className="mt-4 whitespace-pre-wrap break-words font-['Inter'] text-sm leading-7 text-white/86">{promptText}</pre>
      </div>

      <div className="grid gap-4">
        {uiBlocks.map((block) => (
          <div
            key={block}
            className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">UI Block</div>
            <div className="mt-3 text-base font-medium text-white">{block.replace(/-/g, ' ')}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">
              Keep the output concise, structured, and easy for the mentor to compare side by side.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkspaceSurface({
  room,
  activeFilePath,
  onFileChange,
}: {
  room: YantraRoomSchema;
  activeFilePath: string | null;
  onFileChange: (path: string) => void;
}) {
  const files = room.workspace.starter_state.files ?? [];
  const activeFile = files.find((file) => file.path === activeFilePath) ?? files[0] ?? null;
  const dataset = room.workspace.starter_state.dataset;

  return (
    <section className="space-y-4">
      {files.length > 0 ? (
        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-max items-center gap-2">
            {files.map((file) => (
              <button
                key={file.path}
                type="button"
                onClick={() => onFileChange(file.path)}
                className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
                  activeFile?.path === file.path
                    ? 'bg-white text-black'
                    : 'border border-white/[0.08] bg-white/[0.04] text-white/52 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {file.path}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {room.workspace.type === 'chat-guided' ? (
        <GuidedSurface room={room} />
      ) : (
        <CodeSurface file={activeFile} dataset={dataset} />
      )}
    </section>
  );
}

function RoomShell({ learner, room }: RoomExperienceProps) {
  const { openChat } = useChatWidget();
  const defaultFile = getDefaultFile(room);
  const primaryResource = getPrimaryResource(room);
  const nextRoom = useMemo(() => {
    const nextSlug = room.next_paths.on_success[0];
    return nextSlug ? getYantraRoomBySlug(nextSlug) : null;
  }, [room]);
  const stretchRoom = useMemo(() => {
    const stretchSlug = room.next_paths.on_stretch[0];
    return stretchSlug ? getYantraRoomBySlug(stretchSlug) : null;
  }, [room]);

  const [activeFilePath, setActiveFilePath] = useState<string | null>(defaultFile?.path ?? null);
  const [completedCriteria, setCompletedCriteria] = useState<number[]>(room.success_criteria.length > 0 ? [0] : []);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [statusNote, setStatusNote] = useState('Session loaded');

  const meta = fieldMeta[room.field];
  const completion = room.success_criteria.length
    ? Math.round((completedCriteria.length / room.success_criteria.length) * 100)
    : 0;

  return (
    <div className="relative min-h-screen bg-[#080808] text-white">
      <YantraAmbientBackground />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/72 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1800px] flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6 xl:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
              <RoomWordmark />

              <div className="hidden h-6 w-px bg-white/[0.08] lg:block" />

              <div className="hidden min-w-0 items-center gap-3 lg:flex">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/36">Session:</span>
                <span className="truncate font-mono text-[11px] uppercase tracking-[0.34em] text-white/78">
                  {room.title}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/64">
                {formatLevel(room.level)}
              </span>

              <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/56 md:inline-flex">
                {roomTypeLabels[room.room_type]}
              </span>

              <div className="hidden items-center gap-3 md:flex">
                <ProgressRing value={completion} />
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/48">{completion}% complete</div>
              </div>

              <div className="hidden items-center gap-2 text-white/45 lg:flex">
                <HelpCircle className="h-4 w-4" />
                <Settings2 className="h-4 w-4" />
              </div>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Exit Room
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1800px] px-4 pb-44 pt-5 md:px-6 md:pb-36 md:pt-7 xl:px-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] 2xl:grid-cols-[18.5rem_minmax(0,1fr)_22rem]">
            <aside className="order-2 space-y-5 xl:order-1 xl:col-span-2 2xl:col-span-1 2xl:sticky 2xl:top-[6.5rem] 2xl:self-start">
              <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(15,15,15,0.9))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Instruction Set</div>
                <div className="mt-5 flex items-start gap-3">
                  <div className="mt-1 rounded-2xl bg-white/[0.05] p-3 text-white/45">
                    <meta.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="font-['Space_Grotesk'] text-[clamp(2rem,3.6vw,3.35rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
                      {room.title}
                    </h1>
                    <p className="mt-4 text-base leading-8 text-white/68">{room.instructions.task}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Success Criteria</div>
                <div className="mt-5 space-y-4">
                  {room.success_criteria.map((criterion, index) => {
                    const done = completedCriteria.includes(index);
                    return (
                      <button
                        key={criterion}
                        type="button"
                        onClick={() =>
                          setCompletedCriteria((current) =>
                            current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
                          )
                        }
                        className="flex w-full items-start gap-3 text-left"
                      >
                        {done ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-white/22" />
                        )}
                        <span className={`text-sm leading-7 ${done ? 'text-white/88' : 'text-white/58'}`}>{criterion}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[2rem] bg-white/[0.05] shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setHintsOpen((current) => !current)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Hints</div>
                    <div className="mt-2 text-sm text-white/66">{hintsOpen ? 'Collapse clues' : 'Reveal only if needed'}</div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-white/45 transition-transform ${hintsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {hintsOpen ? (
                  <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
                    {room.hints.map((hint) => (
                      <div key={hint.id} className="rounded-[1.5rem] bg-black/24 p-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">{hint.title}</div>
                        <div className="mt-3 text-sm leading-7 text-white/72">{hint.content}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>

              <section className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Signed In As</div>
                <div className="mt-4 text-sm text-white/82">{learner.email}</div>
              </section>
            </aside>

            <section className="order-1 space-y-6 xl:order-2">
              <section className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(165deg,rgba(27,27,27,0.96),rgba(15,15,15,0.92))] p-5 shadow-[0_38px_110px_rgba(0,0,0,0.34)] ring-1 ring-white/[0.06] backdrop-blur-2xl sm:p-7 lg:p-8">
                <div className={`pointer-events-none absolute inset-x-10 top-0 hidden h-32 bg-gradient-to-b ${meta.accent} blur-3xl lg:block`} />

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/34">{meta.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/28">Difficulty {room.difficulty}</span>
                  </div>

                  <div className="mt-5 max-w-[17ch] font-['Space_Grotesk'] text-[clamp(2.6rem,6vw,5.45rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-white">
                    {room.subtitle}
                  </div>

                  <div className="mt-6 max-w-3xl text-[15px] leading-8 text-white/62 sm:text-lg">{room.summary}</div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.75rem] bg-white/[0.04] px-4 py-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">Target Skill</div>
                      <div className="mt-2 text-sm text-white/78">{room.learner_context.target_skill}</div>
                    </div>
                    <div className="rounded-[1.75rem] bg-white/[0.04] px-4 py-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">Estimated Time</div>
                      <div className="mt-2 text-sm text-white/78">{room.estimated_minutes} min</div>
                    </div>
                    <div className="rounded-[1.75rem] bg-white/[0.04] px-4 py-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">XP Reward</div>
                      <div className="mt-2 text-sm text-white/78">{room.xp_reward} xp</div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2.25rem] bg-[linear-gradient(180deg,rgba(22,22,22,0.94),rgba(13,13,13,0.94))] p-5 shadow-[0_32px_90px_rgba(0,0,0,0.3)] ring-1 ring-white/[0.06] backdrop-blur-2xl sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Workspace</div>
                    <div className="mt-2 text-sm leading-7 text-white/64">{room.instructions.intro}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openChat({ message: buildMentorPrompt(room, learner, 'review') })}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask Mentor
                  </button>
                </div>

                <div className="mt-6">
                  <WorkspaceSurface room={room} activeFilePath={activeFilePath} onFileChange={setActiveFilePath} />
                </div>
              </section>

              <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
                <div className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Sequence</div>
                  <div className="mt-4 space-y-3">
                    {room.instructions.steps.map((step, index) => (
                      <div key={step} className="flex items-start gap-3 rounded-[1.5rem] bg-black/18 px-4 py-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] font-mono text-[10px] uppercase tracking-[0.16em] text-white/64">
                          {index + 1}
                        </div>
                        <div className="text-sm leading-7 text-white/74">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Deliverable</div>
                  <div className="mt-4 text-sm leading-7 text-white/74">{room.instructions.deliverable}</div>

                  {primaryResource ? (
                    <div className="mt-5 rounded-[1.5rem] bg-black/20 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">{primaryResource.label}</div>
                      <div className="mt-3 text-sm leading-7 text-white/68">{primaryResource.content}</div>
                    </div>
                  ) : null}
                </div>
              </section>
            </section>

            <aside className="order-3 space-y-5 xl:order-3 xl:sticky xl:top-[6.5rem] xl:self-start">
              <section className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(24,24,24,0.95),rgba(16,16,16,0.92))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.08] text-white shadow-[0_20px_45px_rgba(255,255,255,0.06)]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-black/80 p-1">
                      <span className="block h-full w-full rounded-full bg-white animate-pulse" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="font-['Space_Grotesk'] text-[1.85rem] font-semibold tracking-[-0.05em] text-white">
                      Yantra AI Mentor
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/34">
                      {room.ai_support.role} • active for {learner.firstName}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] bg-white/[0.05] p-4 text-base leading-8 text-white/72">
                  {buildMentorMessage(room, learner)}
                </div>
              </section>

              <section className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Inquiry Streams</div>
                <div className="mt-5 space-y-3">
                  {room.ai_support.allowed_actions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => openChat({ message: buildMentorPrompt(room, learner, action) })}
                      className="flex w-full items-center justify-between gap-4 rounded-[1.5rem] bg-black/18 px-4 py-4 text-left transition-colors hover:bg-white/[0.07]"
                    >
                      <span className="text-sm text-white/82">{mentorActionCopy[action] ?? action}</span>
                      <ArrowRight className="h-4 w-4 text-white/36" />
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] bg-white/[0.05] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/32">Progress Paths</div>

                <div className="mt-5 space-y-4">
                  {nextRoom ? (
                    <Link
                      href={buildRoomHref(nextRoom.slug)}
                      className="block rounded-[1.5rem] bg-black/18 px-4 py-4 transition-colors hover:bg-white/[0.07]"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">On Success</div>
                      <div className="mt-2 text-base font-medium text-white">{nextRoom.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/62">{nextRoom.subtitle}</div>
                    </Link>
                  ) : null}

                  {stretchRoom ? (
                    <Link
                      href={buildRoomHref(stretchRoom.slug)}
                      className="block rounded-[1.5rem] bg-black/18 px-4 py-4 transition-colors hover:bg-white/[0.07]"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">Stretch</div>
                      <div className="mt-2 text-base font-medium text-white">{stretchRoom.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/62">{stretchRoom.subtitle}</div>
                    </Link>
                  ) : null}
                </div>
              </section>
            </aside>
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/[0.06] bg-black/78 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 xl:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous Step
              </Link>

              <button
                type="button"
                onClick={() => openChat({ message: buildMentorPrompt(room, learner, 'hint') })}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Ask Mentor
              </button>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-3 md:justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                <span className="h-1.5 w-8 rounded-full bg-white" />
                <span className="h-1.5 w-8 rounded-full bg-white/18" />
                <span className="h-1.5 w-8 rounded-full bg-white/18" />
              </div>

              <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.24em] text-white/36">{statusNote}</span>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setCompletedCriteria(room.success_criteria.map((_, index) => index));
                  setStatusNote('Criteria synced');
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition-colors hover:bg-white/90"
              >
                <Play className="h-3.5 w-3.5" />
                Check Work
              </button>

              <button
                type="button"
                onClick={() => setStatusNote('Progress captured locally')}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <Save className="h-3.5 w-3.5" />
                Save Progress
              </button>

              {nextRoom ? (
                <Link
                  href={buildRoomHref(nextRoom.slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  Next Level
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomExperience(props: RoomExperienceProps) {
  return (
    <ChatProvider showLauncher={false}>
      <RoomShell {...props} />
    </ChatProvider>
  );
}
