// src/server.js
const app = require('./app');
const config = require('./config/default');
const logger = require('./utils/logger');

const PORT = config.server.port;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});