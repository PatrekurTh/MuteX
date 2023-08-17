'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getActivityState } from '@/store/slices/activitySlice';

export default function Play() {
  const supabase = createClientComponentClient();
  const { activity } = useSelector(getActivityState);

  useEffect(() => {
    const getSesh = async () => {
      const session = await supabase.auth.getSession();
      if (!session) {
        redirect('/login');
      }
    };
    getSesh();
  }, [supabase.auth]);

  return (
    <div className="h-full card bg-accent/75 shadow-xl p-4">
      Game doing {activity}
    </div>
  );
}
