import PythonRoomShell from '@/src/features/rooms/PythonRoomShell';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';
import { fetchPythonRoomById } from '@/src/lib/supabase/python-rooms';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ roomId: string }>;
};

export default async function DashboardPythonRoomPage(props: Props) {
  const params = await props.params;
  
  await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20Python%20Room.&kind=info',
  });

  const room = await fetchPythonRoomById(params.roomId);
  if (!room) notFound();

  return <PythonRoomShell room={room} />;
}
