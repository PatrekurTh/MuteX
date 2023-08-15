import Link from 'next/link';
import Avatar from './Avatar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function NavBar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="navbar sticky top-0 bg-neutral/75 text-neutral-content">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          MuteX
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/updates">Patch Notes</Link>
          </li>
          <li>
            <Link href="/rules">Rules</Link>
          </li>
          <li>
            <Link href="/wiki">Wiki</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {user && <Avatar letter={user.email![0]} />}
      </div>
      <Link
        href={user ? '/play' : '/login'}
        className="btn btn-primary min-w-max"
      >
        Play
      </Link>
    </nav>
  );
}
