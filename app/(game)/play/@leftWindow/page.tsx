'use client';

import Image from 'next/image';
import mining_img from '@/images/game/skills/stone-crafting.svg';
import harvesting_img from '@/images/game/skills/plant-roots.svg';
import alchemy_img from '@/images/game/skills/vial.svg';
import fishing_img from '@/images/game/skills/fishing.svg';
import { useDispatch } from 'react-redux';
import { setActivity } from '@/store/slices/activitySlice';

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

export default function LeftWindow() {
  const dispatch = useDispatch();

  return (
    <div className="card bg-secondary/60 shadow-xl h-full p-4">
      <div className="bg-accent/50 rounded-tl-lg rounded-tr-lg p-2 mb-4">
        <h2 className="text-primary text-center text-lg font-bold">Skills</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skills.map(skill => (
          <div
            key={skill.name}
            onClick={() => dispatch(setActivity(skill.name))}
            className="avatar flex-col justify-center items-center"
          >
            <div className="btn rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
              <Image src={skill.img} alt={skill.name} fill />
            </div>
            <p className="text-center text-white mt-2">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
