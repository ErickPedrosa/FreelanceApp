const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const express = require('express');

function setupMiddlewares(app) {
  app.use(helmet());
  app.use(express.json());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.',
  }));
}

module.exports = { setupMiddlewares };
