export type RoomDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type RoomBlueprint = {
  id: string;                        // unique slug e.g. "variables-room-1"
  topic: string;                     // e.g. "Variables"
  roomNumber: number;                // 1, 2, 3, or 4 within the topic
  title: string;                     // display title of the room
  learningGoal: string;              // one sentence: what the learner will achieve
  conceptSummary: string;            // 2-3 sentences explaining the concept
  difficulty: RoomDifficulty;
  estimatedMinutes: number;
  starterCode: string;               // runnable Python starter code
  expectedOutputHint: string;        // what correct output looks like
  successCriteria: string[];         // 2-4 bullet points
  starterGuidance: string[];         // 2-3 hints
  bannedConcepts: string[];          // concepts NOT allowed in this room
  phaseLabel: string;                // e.g. "Variables // Room 1"
};
