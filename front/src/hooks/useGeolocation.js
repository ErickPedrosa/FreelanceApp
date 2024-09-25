const useGeolocation = (onSuccess, onError) => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        onError('Geolocation is not supported by your browser.');
        return;
      }
  
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSuccess({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (geoError) => {
          onError(`Geolocation error: ${geoError.message}`);
        }
      );
    };
  
  
    return { getLocation };
  };
  
  
  export default useGeolocation;
    