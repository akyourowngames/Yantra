import { redirect } from 'next/navigation';
import StudentDashboard from '@/src/features/dashboard/StudentDashboard';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';
import { getAuthenticatedDashboardData } from '@/src/lib/supabase/dashboard';

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    redirect('/login?message=Configure%20Supabase%20first.&kind=error');
  }

  const result = await getAuthenticatedDashboardData();

  if (!result) {
    redirect('/login?message=Log%20in%20to%20open%20your%20dashboard.&kind=info');
  }

  return <StudentDashboard data={result} />;
}
