import path from 'path';
import newman from 'newman';
import { Postman, Bot } from './index';
import { BotMsg } from '../types/index';


export default class Newman {
  /**
   * @description 1. Executes Newman to report the Postman collections
   *              2. Create and return the bot message formatted by blocks
   *
   * @returns {string}
   */
  static executeNewmanAndGetMessage = async (): Promise<BotMsg> => {
    // Get postman collection & environment to be executed with
    const postmanCollection = path.resolve(__dirname, `../../assets/${process.env.POSTMAN_COLLECTION_NAME}.json`);
    const environmentCollection = process.env.POSTMAN_ENVIRONMENTS_NAME
      ? path.resolve(__dirname, `../../assets/${process.env.POSTMAN_ENVIRONMENTS_NAME}.json`)
      : undefined;

    // Return promise with the message created after executing newman and process summary data
    return new Promise((resolve, reject) => {
      newman.run({
        collection: postmanCollection,
        environment: environmentCollection,
      },

      (err, summary) => {
        if (err) { reject(err); }
        // Newman executed successfully
        if (summary && summary.run) {
          const { executions: postmanRequests } = summary.run;
          const executionsObj = Postman.createRequestsObjects(postmanRequests);
          const botMsg = Bot.createBotMsg(executionsObj);
          resolve(botMsg);
        } else {
          reject(new Error('Report summary is undefined cause of an unexpected error'));
        }
      });
    });
  };
}
