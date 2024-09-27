import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useCamera } from './useCamera';
import { usePhoto } from './usePhoto';


export const useCameraAndPhoto = (deletionTime: number = 5000) => {
  const { isCameraActive, activateCamera, deactivateCamera, videoRef, error } = useCamera();
  const { photo, capturePhoto, deletePhoto } = usePhoto(deletionTime);
  const [isForwarding, setIsForwarding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        capturePhoto(dataUrl);
        deactivateCamera();
      }
    }
  };


  const forwardPhoto = async () => {
    if (!photo) return;
    setIsForwarding(true);
    try {
      const response = await axios.post('https://your-server.com/upload', { photo });
      if (response.status === 200) {
        console.log('Photo forwarded successfully');
      }
    } catch (err) {
      console.error('Failed to forward the photo', err);
    } finally {
      setIsForwarding(false);
      deletePhoto();
    }
  };


  useEffect(() => {
    if (photo) forwardPhoto();
  }, [photo]);


  return {
    isCameraActive,
    activateCamera,
    deactivateCamera,
    takePhoto,
    videoRef,
    canvasRef,
    photo,
    isForwarding,
    error,
  };
};


