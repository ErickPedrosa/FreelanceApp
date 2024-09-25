import { useState, useEffect } from 'react';
import io from 'socket.io-client';


const useSocket = (url, events) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const socket = io(url, {
      reconnectionAttempts: 5,
      timeout: 10000,
      auth: {
        token: localStorage.getItem('token'),
      },
    });


    socket.on('connect', () => {
      setConnected(true);
    });


    socket.on('disconnect', () => {
        setConnected(false);
    });


    socket.on('connect_error', (err) => {
      setError(err.message);
    });


    // Attach additional event listeners from props
    events.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });


    return () => socket.disconnect();
  }, [url, events]);


  return { connected, error };
};


export default useSocket;
