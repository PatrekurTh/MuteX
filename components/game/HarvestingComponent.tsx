import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HarvestingComponent() {
  const supabase = createClientComponentClient();
  const [zones, setZones] = useState<Array<any>>([]);

  useEffect(() => {
    const getZones = async () => {
      const { data, error } = await supabase
        .from('zones')
        .select('*')
        .eq('activity_id', 2);
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

  return <div>Harvesting</div>;
}
