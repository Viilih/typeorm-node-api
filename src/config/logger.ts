import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
};
winston.addColors(colors);
const logger = winston.createLogger({
  levels: logLevels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
