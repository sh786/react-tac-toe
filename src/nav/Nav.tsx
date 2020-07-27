import React from 'react';
import { ReactComponent as TrophyIcon } from '../assets/zondicons/trophy.svg';

const Nav: React.FC = () => {
  return (
    <div className='flex bg-teal-200 w-full h-24 text-gray-800 shadow-lg'>
      <div className='h-full flex flex-col justify-center items-end px-5'>
        <h3 className='text-xl tracking-wide leading-5'>React-Tac-Toe</h3>
        <span className='text-xs'>with TypeScript</span>
      </div>
      <div className='grid grid-cols-2 divide-x divide-gray-800 ml-auto items-center px-5'>
        {['A', 'B'].map(label => (
          <PlayerScore label={label} score={4} />
        ))}
      </div>
    </div>
  )
};

const PlayerScore: React.FC<PSProps> = ({ label, score }) => {
  return (
    <div className={`flex flex-col ${label === 'A' ? 'items-end pr-5' : 'pl-5'}`}>
      <span className='text-xs'>Player <span className='font-bold'>{label}</span></span>
      <span className='text-3xl'>{score}</span>
      <div className={`flex ${label === 'A' && 'flex-row-reverse'} h-3`}>
        { /**  for # score, render trophy */}
        <TrophyIcon width={12} height={12} className='fill-current text-yellow-600' />
        <TrophyIcon width={12} height={12} className='fill-current text-yellow-600' />
      </div>
    </div>
  )
};

type PSProps = {
  label: string,
  score: number,
};

export default Nav;
