const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { format } = require("date-fns");
const { fileURLToPath } = require("url");
const { v4 } = require("uuid");
const uuid = v4;

//Function for logging events

const logEvents = async (message, logFile) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFile),
      logItem
    );
  } catch (error) {
    console.log(error.message);
  }
};

// Logger Middleware

const logger = (req, res, next) => {
  const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
  const logFile = "reqLog.txt";
  logEvents(message, logFile);
  next();
};

module.exports = { logEvents, logger };
