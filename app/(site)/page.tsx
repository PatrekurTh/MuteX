export const dynamic = 'force-dynamic';

export default function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <HomePage />
    </div>
  );
}

import Hero from '@/components/index/Hero';

function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <div className="w-full max-w-3xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Features</h2>
      </div>
    </div>
  );
}
