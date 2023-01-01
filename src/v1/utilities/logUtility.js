const log4js = require('log4js');
const httpContext = require('express-http-context');

const pad = (num) => ((num < 10) ? `0${num}` : num);

log4js.addLayout('oneline', (configs) => function (logEvent) {
  const {
    startTime, categoryName, data, level,
  } = logEvent;
  let logMessage = '';

  for (const dt of data) {
    logMessage += JSON.stringify(dt).concat(' ');
  }

  const requestId = httpContext.get('requestId');
  const dateTime = `${[pad(startTime.getDate()), pad(startTime.getMonth() + 1), pad(startTime.getFullYear())].join('-')} ${[pad(startTime.getHours()), pad(startTime.getMinutes()), pad(startTime.getUTCMilliseconds())].join(':')}`;

  const patternWLog = `[${dateTime}][${requestId}][${categoryName}][${level.levelStr}] ${logMessage}`;

  return patternWLog;
});

log4js.configure({
  appenders: {
    console: {
      type: 'stdout',
      layout: { type: 'oneline' },
    },
  },
  categories: { default: { appenders: ['console'], level: 'debug' } },
});

const logger = (categoryName) => (
  log4js.getLogger(categoryName)
);

module.exports = logger;
