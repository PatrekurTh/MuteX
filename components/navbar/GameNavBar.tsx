'use client';

import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LogoutButton from '../LogoutButton';
import { useSelector } from '@/store/store';
import { getActivityState } from '@/store/slices/activitySlice';

export default function NavBar() {
  const { activity } = useSelector(getActivityState);

  return (
    <nav className="navbar sticky top-0 bg-accent/75 text-neutral-content">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          MuteX
        </Link>
      </div>
      <div className="navbar-center">
        <div className="rounded-bl-lg rounded-br-lg bg-primary/75 px-4 py-2 -mt-8">
          <p className="text-lg font-semibold text-accent">
            Currently Doing: {activity}
          </p>
        </div>
      </div>
      <div className="navbar-end">
        <div className="btn btn-primary">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
