import '@/app/globals.css';
import background from '@/images/game/background.png';
import NavBar from '@/components/navbar/GameNavBar';
import ReduxProvider from '@/components/ReduxProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Play Mutex',
  description: 'Generated by create next app',
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  chat: React.ReactNode;
  leftWindow: React.ReactNode;
  rightWindow: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  return (
    <html lang="en">
      <body>
        <main
          className="flex flex-col h-screen bg-background"
          style={{
            backgroundImage: `url(${background.src})`,
            backgroundSize: 'cover',
          }}
        >
          <ReduxProvider>
            <NavBar />
            <div className="flex flex-1 flex-row gap-2 p-2">
              <div className="w-1/4">{props.leftWindow}</div>
              <div className="flex flex-col gap-2 w-2/4">
                <div className="h-1/2">{props.children}</div>
                <div className="h-1/2">{props.chat}</div>
              </div>
              <div className="w-1/4">{props.rightWindow}</div>
            </div>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
