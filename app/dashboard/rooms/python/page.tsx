import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';
import { fetchPythonRooms } from '@/src/lib/supabase/python-rooms';
import { redirect } from 'next/navigation';

export default async function DashboardPythonRoomsPageIndex() {
  await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20Python%20Room.&kind=info',
  });

  const rooms = await fetchPythonRooms();
  if (rooms && rooms.length > 0) {
    redirect(`/dashboard/rooms/python/${rooms[0].id}`);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      No rooms available
    </div>
  );
}
