'use client';

import { useSelector } from 'react-redux';
import { getActivityState } from '@/store/slices/activitySlice';
import { ActivityRenderer } from '@/components/game/ActivityRenderer';
import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Play() {
  const { activity } = useSelector(getActivityState);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const exitingFunction = async () => {
      await supabase.from('tmp').insert([{ test: 'test' }]);
      console.log('exiting');
    };

    window.onbeforeunload = exitingFunction;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className="h-full card bg-accent/75 shadow-xl p-4">
      <ActivityRenderer activity={activity} />
    </div>
  );
}
