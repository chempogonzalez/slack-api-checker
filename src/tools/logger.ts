/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ObjectType } from '../types/object';

export const log = (message: string | ObjectType = '', obj: ObjectType | string | any = undefined): void => {
  if (obj) {
    console.log(message, obj);
    return;
  }
  console.log(message);
};

export const logError = (message: string | ObjectType = '', obj: ObjectType | string | any = undefined): void => {
  if (obj) {
    console.error(message, obj);
    return;
  }
  console.error(message);
};


export const logInfo = (message: string | ObjectType = '', obj: ObjectType | string | any = undefined): void => {
  if (obj) {
    console.info(message, obj);
    return;
  }
  console.info(message);
};


export const logWarn = (message: string | ObjectType = '', obj: ObjectType | string | any = undefined): void => {
  if (obj) {
    console.warn(message, obj);
    return;
  }
  console.warn(message);
};

export default log;
