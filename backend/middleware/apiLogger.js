const morgan = require('morgan');
const chalk = require('chalk');

morgan.token("time", () => chalk.gray(new Date().toLocaleTimeString()));

// Method with colored badge
morgan.token("methodColor", (req) => {
  const method = req.method;
  if (method === "GET") return chalk.bgGreen.black(` ${method} `);
  if (method === "POST") return chalk.bgBlue.black(` ${method} `);
  if (method === "PUT") return chalk.bgYellow.black(` ${method} `);
  if (method === "DELETE") return chalk.bgRed.black(` ${method} `);
  return chalk.white(method);
});

// Status with color
morgan.token("statusColor", (req, res) => {
  const s = res.statusCode;
  if (s >= 500) return chalk.bgRed.white(` ${s} `);
  if (s >= 400) return chalk.yellow(s);
  if (s >= 300) return chalk.cyan(s);
  if (s >= 200) return chalk.green(s);
  return chalk.white(s);
});

// Custom format string
const format = [
  chalk.magenta("📌"),
  ":time",
  ":methodColor",
  chalk.cyan(":url"),
  "=>",
  ":statusColor",
  chalk.gray(":response-time ms"),
  chalk.gray("- :res[content-length] bytes")
].join("  ");


const apiLogger = morgan(format);

module.exports = apiLogger;
