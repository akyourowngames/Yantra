import PythonRoomShell from '@/src/features/rooms/PythonRoomShell';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';
import { fetchPythonRoomById } from '@/src/lib/supabase/python-rooms';
import { notFound } from 'next/navigation';

export default async function DashboardPythonRoomPage() {
  await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20Python%20Room.&kind=info',
  });

  const room = await fetchPythonRoomById('variables-room-1');
  if (!room) notFound();

  return <PythonRoomShell room={room} />;
}
