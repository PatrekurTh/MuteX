import Link from 'next/link';
import Avatar from './Avatar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LogoutButton from '../LogoutButton';

export default async function NavBar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="navbar sticky top-0 bg-accent/75 text-neutral-content">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          MuteX
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/news" className="text-primary font-semibold text-lg">
              Stats
            </Link>
          </li>
          <li>
            <Link
              href="/updates"
              className="text-primary font-semibold text-lg"
            >
              Here
            </Link>
          </li>
          <li>
            <Link href="/rules" className="text-primary font-semibold text-lg">
              Maybe
            </Link>
          </li>
          <li>
            <Link href="/wiki" className="text-primary font-semibold text-lg">
              IDNO
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="btn btn-primary">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
