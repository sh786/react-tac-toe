import React from 'react'
import { useRecoilValue } from 'recoil';

import { turnState } from '../../recoil';

const PlayerInfo: React.FC<PIProps> = ({ label }) => {
  const turn = useRecoilValue(turnState);

  return (
    <div className='flex flex-col items-center justify-center'>
      <span className={`${turn === label ? 'bg-pink-500' : 'bg-gray-800'} rounded-full w-20 h-20 flex items-center justify-center text-gray-100 text-3xl font-semibold`}>{label}</span>
      <span className={`mt-5 font-semibold ${turn === label ? 'text-pink-500' : 'text-gray-800'} h-5`}>Player {label}</span>
      <span className='mt-5 font-semibold text-pink-500 h-5'>{turn === label && 'Your turn!'}</span>
    </div>
  );
};

type PIProps = {
  label: string
};

export default PlayerInfo
