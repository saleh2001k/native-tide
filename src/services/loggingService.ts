/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// loggingService.ts

interface Logger {
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

const isDev = __DEV__; // React Native global; true in development mode

const createLogger = (): Logger => {
  const error = (...args: any[]) => {
    if (isDev) {
      console.error(...args);
    }
    // in production you might send to remote, or suppress
  };

  const warn = (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  };

  const info = (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  };

  const debug = (...args: any[]) => {
    if (isDev) {
      console.debug(...args);
    }
  };

  return {
    error,
    warn,
    info,
    debug,
  };
};

const logger = createLogger();

export default logger;
