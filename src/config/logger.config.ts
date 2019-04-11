import * as path from 'path';
import * as fs from 'fs';
import { appConfig } from '@app/config';
import { config as loadEnvConfig } from 'dotenv';
loadEnvConfig();

const { env, name } = appConfig;

export const loggerConfig: any = {
  name,
  streams: [],
};

  // Add streams as depending on the environment
if (env === 'production') {

  loggerConfig.streams.push({
    type: 'stream',
    stream: process.stderr,
    level: 'warn',
  });

  const directory = path.join(__dirname, '../../logs');
  const filename = `${name}.${env}.json.log`;

    // create logger directory if the directory doesn't exist
  try {
    fs.accessSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }

  loggerConfig.streams.push({
    type: 'rotating-file',
    path: path.join(directory, filename),
    period: '1d',
    count: 7,
    level: process.env.LOG_LEVEL || 'info',
  });
} else {
  loggerConfig.streams.push({
    type: 'stream',
    stream: process.stdout,
    level: 'debug',
  });
}
