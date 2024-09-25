const express = require('express');
const http = require('http');
const { setupMiddlewares } = require('./middlewares');
const { setupRoutes } = require('./routes');
const { setupWebSocket } = require('./websocket');
const logger = require('./logger');


require('dotenv-safe').config();


const app = express();
const server = http.createServer(app);


// Middleware setup
setupMiddlewares(app);


// Routes setup
setupRoutes(app);


// WebSocket setup
setupWebSocket(server);


// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
    