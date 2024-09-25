import React, { useState, useEffect } from 'react';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import useGeolocation from './hooks/useGeolocation';


const App = () => {
  const [transcript, setTranscript] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);


  const { startListening, isListening } = useSpeechRecognition(setTranscript, setError);
  const { getLocation } = useGeolocation(setLocation, setError);


  useEffect(() => {
    if (transcript.includes('start location') || transcript.includes('find location')) {
      getLocation();
    } else if (transcript) {
      setError('Unrecognized command. Please say "start location" or "find location".');
    }
  }, [transcript, getLocation]);


  return (
    <div>
      <h1>Geolocation by Voice Recognition</h1>
      <button onClick={startListening} disabled={isListening}>
        {isListening ? 'Listening...' : 'Start Voice Recognition'}
      </button>
      {transcript && <p>Transcript: {transcript}</p>}
      {location && (
        <div>
        <h2>Your Location:</h2>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
      </div>
    )}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
);
};


export default App;

