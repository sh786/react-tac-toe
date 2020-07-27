import React from 'react';

const Nav: React.FC = () => {
  return (
    <div className='flex bg-teal-200 w-full h-20 text-gray-800 shadow-lg'>
      <div className='h-full flex flex-col justify-center items-end px-5'>
        <h3 className='text-xl tracking-wide leading-5'>React-Tac-Toe</h3>
        <span className='text-xs'>with TypeScript</span>
      </div>
      <div className='grid grid-cols-2 divide-x divide-gray-800 ml-auto items-center px-5'>
        <div className='px-5 flex flex-col items-end'>
          <span className='text-xs'>Player <span className='font-bold'>X</span></span>
          <span className='text-3xl'>3</span>
        </div>
        <div className='px-5 flex flex-col'>
          <span className='text-xs'>Player <span className='font-bold'>O</span></span>
          <span className='text-3xl'>5</span>
        </div>
      </div>
    </div>
  )
};

export default Nav;
