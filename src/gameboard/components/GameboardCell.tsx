import React from 'react'
import { useRecoilState } from 'recoil';

import { gameboardState, turnState } from '../../recoil';

const GameboardCell: React.FC<GCProps> = ({ i, j, value }) => {
  const [gameboard, setGameboard] = useRecoilState(gameboardState);
  const [turn, setTurn] = useRecoilState(turnState);

  const handleCellClick = () => {
    // update board with X or O depending on turn
    if (!value) {
      const updatedGameboard: string[][] = [...gameboard];
      const updatedRow: string[] = [...gameboard[i]];
      updatedRow[j] = turn;
      updatedGameboard[i] = updatedRow;
      setGameboard(updatedGameboard);
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  return (
    <div className={`flex items-center justify-center text-6xl text-gray-100 ${value === '' ? 'cursor-pointer hover:bg-gray-700' : 'cursor-default'} ${getBorderStyles(i, j)}`}
      onClick={handleCellClick}
      onKeyDown={handleCellClick}
      role='button'
      tabIndex={0}
    >
      {value}
    </div>
  );
};

type GCProps = {
  i: number,
  j: number,
  value: string
};

const getBorderStyles = (i: number, j: number) => {
  let outputClasses = '';
  if (i < 2) {
    if (j < 2) {
      outputClasses += 'border-b border-r border-teal-200';
    } else {
      outputClasses += 'border-b border-teal-200';
    }
  } else {
    if (j < 2) {
      outputClasses += 'border-r border-teal-200';
    }
  }

  return outputClasses;
};

export default GameboardCell;
