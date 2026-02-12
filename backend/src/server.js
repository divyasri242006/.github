const app = require('./app');
const env = require('./config/env');
const connectDatabase = require('./config/database');
const logger = require('./utils/logger');

async function bootstrap() {
  await connectDatabase();
  app.listen(env.port, () => {
    logger.info(`API listening on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
