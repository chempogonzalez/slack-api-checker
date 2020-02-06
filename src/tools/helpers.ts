export default class Helpers {
  /**
   * @description Checks environment variables needed and throws an error if any of them are not present
   */

  static checkEnvironmentVariables = (): void => {
    if (!process.env.POSTMAN_COLLECTION_NAME
        || !process.env.POSTMAN_ENVIRONMENTS_NAME
        || !process.env.SLACK_BOT_TOKEN
        || !process.env.SLACK_BOT_NAME
        || !process.env.SLACK_BOT_ID
        || !process.env.PROJECT_NAME) {
      throw Error('All the environment variables specified in the .env.schema file must to be filled in the .env file');
    }
  };

  /**
   * @description Gets the current date and format the hours to be returned as string.
   *              Returned Format:  hh:mm:ss
   * @returns {string}
   */
  static getExecutionHour = (): string => {
    const date = new Date();
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');
    return `${hour}:${minutes}:${seconds}`;
  };

  /**
   * @description Flats the provided array into a single array with 1 deep level
   */
  static flatArray = <T>(array: Array<Array<T>>): Array<T> => [].concat.apply([], [...array]);
}
