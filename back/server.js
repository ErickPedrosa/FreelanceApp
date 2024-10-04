const express = require('express');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const deviceRoutes = require('./routes/deviceRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectToDatabase = require('./config/db');
const initSocket = require('./services/socket');
const logger = require('./config/logger');


const app = express();


app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN.split(',') }));
app.use(express.json());
app.use(compression());


app.use('/api', deviceRoutes);
app.use('/api', healthRoutes);
app.use(errorHandler);


const server = http.createServer(app);
const io = initSocket(server);


connectToDatabase();


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
