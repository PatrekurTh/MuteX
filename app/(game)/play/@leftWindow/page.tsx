'use client';

import Image from 'next/image';
import mining_img from '@/images/game/skills/stone-crafting.svg';
import harvesting_img from '@/images/game/skills/plant-roots.svg';
import alchemy_img from '@/images/game/skills/vial.svg';
import fishing_img from '@/images/game/skills/fishing.svg';
import { useDispatch } from 'react-redux';
import { setActivity } from '@/store/slices/activitySlice';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

const skills = [
  {
    name: 'Mining',
    img: mining_img,
  },
  {
    name: 'Harvesting',
    img: harvesting_img,
  },
  {
    name: 'Alchemy',
    img: alchemy_img,
  },
  {
    name: 'Fishing',
    img: fishing_img,
  },
];

interface Activity {
  id: number;
  name: string;
  icon_image: string;
}

export default function LeftWindow() {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState<Array<Activity>>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getActivities = async () => {
      const { data, error } = await supabase.from('activities').select('*');
      if (error) {
        throw error;
      }
      setSkills(data as Array<Activity>);
    };
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card bg-secondary/60 shadow-xl h-full p-4">
      <div className="bg-accent/50 rounded-tl-lg rounded-tr-lg p-2 mb-4">
        <h2 className="text-primary text-center text-lg font-bold">Skills</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center">
        {skills.map(skill => (
          <div key={skill.id} onClick={() => dispatch(setActivity(skill.name))}>
            <SkillAvatar name={skill.name} url={skill.icon_image} />{' '}
          </div>
        ))}
      </div>
    </div>
  );
}
function SkillAvatar({ name, url }: { name: string; url: string }) {
  const supabase = createClientComponentClient();
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    const getIcon = async () => {
      const { data } = supabase.storage
        .from('game')
        .getPublicUrl(`skills/${url}`);

      setIcon(data.publicUrl);
    };
    getIcon();
  }, [supabase, url]);

  return (
    <div className="avatar flex-col items-center">
      <div className="btn rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
        {icon ? (
          <Image src={icon} alt={name} fill />
        ) : (
          <div className="avatar no-image" />
        )}
      </div>
      <p className="text-center text-white mt-2">{name}</p>
    </div>
  );
}
