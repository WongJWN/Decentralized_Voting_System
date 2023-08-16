import React from 'react';
import Rose1 from '../styles/rose1.png';

const HomePage = ({ isConnected, account }) => {

  return (
    <div>
      <div className='relative '>
        <div>
          <div className='absolute inset-0 -z-10 bg-homepage min-h-screen bg-cover bg-no-repeat bg-center'></div>
        </div>
        <div>
          <div className='flex justify-between items-center h-[100vh]'>
            <div className='ml-28 mb-[100px]'>
              <h1 className='text-hometitle font-bold font-Monoton text-8xl leading-normal w-[700px] '>Wlecome To LifeVote !</h1>
              {isConnected ? (
                <div className=' absolute '>
                  <p className='text-4xl font-semibold font-Nanum text-homesubtitle'>
                    Enjoy Your Election ,{account.length > 15 ? `${account.slice(0, 15)}...` : account}
                  </p>
                </div>

              ) : (
                <div className=' absolute '>
                  <p className='text-4xl font-semibold font-Nanum text-homesubtitle'>
                  Pls make sure u have install MetaMask on your browser !
                  </p>
                </div>
              )}
            </div>
            <div>
              <img src={Rose1} className=' mr-28' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage