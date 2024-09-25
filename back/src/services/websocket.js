const { Server } = require('socket.io');
const logger = require('../config/logger');


function setupWebSocket(server) {
  const io = new Server(server, {
cors: { origin: ["https://yourdomain.com"], methods: ["GET", "POST"] }
});


io.on('connection', (socket) => {
logger.info(`Client connected: ${socket.id}`);

socket.on('message', (data) => {
    logger.info(`Received message from ${socket.id}: ${data}`);
    socket.to('chat-room').emit('message', data);
    });


    socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
    });
});
}


module.exports = { setupWebSocket };
  