import React from 'react';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { useCameraAndPhoto } from './hooks/useCameraAndPhoto';
import ErrorBoundary from './components/ErrorBoundary';
import styled from 'styled-components';


const Video = styled.video`
  width: 100%;
`;


const Photo = styled.img`
  width: 100%;
`;


const App = () => {
  const { isCameraActive, activateCamera, takePhoto, deactivateCamera, videoRef, canvasRef, photo, isForwarding, error } = useCameraAndPhoto(5000);


  return (
    <ErrorBoundary>
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Autonomous Photo Capture and Forwarding
        </Typography>


        {isCameraActive ? (
          <>
            <Video ref={videoRef} autoPlay playsInline />
            <Button variant="contained" color="secondary" onClick={takePhoto}>
              Capture Photo
            </Button>
            <Button onClick={deactivateCamera}>Deactivate Camera</Button>
          </>
        ) : (
            <Button variant="contained" color="primary" onClick={activateCamera}>
            Activate Camera
          </Button>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />


        {photo && (
          <>
            <Typography variant="h5">Captured Photo:</Typography>
            <Photo src={photo} alt="Captured" />
            <Typography variant="body2">Photo will be forwarded and deleted in 5 seconds.</Typography>
          </>
        )}


        {isForwarding && <CircularProgress />}


        {error && <Typography color="error">{error}</Typography>}
      </Container>
    </ErrorBoundary>
  );
};


export default App;
