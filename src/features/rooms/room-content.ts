import type { YantraRoomSchema } from './room-schema';

export const yantraRooms: YantraRoomSchema[] = [
  {
    id: 'room_python_control_flow_beginner_01',
    slug: 'python-room',
    field: 'python',
    room_type: 'practice',
    level: 'beginner',
    difficulty: 2,
    title: 'Control Flow Calibration',
    subtitle: 'Build a clean loop and branching habit before the harder rooms unlock.',
    summary:
      'This room trains the beginner rhythm of reading input, shaping conditions, and producing a predictable output without repeating code.',
    estimated_minutes: 18,
    xp_reward: 40,
    learner_context: {
      target_skill: 'python control flow',
      goal_tag: 'coding fundamentals',
      prerequisite_skills: ['variables', 'print statements'],
    },
    learning_objectives: [
      'Use a loop without repeating logic manually',
      'Combine branching with clean output',
      'Read code flow before writing the next line',
    ],
    success_criteria: [
      'Create a stable loop that processes each score exactly once',
      'Use conditional logic to label strong, average, and low results',
      'Keep the output readable enough for someone else to follow immediately',
    ],
    instructions: {
      intro:
        'You are inside a focused practice room, not a passive lesson. Read the task once, shape the loop, and let the mentor help only when you are actually stuck.',
      task:
        'Complete the script so it loops through the learner scores, assigns a performance label, and prints a clean summary line for each learner.',
      steps: [
        'Inspect the starter data and find the pattern that repeats',
        'Write one loop that handles every learner record',
        'Add a conditional branch for each score band',
        'Keep the final output short, readable, and consistent',
      ],
      deliverable: 'A working Python file that prints one labeled summary line per learner.',
    },
    hints: [
      {
        id: 'python_hint_1',
        title: 'Start with the repeated shape',
        content: 'You do not need separate print statements for each learner. One loop is enough.',
      },
      {
        id: 'python_hint_2',
        title: 'Branch by score range',
        content: 'Think in thresholds. A high score can map to Strong, then move downward from there.',
        unlock_after_attempts: 1,
      },
    ],
    resources: [
      {
        label: 'Pattern Note',
        type: 'note',
        content:
          'Loops handle repetition. Conditionals handle choice. Most beginner coding tasks become manageable once you separate those two jobs clearly.',
      },
      {
        label: 'Example Shape',
        type: 'example',
        content: 'for item in items: decide once, print once, then move forward.',
      },
    ],
    workspace: {
      type: 'editor',
      starter_state: {
        files: [
          {
            path: 'main.py',
            language: 'python',
            content: [
              "scores = [('Aarav', 91), ('Mira', 76), ('Kabir', 58), ('Ira', 83)]",
              '',
              '# TODO:',
              '# 1. loop through every learner',
              '# 2. assign a label based on score',
              "# 3. print: Aarav -> 91 -> Strong",
              '',
              'for name, score in scores:',
              '    label = ""',
              '    # your logic here',
              '    print(f"{name} -> {score} -> {label}")',
            ].join('\n'),
          },
          {
            path: 'notes.md',
            language: 'markdown',
            readonly: true,
            content: [
              '# What this room is testing',
              '- loop comfort',
              '- branch clarity',
              '- readable output',
            ].join('\n'),
          },
        ],
      },
    },
    evaluation: {
      mode: 'hybrid',
      checks: [
        {
          id: 'python_check_1',
          label: 'Loop covers all learner rows',
          type: 'code-pattern',
        },
        {
          id: 'python_check_2',
          label: 'Conditional labels are mapped correctly',
          type: 'output-match',
          expected: 'Aarav -> 91 -> Strong',
        },
        {
          id: 'python_check_3',
          label: 'Output remains structured and readable',
          type: 'ai-rubric',
          rubric: 'Review whether the learner output is consistent, concise, and easy to scan.',
        },
      ],
      feedback_style: 'supportive',
    },
    ai_support: {
      enabled: true,
      role: 'coach',
      allowed_actions: ['hint', 'explain', 'review', 'next-step'],
    },
    next_paths: {
      on_success: ['neural-net-builder'],
      on_retry: ['python-room'],
      on_stretch: ['data-explorer'],
    },
    field_config: {
      runtime: 'python',
      preview: 'none',
      libraries: [],
      allowed_file_types: ['.py', '.md'],
      special_rules: ['single_file_beginner_mode'],
    },
  },
  {
    id: 'room_neural_architecture_advanced_01',
    slug: 'neural-net-builder',
    field: 'machine-learning',
    room_type: 'debug',
    level: 'advanced',
    difficulty: 4,
    title: 'Layer Optimization',
    subtitle: 'Stabilize the backward pass before the model starts learning noise instead of signal.',
    summary:
      'This room focuses on gradient clipping inside a deeper network pass. The goal is to prevent unstable updates while keeping the learner close to the math.',
    estimated_minutes: 28,
    xp_reward: 95,
    learner_context: {
      target_skill: 'gradient clipping',
      goal_tag: 'model stability',
      prerequisite_skills: ['numpy basics', 'backprop intuition', 'matrix operations'],
    },
    learning_objectives: [
      'Understand why exploding gradients break training',
      'Calculate a global norm across trainable gradients',
      'Apply clipping without hiding the logic from the learner',
    ],
    success_criteria: [
      'Define a clear max_norm threshold for the pass',
      'Calculate a stable global L2 norm across gradients',
      'Rescale gradients only when the norm exceeds the threshold',
    ],
    instructions: {
      intro:
        'Read the backward pass like a systems problem. You are not just patching code; you are controlling how the model behaves under pressure.',
      task:
        'Implement gradient clipping inside the backward pass so the update step stays numerically stable for deeper recurrent structures.',
      steps: [
        'Review how gradients are currently stored',
        'Compute the global L2 norm before any update is applied',
        'Only scale when the norm is above max_norm',
        'Return to the update step with clipped values',
      ],
      deliverable: 'A backward pass implementation that clips gradients without breaking the update flow.',
    },
    hints: [
      {
        id: 'nn_hint_1',
        title: 'The norm must be global',
        content: 'If you clip each tensor independently, you lose the full picture of the update pressure.',
      },
      {
        id: 'nn_hint_2',
        title: 'Protect against division noise',
        content: 'A very small epsilon in the denominator helps avoid unstable scaling when the norm is near zero.',
        unlock_after_attempts: 1,
      },
    ],
    resources: [
      {
        label: 'Concept: Gradient Exploding',
        type: 'reference',
        content:
          'Exploding gradients happen when repeated multiplications push update magnitudes so high that the model overshoots useful learning directions.',
      },
      {
        label: 'Formula',
        type: 'formula',
        content: 'clip_coeff = max_norm / (total_norm + 1e-6)',
      },
    ],
    workspace: {
      type: 'editor',
      starter_state: {
        files: [
          {
            path: 'neural_net.py',
            language: 'python',
            content: [
              'import numpy as np',
              '',
              'class NeuralEngine:',
              '    def __init__(self, layers):',
              '        self.layers = layers',
              '        self.history = []',
              '',
              '    def backward_pass(self, loss_gradient):',
              '        # TODO: Implement Gradient Clipping',
              '        max_norm = 1.0',
              '        # Calculate global norm',
              '        total_norm = np.sqrt(sum(np.sum(np.square(g)) for g in self.gradients))',
              '        if total_norm > max_norm:',
              '            clip_coeff = max_norm / (total_norm + 1e-6)',
              '            for g in self.gradients:',
              '                g *= clip_coeff',
              '        return self.apply_updates()',
            ].join('\n'),
          },
          {
            path: 'optimizer.py',
            language: 'python',
            readonly: true,
            content: [
              'def apply_updates(parameters, gradients, lr):',
              '    for param, grad in zip(parameters, gradients):',
              '        param -= lr * grad',
            ].join('\n'),
          },
        ],
      },
    },
    evaluation: {
      mode: 'hybrid',
      checks: [
        {
          id: 'nn_check_1',
          label: 'max_norm threshold is explicitly defined',
          type: 'code-pattern',
        },
        {
          id: 'nn_check_2',
          label: 'Global L2 norm is computed across all gradients',
          type: 'code-pattern',
        },
        {
          id: 'nn_check_3',
          label: 'Clipping occurs only when the threshold is exceeded',
          type: 'ai-rubric',
          rubric: 'Review whether the clipping logic protects the update step without masking the underlying training flow.',
        },
      ],
      feedback_style: 'mentor-like',
    },
    ai_support: {
      enabled: true,
      role: 'reviewer',
      allowed_actions: ['explain', 'review', 'nudge', 'next-step'],
    },
    next_paths: {
      on_success: ['data-explorer'],
      on_retry: ['neural-net-builder'],
      on_stretch: ['prompt-lab'],
    },
    field_config: {
      runtime: 'python',
      preview: 'chart',
      libraries: ['numpy'],
      allowed_file_types: ['.py'],
      special_rules: ['show-math-context', 'keep-training-loop-visible'],
    },
  },
  {
    id: 'room_data_story_intermediate_01',
    slug: 'data-explorer',
    field: 'data-science',
    room_type: 'practice',
    level: 'intermediate',
    difficulty: 3,
    title: 'Signal Sorting',
    subtitle: 'Turn a rough dataset into a readable story before you reach for a model.',
    summary:
      'This room trains interpretation before prediction. You will inspect the learner dataset, identify one weak signal, and explain what it might mean.',
    estimated_minutes: 24,
    xp_reward: 70,
    learner_context: {
      target_skill: 'dataset interpretation',
      goal_tag: 'data reasoning',
      prerequisite_skills: ['tables', 'basic statistics', 'pattern spotting'],
    },
    learning_objectives: [
      'Read a dataset without jumping to conclusions too early',
      'Notice one useful signal and one misleading pattern',
      'Explain findings in plain language rather than raw numbers only',
    ],
    success_criteria: [
      'Inspect the dataset columns before making a claim',
      'Write one short insight backed by visible evidence',
      'Flag at least one possible limitation in the data',
    ],
    instructions: {
      intro: 'Use the dataset like an investigator, not a button-clicker. The value here is clarity, not just output.',
      task:
        'Review the session dataset, identify one meaningful pattern, and write a short evidence-based interpretation for the mentor.',
      steps: [
        'Scan the dataset shape and column meanings',
        'Notice one repeated pattern across the sample rows',
        'Write a short insight that connects the pattern to learner behavior',
        'Add one caution about what the dataset does not prove',
      ],
      deliverable: 'A short interpretation note tied to visible rows and columns.',
    },
    hints: [
      {
        id: 'data_hint_1',
        title: 'Look for a relationship, not just a high number',
        content: 'A useful pattern often comes from two columns being read together, not one in isolation.',
      },
      {
        id: 'data_hint_2',
        title: 'Beware small samples',
        content: 'A signal is not a rule. Note what makes the current dataset too small or noisy for certainty.',
      },
    ],
    resources: [
      {
        label: 'Interpretation Frame',
        type: 'note',
        content: 'Good data writing explains what you see, why it may matter, and what remains uncertain.',
      },
    ],
    workspace: {
      type: 'notebook',
      starter_state: {
        files: [
          {
            path: 'analysis.py',
            language: 'python',
            content: [
              'import pandas as pd',
              '',
              "df = pd.DataFrame(dataset_rows)",
              "print(df[['hours_practiced', 'quiz_score', 'revisions']])",
              '',
              '# Write one insight and one caution below',
              "insight = ''",
              "caution = ''",
            ].join('\n'),
          },
        ],
        dataset: {
          name: 'learner_sessions.csv',
          columns: ['student', 'hours_practiced', 'quiz_score', 'revisions'],
          sample_rows: [
            { student: 'Aarav', hours_practiced: 5, quiz_score: 84, revisions: 2 },
            { student: 'Mira', hours_practiced: 2, quiz_score: 62, revisions: 1 },
            { student: 'Kabir', hours_practiced: 6, quiz_score: 89, revisions: 3 },
          ],
        },
      },
    },
    evaluation: {
      mode: 'hybrid',
      checks: [
        {
          id: 'data_check_1',
          label: 'Insight references visible evidence',
          type: 'ai-rubric',
          rubric: 'Check whether the learner insight is grounded in the provided rows instead of vague intuition.',
        },
        {
          id: 'data_check_2',
          label: 'At least one limitation is clearly named',
          type: 'manual',
        },
      ],
      feedback_style: 'mentor-like',
    },
    ai_support: {
      enabled: true,
      role: 'explainer',
      allowed_actions: ['hint', 'explain', 'review', 'next-step'],
    },
    next_paths: {
      on_success: ['prompt-lab'],
      on_retry: ['data-explorer'],
      on_stretch: ['neural-net-builder'],
    },
    field_config: {
      runtime: 'python',
      preview: 'chart',
      libraries: ['pandas'],
      allowed_file_types: ['.py', '.csv'],
      special_rules: ['dataset-visible'],
    },
  },
  {
    id: 'room_prompt_iteration_intermediate_01',
    slug: 'prompt-lab',
    field: 'ai-foundations',
    room_type: 'reflection',
    level: 'intermediate',
    difficulty: 3,
    title: 'Prompt Framing Lab',
    subtitle: 'Refine the instruction, narrow the ambiguity, and compare the difference in model behavior.',
    summary:
      'This room teaches prompt design through side-by-side refinement. The learner starts with a vague instruction and turns it into a more reliable teaching prompt.',
    estimated_minutes: 20,
    xp_reward: 65,
    learner_context: {
      target_skill: 'prompt design',
      goal_tag: 'ai collaboration',
      prerequisite_skills: ['clear writing', 'basic AI familiarity'],
    },
    learning_objectives: [
      'Spot ambiguity in a weak prompt',
      'Add structure, context, and output constraints',
      'Explain why the revised prompt is stronger',
    ],
    success_criteria: [
      'Rewrite the prompt with clearer intent and expected output',
      'Preserve brevity while removing ambiguity',
      'Explain one specific improvement in the revised prompt',
    ],
    instructions: {
      intro:
        'Prompt design is not magic wording. It is structured communication. Use the room to make the request clearer, not longer for the sake of it.',
      task:
        'Rewrite the vague prompt into a sharper mentor instruction that asks for a beginner-friendly explanation and a concrete next step.',
      steps: [
        'Read the weak prompt once without editing',
        'Identify what is missing: role, audience, outcome, or format',
        'Rewrite it with stronger constraints',
        'Add one short note explaining your improvement',
      ],
      deliverable: 'A revised prompt plus one explanation sentence.',
    },
    hints: [
      {
        id: 'prompt_hint_1',
        title: 'Specify the audience',
        content: 'A model performs better when it knows who the answer is for.',
      },
      {
        id: 'prompt_hint_2',
        title: 'Constrain the output',
        content: 'Ask for format, tone, or structure so the response becomes easier to evaluate.',
      },
    ],
    resources: [
      {
        label: 'Prompt Rule',
        type: 'note',
        content: 'Better prompts usually get more precise by adding audience, goal, constraints, and expected output format.',
      },
    ],
    workspace: {
      type: 'chat-guided',
      starter_state: {
        text: [
          'Weak prompt:',
          '"Explain machine learning to me."',
          '',
          'Rewrite it into a better mentor prompt for a college beginner who wants one explanation and one next practice task.',
        ].join('\n'),
        ui_blocks: ['draft-panel', 'comparison-panel'],
      },
    },
    evaluation: {
      mode: 'ai-reviewed',
      checks: [
        {
          id: 'prompt_check_1',
          label: 'Rewritten prompt is clearer than the original',
          type: 'ai-rubric',
          rubric: 'Judge whether the revision improves audience targeting, structure, and evaluation clarity.',
        },
      ],
      feedback_style: 'supportive',
    },
    ai_support: {
      enabled: true,
      role: 'coach',
      allowed_actions: ['hint', 'explain', 'review', 'nudge', 'next-step'],
    },
    next_paths: {
      on_success: ['python-room'],
      on_retry: ['prompt-lab'],
      on_stretch: ['data-explorer'],
    },
    field_config: {
      runtime: 'none',
      preview: 'none',
      libraries: [],
      allowed_file_types: ['.md'],
      special_rules: ['reflection-mode'],
    },
  },
];

export function getYantraRoomBySlug(slug: string) {
  return yantraRooms.find((room) => room.slug === slug) ?? null;
}

export function buildRoomHref(slug: string) {
  return `/dashboard/rooms/${slug}`;
}
