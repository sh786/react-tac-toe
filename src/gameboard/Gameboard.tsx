import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { PlayerInfo, GameboardCell, GameOverPopup } from './components';
import { gameboardState, gameStatusState, scoreState } from '../recoil';

const Gameboard = () => {
  const [gameboard, setGameboard] = useRecoilState(gameboardState);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);
  const [score, setScore] = useRecoilState(scoreState);

  useEffect(() => {
    // check for a game win
    const status = getGameStatus(gameboard);
    if (status.status !== 'IN_PROGRESS') {
      if (status.winner === 'X') {
        setScore({ ...score, x: score.x + 1 });
      } else if (status.winner === 'O') {
        setScore({ ...score, o: score.o + 1 });
      }
      setGameStatus(status);
      setGameboard([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
    }
  }, [gameboard, score, setGameboard, setGameStatus, setScore])

  const resetGame = () => {
    setGameStatus({
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
          {gameboard.map((row, i) => {
            return row.map((value, j) => {
              return <GameboardCell key={value + i.toString() + j.toString()} i={i} j={j} value={value} />;
            });
          })}
        </div>
      </div>
      {gameStatus.status === 'WON' && (
        <GameOverPopup message={`Player ${gameStatus.winner} Wins!`} resetGame={resetGame} />
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
