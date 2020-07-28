import React from 'react';
import { RecoilRoot } from 'recoil'

import Nav from './nav/Nav';
import Gameboard from './gameboard/Gameboard';
import './tailwind.output.css';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <div className='bg-gray-800 font-mono h-screen flex flex-col'>
        <Nav />
        <div className='p-2 sm:p-10 flex-1'>
          <Gameboard />
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
