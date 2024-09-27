import { useState, useEffect } from 'react';


export const usePhoto = (deletionTime: number) => {
  const [photo, setPhoto] = useState<string | null>(null);


  const capturePhoto = (dataUrl: string) => {
    setPhoto(dataUrl);
  };


  const deletePhoto = () => {
    setPhoto(null);
  };


  useEffect(() => {
    if (photo) {
      const timer = setTimeout(() => deletePhoto(), deletionTime);
      return () => clearTimeout(timer);
    }
  }, [photo, deletionTime]);


  return { photo, capturePhoto, deletePhoto };
};
