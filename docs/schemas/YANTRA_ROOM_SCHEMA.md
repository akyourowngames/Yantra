# Yantra Room Schema

## Purpose

This document defines the recommended schema for Yantra practice rooms.

The goal is:

- one reusable room system across all learning fields
- AI-generated room content without hardcoding hundreds of rooms
- one consistent frontend renderer
- one consistent progress and evaluation model

## Design Rule

Yantra should use:

- one universal room schema
- one small `field_config` extension per field when needed

Yantra should not use:

- a completely different room schema for Python
- a completely different room schema for web development
- a completely different room schema for machine learning

The correct architecture is:

**shared room skeleton + field-specific adapter**

## Core Types

```ts
type YantraRoomField =
  | 'python'
  | 'web-dev'
  | 'machine-learning'
  | 'data-science'
  | 'ai-foundations'
  | 'javascript'
  | 'design';

type YantraRoomLevel = 'beginner' | 'intermediate' | 'advanced';

type YantraRoomDifficulty = 1 | 2 | 3 | 4 | 5;

type YantraRoomType =
  | 'concept'
  | 'practice'
  | 'debug'
  | 'project'
  | 'reflection'
  | 'quiz';

type YantraWorkspaceType =
  | 'editor'
  | 'split-editor-preview'
  | 'notebook'
  | 'canvas'
  | 'quiz'
  | 'chat-guided';

type YantraEvaluationMode = 'rule-based' | 'ai-reviewed' | 'hybrid';
```

## Universal Room Schema

```ts
type YantraRoomSchema = {
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
      files?: Array<{
        path: string;
        language: string;
        content: string;
        readonly?: boolean;
      }>;
      dataset?: {
        name: string;
        columns: string[];
        sample_rows: Record<string, string | number | boolean>[];
      };
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
```

## Why This Structure

This schema is designed so Yantra can:

- render one consistent room UI
- generate many rooms from AI without losing structure
- support multiple fields without duplicating architecture
- attach evaluation and progress logic cleanly
- plug in field-specific runtimes later

## Field Extension Examples

### Python

```json
{
  "field_config": {
    "runtime": "python",
    "preview": "none",
    "libraries": ["math", "random"],
    "allowed_file_types": [".py"],
    "special_rules": ["single_file_beginner_mode"]
  }
}
```

### Web Development

```json
{
  "field_config": {
    "runtime": "browser",
    "preview": "html-live",
    "libraries": [],
    "allowed_file_types": [".html", ".css", ".js"],
    "special_rules": ["live_preview_required"]
  }
}
```

### Machine Learning

```json
{
  "field_config": {
    "runtime": "python",
    "preview": "chart",
    "libraries": ["pandas", "matplotlib", "scikit-learn"],
    "allowed_file_types": [".py", ".csv"],
    "special_rules": ["dataset_visible", "result_explanation_required"]
  }
}
```

## Example Room Object

```json
{
  "id": "room_python_loops_beginner_01",
  "slug": "python-loops-first-pattern",
  "field": "python",
  "room_type": "practice",
  "level": "beginner",
  "difficulty": 1,
  "title": "Your First Loop Pattern",
  "subtitle": "Repeat logic without repeating code",
  "summary": "Learn how a loop works by printing a simple number pattern.",
  "estimated_minutes": 18,
  "xp_reward": 40,
  "learner_context": {
    "target_skill": "python loops",
    "goal_tag": "coding fundamentals",
    "prerequisite_skills": ["variables", "print statements"]
  },
  "learning_objectives": [
    "Understand what a loop does",
    "Use a basic range loop",
    "Read repeated output"
  ],
  "success_criteria": [
    "Code runs without errors",
    "Output matches expected pattern",
    "Learner can explain the loop in one sentence"
  ],
  "instructions": {
    "intro": "You will write a small loop to print numbers from 1 to 5.",
    "task": "Complete the Python code so it prints 1, 2, 3, 4, 5 on separate lines.",
    "steps": [
      "Read the starter code",
      "Fill the missing loop",
      "Run and compare output"
    ],
    "deliverable": "A working Python snippet with correct output"
  },
  "hints": [
    {
      "id": "hint_1",
      "title": "Think repetition",
      "content": "A loop is useful when you want the same action many times."
    },
    {
      "id": "hint_2",
      "title": "Use range",
      "content": "Try a for loop with range(1, 6).",
      "unlock_after_attempts": 1
    }
  ],
  "resources": [
    {
      "label": "Loop reminder",
      "type": "note",
      "content": "for i in range(start, stop): runs until stop - 1"
    }
  ],
  "workspace": {
    "type": "editor",
    "starter_state": {
      "files": [
        {
          "path": "main.py",
          "language": "python",
          "content": "# print numbers 1 to 5\n"
        }
      ]
    }
  },
  "evaluation": {
    "mode": "hybrid",
    "checks": [
      {
        "id": "check_output",
        "label": "Output matches expected values",
        "type": "output-match",
        "expected": "1\n2\n3\n4\n5"
      },
      {
        "id": "check_readability",
        "label": "Code uses a loop instead of repeated print lines",
        "type": "code-pattern"
      }
    ],
    "feedback_style": "supportive"
  },
  "ai_support": {
    "enabled": true,
    "role": "coach",
    "allowed_actions": ["hint", "explain", "review", "next-step"]
  },
  "next_paths": {
    "on_success": ["python-conditionals-beginner-01"],
    "on_retry": ["python-loops-first-pattern"],
    "on_stretch": ["python-nested-loops-beginner-01"]
  },
  "field_config": {
    "runtime": "python",
    "preview": "none",
    "libraries": [],
    "allowed_file_types": [".py"],
    "special_rules": ["single_file_beginner_mode"]
  }
}
```

## Recommended First Build

Start with one narrow version:

- `field = python`
- `room_type = practice`
- `level = beginner`

That gives Yantra:

- one real room flow
- one working schema
- one testable renderer
- one base for future AI-generated rooms

## Expansion Rule

When adding more fields:

- keep the universal room schema stable
- only extend `field_config`
- avoid field-specific schema forks unless there is a proven need

If a field needs special behavior, add adapters, not a brand new room architecture.
