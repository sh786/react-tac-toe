import React from 'react';
import Nav from './nav/Nav';
import './tailwind.output.css';

const App: React.FC = () => {
  return <div className='bg-gray-800 font-mono h-screen flex flex-col'>
    <Nav />
    <div className='p-4 flex-1'>
      <div className='bg-gray-100 container mx-auto px-4 h-full rounded-lg shadow-lg'>
      </div>
    </div>
  </div>
};

export default App;
