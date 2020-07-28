import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Confetti from 'react-confetti'

import { ReactComponent as TrophyIcon } from '../assets/zondicons/trophy.svg';
import { gameboardState, turnState, gameStatusState, scoreState } from '../recoil';

const Gameboard = () => {
  const gameboard = useRecoilValue(gameboardState);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);

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

const GameboardCell: React.FC<GCProps> = ({ i, j, value }) => {
  const [gameboard, setGameboard] = useRecoilState(gameboardState);
  const [turn, setTurn] = useRecoilState(turnState);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);
  const [score, setScore] = useRecoilState(scoreState);

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

export type GameStatus = {
  status: string,
  winner: string
}

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
