import { atom } from 'recoil';

const turnState = atom({
  key: 'turnState',
  default: 'X',
});

export default turnState;
