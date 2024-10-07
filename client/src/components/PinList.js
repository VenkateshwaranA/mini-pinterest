import React from 'react';
import Pin from './Pin';

const PinList = ({ pins }) => {
  console.log('pins',pins);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {pins.map((pin) => (
      <Pin key={pin._id} pin={pin} />
    ))}
  </div>
  );
};

export default PinList;
