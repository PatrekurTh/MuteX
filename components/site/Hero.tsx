import Link from 'next/link';
import hero from '@/images/site/hero.png';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Hero() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${hero.src})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to MuteX</h1>
          <p className="mb-5">
            MuteX is a fantasy MMO game where you can level up your skills,
            fight monsters for drops, and farm resources with idle gameplay in a
            community where you can trade, chat, and more.
          </p>
          <Link href={session ? '/play' : '/login'} className="btn btn-primary">
            Join the Adventure
          </Link>
        </div>
      </div>
    </div>
  );
}
