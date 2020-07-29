import React, { useEffect } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';

import { SCORES, GAMEBOARD, GAME_STATUS, setScores, setGameboard, setGameStatus } from '../apolloMockServer';
import { PlayerInfo, GameboardCell, GameOverPopup } from './components';

const Gameboard = () => {
  const client = useApolloClient();

  const { data: scores } = useQuery(SCORES);
  const { data: gameboard } = useQuery(GAMEBOARD);
  const { data: gameStatus } = useQuery(GAME_STATUS);

  useEffect(() => {
    // check for a game win
    const status = getGameStatus(gameboard.data);
    if (status.status !== 'IN_PROGRESS') {
      setGameboard(client, [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
      if (status.winner === 'X') {
        // call apollo mock api to update scores state
        setScores(client, { ...scores, x: Number(scores.x) + 1 });
      } else if (status.winner === 'O') {
        // call apollo mock api to update scores state
        setScores(client, { ...scores, o: Number(scores.o) + 1 });
      }
      setGameStatus(client, status);
    }
  }, [scores, gameboard.data, client])

  const resetGame = () => {
    setGameStatus(client, {
      status: 'IN_PROGRESS',
      winner: ''
    });
  };

  return (
    <>
      <div className='bg-teal-200 container mx-auto h-full rounded-lg shadow-lg flex flex-col-reverse sm:flex-row'>
        <div className='my-12 sm:w-1/5 sm:m-5 grid grid-cols-2 sm:grid-rows-2 sm:grid-cols-1 divide-x sm:divide-y sm:divide-x-0 divide-gray-800'>
          <PlayerInfo label='X' />
          <PlayerInfo label='O' />
        </div>
        <div className='flex-1 mx-2 my-2 sm:m-5 sm:ml-0 p-3 bg-gray-800 rounded-lg shadow-lg grid grid-cols-3 grid-rows-3'>
          {gameboard.data.map((row: string[], i: number) => {
            return row.map((value, j) => {
              return <GameboardCell key={value + i.toString() + j.toString()} i={i} j={j} value={value} />;
            });
          })}
        </div>
      </div>
      {gameStatus.status.status === 'WON' && (
        <GameOverPopup message={`Player ${gameStatus.status.winner} Wins!`} resetGame={resetGame} />
      )}
      {gameStatus.status.status === 'DRAW' && (
        <GameOverPopup message='Player X and Player O have tied!' resetGame={resetGame} />
      )}
    </>
  );
};

export type GameStatus = {
  status: string,
  winner: string
}

const getGameStatus = (gameboard: string[][]) => {
  let isBoardFull = true;

  // check rows for win
  for (let i = 0; i < gameboard.length; i++) {
    let rowPoints = 0;
    for (let j = 0; j < gameboard.length; j++) {
      rowPoints += Number(valueToPointMap.get(gameboard[i][j])) || 0;
      // update isBoardFull
      if (gameboard[j][i] === '') isBoardFull = false;
    }
    if (rowPoints === 3) {
      return xWinStatus;
    } else if (rowPoints === -3) {
      return oWinStatus;
    }
  }

  // check cols for win
  for (let i = 0; i < gameboard.length; i++) {
    let rowPoints = 0;
    for (let j = 0; j < gameboard.length; j++) {
      rowPoints += Number(valueToPointMap.get(gameboard[j][i])) || 0;
    }
    if (rowPoints === 3) {
      return xWinStatus;
    } else if (rowPoints === -3) {
      return oWinStatus;
    }
  }

  // check for diagonals
  const diagTlBrPoints = (valueToPointMap.get(gameboard[0][0]) || 0) + (valueToPointMap.get(gameboard[1][1]) || 0) + (valueToPointMap.get(gameboard[2][2]) || 0);
  if (diagTlBrPoints === 3) {
    return xWinStatus;
  } else if (diagTlBrPoints === -3) {
    return oWinStatus;
  }

  const diagTrBlPoints = (valueToPointMap.get(gameboard[0][2]) || 0) + (valueToPointMap.get(gameboard[1][1]) || 0) + (valueToPointMap.get(gameboard[2][0]) || 0);
  if (diagTrBlPoints === 3) {
    return xWinStatus;
  } else if (diagTrBlPoints === -3) {
    return oWinStatus;
  }

  // if board is not full, return in progress
  if (!isBoardFull) {
    return inProgressStatus;
  }

  // otherwise, return draw
  return drawStatus;
};

const valueToPointMap = new Map([['X', 1], ['O', -1]]);

const xWinStatus: GameStatus = {
  status: 'WON',
  winner: 'X'
};

const oWinStatus: GameStatus = {
  status: 'WON',
  winner: 'O'
};

const drawStatus: GameStatus = {
  status: 'DRAW',
  winner: ''
};

const inProgressStatus: GameStatus = {
  status: 'IN_PROGRESS',
  winner: ''
};

export default Gameboard;
