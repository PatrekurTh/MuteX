'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function MiningComponent() {
  const supabase = createClientComponentClient();
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const getZones = async () => {
      const { data, error } = await supabase
        .from('zones')
        .select('*')
        .eq('activity_id', 1);
      if (error) {
        console.error('Error fetching zones:', error);
        return;
      }

      console.log(data);

      // setZones(data.zones as Array<any>);
    };

    getZones();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Mining</div>;
}
