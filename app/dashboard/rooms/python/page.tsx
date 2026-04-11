import { notFound } from 'next/navigation';
import PythonRoomShell from '@/src/features/rooms/PythonRoomShell';
import { fetchPythonRoomById } from '@/src/lib/supabase/python-rooms';

const DEFAULT_PYTHON_ROOM_ID = 'control-flow-calibration';

export default async function DashboardPythonRoomPage() {
  const room = await fetchPythonRoomById(DEFAULT_PYTHON_ROOM_ID);

  if (!room) {
    notFound();
  }

  return <PythonRoomShell room={room} />;
}
