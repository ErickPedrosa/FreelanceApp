const { Server } = require('socket.io');
const redisAdapter = require('socket.io-redis');
const logger = require('../config/logger');
const authMiddleware = require('../middlewares/authMiddleware');


function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN.split(','),
      methods: ["GET", "POST"]
    }
  });


  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));


  io.use(authMiddleware);


  io.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id} (${socket.user?.username})`);


    socket.on('message', (data) => {
      socket.to('chat-room').emit('message', data);
    });


    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });


  return io;
}

module.exports = initSocket;