import { createClient } from '@supabase/supabase-js';
import { roomBlueprints } from '../src/features/rooms/room-blueprints.ts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedPythonRooms() {
  console.log('Seeding Python rooms...');
  
  for (const blueprint of roomBlueprints) {
    const row = {
      id: blueprint.id,
      topic: blueprint.topic,
      room_number: blueprint.roomNumber,
      title: blueprint.title,
      learning_goal: blueprint.learningGoal,
      concept_summary: blueprint.conceptSummary,
      difficulty: blueprint.difficulty,
      estimated_minutes: blueprint.estimatedMinutes,
      starter_code: blueprint.starterCode,
      expected_output_hint: blueprint.expectedOutputHint,
      success_criteria: blueprint.successCriteria,
      starter_guidance: blueprint.starterGuidance,
      banned_concepts: blueprint.bannedConcepts,
      phase_label: blueprint.phaseLabel,
    };

    const { error } = await supabase
      .from('python_rooms')
      .upsert(row);

    if (error) {
      console.error(`Failed to insert room ${blueprint.id}:`, error);
    } else {
      console.log(`Successfully seeded ${blueprint.id}`);
    }
  }

  console.log('Finished seeding Python rooms.');
}

seedPythonRooms().catch(console.error);
