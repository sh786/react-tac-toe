import { atom } from 'recoil';

import { GameStatus } from '../../gameboard/Gameboard';

const gameStatusState = atom<GameStatus>({
  key: 'gameStatusState',
  default: {
    status: 'IN_PROGRESS',
    winner: '',
  },
});

export default gameStatusState;
