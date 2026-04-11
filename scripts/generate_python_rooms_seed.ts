import * as fs from 'fs';
import * as path from 'path';
import { roomBlueprints } from '../src/features/rooms/room-blueprints.ts';

const sqlPath = path.join(process.cwd(), 'supabase', 'seed_python_rooms.sql');

let sql = `-- Seed script for public.python_rooms\n`;
sql += `INSERT INTO public.python_rooms (id, topic, room_number, title, learning_goal, concept_summary, difficulty, estimated_minutes, starter_code, expected_output_hint, success_criteria, starter_guidance, banned_concepts, phase_label)\nVALUES\n`;

const escapeSql = (str: string) => {
  return str.replace(/'/g, "''");
};

const arrayToSql = (arr: string[]) => {
  if (arr.length === 0) return "'{}'";
  const items = arr.map((item) => `"${item.replace(/"/g, '""')}"`).join(',');
  return `'{${items}}'`;
};

const rows = roomBlueprints.map((room) => {
  return `(
    '${escapeSql(room.id)}',
    '${escapeSql(room.topic)}',
    ${room.roomNumber},
    '${escapeSql(room.title)}',
    '${escapeSql(room.learningGoal)}',
    '${escapeSql(room.conceptSummary)}',
    '${escapeSql(room.difficulty)}',
    ${room.estimatedMinutes},
    '${escapeSql(room.starterCode)}',
    '${escapeSql(room.expectedOutputHint)}',
    ${arrayToSql(room.successCriteria)}::text[],
    ${arrayToSql(room.starterGuidance)}::text[],
    ${arrayToSql(room.bannedConcepts)}::text[],
    '${escapeSql(room.phaseLabel)}'
  )`;
});

sql += rows.join(',\n') + ';\n';

fs.writeFileSync(sqlPath, sql, 'utf8');
console.log(`Generated SQL seed file at ${sqlPath}`);
