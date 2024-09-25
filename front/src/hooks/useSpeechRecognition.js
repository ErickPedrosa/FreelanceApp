import { useState, useEffect, useMemo } from 'react';


const useSpeechRecognition = (onCommand, onError) => {
  const [isListening, setIsListening] = useState(false);
  const recognition = useMemo(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError('Your browser does not support Speech Recognition.');
      return null;
    }
    return new SpeechRecognition();
  }, [onError]);


  useEffect(() => {
    if (!recognition) return;


    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';


    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      const command = lastResult[0].transcript.trim().toLowerCase();
      onCommand(command);
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      onError(`Error occurred in recognition: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);


  }, [recognition, onCommand, onError]);


  const startListening = () => {
    if (!recognition) return;
    setIsListening(true);
    recognition.start();
  };


  return { startListening, isListening };
};


export default useSpeechRecognition;
