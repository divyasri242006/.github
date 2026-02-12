const dotenv = require('dotenv');

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  openAiTimeoutMs: Number(process.env.OPENAI_TIMEOUT_MS) || 15000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB) || 10,
};

const required = ['mongoUri', 'accessSecret', 'refreshSecret'];
for (const key of required) {
  if (!env[key]) {
    // eslint-disable-next-line no-console
    console.warn(`Missing required env var: ${key}`);
  }
}

module.exports = env;
