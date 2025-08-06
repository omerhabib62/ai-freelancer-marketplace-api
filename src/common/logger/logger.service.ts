import { LoggerService, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerService implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]): void {
    Logger.log(`LOG: ${message}`, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]): void {
    Logger.error(`FATAL: ${message}`, ...optionalParams);
    // console.error(`FATAL: ${message}`, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]): void {
    Logger.error(`ERROR: ${message}`, ...optionalParams);
    // console.error(`ERROR: ${message}`, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): void {
    Logger.error(`WARN: ${message}`, ...optionalParams);
    // console.warn(`WARN: ${message}`, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): void {
    Logger.error(`DEBUG: ${message}`, ...optionalParams);
    // console.debug(`DEBUG: ${message}`, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): void {
    Logger.verbose(`VERBOSE: ${message}`, ...optionalParams);
    // console.debug(`VERBOSE: ${message}`, ...optionalParams);
  }
}
