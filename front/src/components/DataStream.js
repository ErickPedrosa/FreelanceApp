import React from 'react';
import useSocket from './hooks/useSocket';


const DataStream = () => {
  const { connected, error } = useSocket('http://localhost:4000', [
    { event: 'message', handler: (data) => console.log(data) },
  ]);


  if (error) return <p>Error: {error}</p>;
  return <p>Connection status: {connected ? 'Connected' : 'Disconnected'}</p>;
};


export default DataStream;
