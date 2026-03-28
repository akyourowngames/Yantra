export type YantraRoomField =
  | 'python'
  | 'web-dev'
  | 'machine-learning'
  | 'data-science'
  | 'ai-foundations'
  | 'javascript'
  | 'design';

export type YantraRoomLevel = 'beginner' | 'intermediate' | 'advanced';

export type YantraRoomDifficulty = 1 | 2 | 3 | 4 | 5;

export type YantraRoomType = 'concept' | 'practice' | 'debug' | 'project' | 'reflection' | 'quiz';

export type YantraWorkspaceType =
  | 'editor'
  | 'split-editor-preview'
  | 'notebook'
  | 'canvas'
  | 'quiz'
  | 'chat-guided';

export type YantraEvaluationMode = 'rule-based' | 'ai-reviewed' | 'hybrid';

export type YantraRoomFile = {
  path: string;
  language: string;
  content: string;
  readonly?: boolean;
};

export type YantraRoomDataset = {
  name: string;
  columns: string[];
  sample_rows: Record<string, string | number | boolean>[];
};

export type YantraRoomSchema = {
  id: string;
  slug: string;
  field: YantraRoomField;
  room_type: YantraRoomType;
  level: YantraRoomLevel;
  difficulty: YantraRoomDifficulty;
  title: string;
  subtitle: string;
  summary: string;
  estimated_minutes: number;
  xp_reward: number;
  learner_context: {
    target_skill: string;
    goal_tag: string;
    prerequisite_skills: string[];
  };
  learning_objectives: string[];
  success_criteria: string[];
  instructions: {
    intro: string;
    task: string;
    steps: string[];
    deliverable: string;
  };
  hints: Array<{
    id: string;
    title: string;
    content: string;
    unlock_after_attempts?: number;
  }>;
  resources: Array<{
    label: string;
    type: 'note' | 'example' | 'formula' | 'reference';
    content: string;
  }>;
  workspace: {
    type: YantraWorkspaceType;
    starter_state: {
      text?: string;
      files?: YantraRoomFile[];
      dataset?: YantraRoomDataset;
      ui_blocks?: string[];
    };
  };
  evaluation: {
    mode: YantraEvaluationMode;
    checks: Array<{
      id: string;
      label: string;
      type: 'output-match' | 'code-pattern' | 'manual' | 'ai-rubric' | 'test-case';
      expected?: string;
      rubric?: string;
    }>;
    feedback_style: 'strict' | 'supportive' | 'mentor-like';
  };
  ai_support: {
    enabled: boolean;
    role: 'coach' | 'reviewer' | 'debugger' | 'explainer';
    allowed_actions: Array<'hint' | 'explain' | 'review' | 'nudge' | 'next-step'>;
  };
  next_paths: {
    on_success: string[];
    on_retry: string[];
    on_stretch: string[];
  };
  field_config?: {
    runtime?: 'python' | 'browser' | 'none';
    preview?: 'html-live' | 'react-live' | 'chart' | 'none';
    libraries?: string[];
    allowed_file_types?: string[];
    special_rules?: string[];
  };
};
