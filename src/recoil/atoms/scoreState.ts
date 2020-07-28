import { atom } from 'recoil';

const scoreState = atom({
  key: 'scoreState',
  default: {
    x: 0,
    o: 0,
  },
});

export default scoreState;
