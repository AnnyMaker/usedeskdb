import * as path from 'path';
import pino, {Logger} from 'pino';
import {destination} from 'pino';
import * as fs from 'fs';

const logDir: string = path.join(__dirname, '../../../log');

if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger: Logger = pino(destination(`${logDir}/errors.log`));
const apiLogger: Logger = pino(destination(`${logDir}/apiErrors.log`));

export {
    logger,
    apiLogger,
    logDir
}

