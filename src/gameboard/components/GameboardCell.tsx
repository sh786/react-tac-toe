import React, { useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client';

import { GAMEBOARD, TURN, setGameboard, setTurn } from '../../apolloMockServer';

const GameboardCell: React.FC<GCProps> = ({ i, j, value }) => {
  const client = useApolloClient();

  const [getGameboard, { data: gameboard }] = useLazyQuery(GAMEBOARD);
  const [getTurn, { data: turn }] = useLazyQuery(TURN);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getGameboard();
      getTurn();
    }

    return () => {
      isMounted = false;
    };
  }, [getGameboard, getTurn])

  const handleCellClick = () => {
    // update board with X or O depending on turn
    if (!value) {
      const updatedGameboard: string[][] = [...gameboard.data];
      const updatedRow: string[] = [...updatedGameboard[i]];
      updatedRow[j] = turn.turn;
      updatedGameboard[i] = updatedRow;
      setGameboard(client, updatedGameboard);
      setTurn(client, turn.turn === 'X' ? 'O' : 'X');
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
