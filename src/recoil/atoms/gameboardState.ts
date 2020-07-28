import { atom } from 'recoil';

const gameboardState = atom({
  key: 'gameboardState',
  default: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
});

export default gameboardState;
