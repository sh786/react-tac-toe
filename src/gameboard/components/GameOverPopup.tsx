import React from 'react'
import Confetti from 'react-confetti';

import { ReactComponent as TrophyIcon } from '../../assets/zondicons/trophy.svg';

const GameOverPopup: React.FC<GOPProps> = ({ message, resetGame }) => {
  return (
    <div className='absolute w-full h-full flex-1 bg-gray-800 bg-opacity-50 top-0 left-0 flex items-center justify-center cursor-pointer' onClick={resetGame}>
      <div className='flex flex-col items-center justify-center bg-teal-200 p-64 rounded-lg shadow-lg cursor-default' onClick={e => e.stopPropagation()}>
        <Confetti gravity={1.8} tweenDuration={5000} recycle={false} />
        <TrophyIcon width={114} height={114} className='fill-current text-yellow-600' />
        <span className='text-2xl text-gray-800 mt-5'>{message}</span>
      </div>
    </div>
  );
};

type GOPProps = {
  message: string,
  resetGame: () => void
};

export default GameOverPopup;
