import { io } from 'socket.io-client';


let socket;
let retryCount = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // Retry delay set to 3 seconds


export const initiateSocket = (roomId, onStatusChange) => {
    if (!socket || !socket.connected) {
        onStatusChange('connecting');
        socket = io('http://your-server-url', {
            reconnectionAttempts: MAX_RETRIES,
            reconnectionDelay: RETRY_DELAY,
        });


        attachSocketListeners(roomId, onStatusChange);
    }
};


const attachSocketListeners = (roomId, onStatusChange) => {
    socket.on('connect', () => {
        retryCount = 0;
        if (socket && roomId) {
            socket.emit('join', roomId);
            onStatusChange('connected');
        }
    });


    socket.on('disconnect', () => {
        onStatusChange('disconnected');
        retryConnection(roomId, onStatusChange);
    });


    socket.on('connect_error', (err) => {
        console.error('Connection Error:', err);
        onStatusChange('retrying');
    });
};


const retryConnection = (roomId, onStatusChange) => {
    if (retryCount < MAX_RETRIES) {
        retryCount++;
        onStatusChange(`Retrying... Attempt ${retryCount}`);
        setTimeout(() => {
            initiateSocket(roomId, onStatusChange);
        }, RETRY_DELAY);
    } else {
        onStatusChange('failed');
        console.error('Max retries reached. Could not connect.');
    }
};


export const sendMessage = (message) => {
    if (socket && socket.connected) {
        socket.emit('message', message);
    } else {
        console.error('Socket is not connected. Cannot send message.');
    }
};


export const subscribeToMessages = (callback) => {
    if (socket) {
        socket.on('message', callback);
    }
};


export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket.off();  // Remove all listeners to prevent memory leaks
    }
};
