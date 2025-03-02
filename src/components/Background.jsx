import React, { useContext } from 'react';

import { AppContext } from '../context/AppProvider';
import { BACKGROUND_LINKS_LIST } from '../constants';

export default function Background() {
  const { background } = useContext(AppContext);

  return (
    <div className='absolute inset-0'>
      <div className='relative w-full h-full'>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out delay-500 ${
            background.show1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            src={
              BACKGROUND_LINKS_LIST.find(
                ({ link }) => link === background.link1
              ).video
            }
            autoPlay
            muted
            loop
            playsInline
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video'
          />
        </div>

        <div
          className={`absolute inset-0 transition duration-500 ease-in-out delay-500 ${
            !background.show1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            autoPlay
            src={
              BACKGROUND_LINKS_LIST.find(
                ({ link }) => link === background.link2
              ).video
            }
            muted
            loop
            playsInline
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full min-h-full object-cover lg:aspect-video pointer-events-none'
          />
        </div>
      </div>
    </div>
  );
}
