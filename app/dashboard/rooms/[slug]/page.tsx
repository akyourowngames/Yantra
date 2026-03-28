import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildStudentDashboardProfile } from '@/src/features/dashboard/student-dashboard-model';
import RoomExperience from '@/src/features/rooms/RoomExperience';
import { getYantraRoomBySlug } from '@/src/features/rooms/room-content';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';

type DashboardRoomPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: DashboardRoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getYantraRoomBySlug(slug);

  if (!room) {
    return {
      title: 'Yantra Room',
    };
  }

  return {
    title: `${room.title} | Yantra`,
    description: room.summary,
  };
}

export default async function DashboardRoomPage({ params }: DashboardRoomPageProps) {
  const { slug } = await params;
  const room = getYantraRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const result = await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20enter%20your%20Yantra%20room.&kind=info',
  });

  const learner = buildStudentDashboardProfile(result.profile, result.user.email ?? '');

  return <RoomExperience learner={learner} room={room} />;
}
