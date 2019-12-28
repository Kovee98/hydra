import { format, createLogger, transports } from 'winston';
import electron from 'electron';
import path from 'path';

const { combine, timestamp, printf, prettyPrint } = format;
const logsDir = path.join(electron.remote.app.getPath('userData'), 'logs');

const errorLog = path.join(logsDir, 'error.log');
const infoLog = path.join(logsDir, 'info.log');
const exceptionsLog = path.join(logsDir, 'exceptions.log');
const fileFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} - ${level.toUpperCase()}: ${message}`;
});

var log = createLogger({
    level: 'info',
    format: combine(
        format.json(),
        timestamp(),
        prettyPrint(),
        fileFormat
    ),
    transports: [
        new transports.File({ filename: errorLog, level: 'error' }),
        new transports.File({ filename: infoLog })
    ],
    exceptionHandlers: [
        new transports.File({ filename: exceptionsLog })
    ]
});

const stdoutFormat = printf(({ level, message, label, timestamp }) => {
    return `${level.toUpperCase()}: ${message}`;
});
if (process.env.NODE_ENV !== 'production') {
    log.add(new transports.Console({
        format: stdoutFormat
    }));
}

export default log;
