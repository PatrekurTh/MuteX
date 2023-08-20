import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FishingComponent() {
  const supabase = createClientComponentClient();
  const [zones, setZones] = useState<Array<any>>([]);

  useEffect(() => {
    const getZones = async () => {
      const { data, error } = await supabase
        .from('zones')
        .select('*')
        .eq('activity_id', 4);
      if (error) {
        console.error('Error fetching zones:', error);
        return;
      }

      console.log(data);

      setZones(data as Array<any>);
    };

    getZones();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="bg-secondary/80 rounded-tl-lg rounded-tr-lg p-2">
        <h2 className="text-accent text-center text-lg font-semibold">
          Fishing Zones
        </h2>
      </div>
      <div className="card-body max-h-80 p-0 overflow-y-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
          {zones.map(zone => (
            <div
              className="card w-full shadow-xl image-full cursor-pointer"
              key={zone.id}
              onClick={() => console.log(`Clicked on ${zone.name}`)}
            >
              <figure className="relative w-full h-full">
                <Image
                  src="https://picsum.photos/200"
                  fill
                  alt="Shoes"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-secondary">
                  {zone.name}
                  <Image
                    src="https://vyhtnebvbpatwaohzygc.supabase.co/storage/v1/object/public/game/game/info-circle-svgrepo-com.svg"
                    alt="info icon"
                    width={24}
                    height={24}
                  />
                </h2>
                <p>{zone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
