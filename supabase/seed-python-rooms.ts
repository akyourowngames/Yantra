import { createClient } from '@supabase/supabase-js';
import { roomBlueprints } from '../src/features/rooms/room-blueprints';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedRooms() {
  console.log(`Seeding ${roomBlueprints.length} rooms...`);

  const rows = roomBlueprints.map((room) => ({
    id: room.id,
    topic: room.topic,
    room_number: room.roomNumber,
    title: room.title,
    learning_goal: room.learningGoal,
    concept_summary: room.conceptSummary,
    difficulty: room.difficulty,
    estimated_minutes: room.estimatedMinutes,
    starter_code: room.starterCode,
    expected_output_hint: room.expectedOutputHint,
    success_criteria: room.successCriteria,
    starter_guidance: room.starterGuidance,
    banned_concepts: room.bannedConcepts,
    phase_label: room.phaseLabel,
  }));

  const { error } = await supabase
    .from('python_rooms')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }

  console.log('✅ All rooms seeded successfully.');
}

seedRooms();
