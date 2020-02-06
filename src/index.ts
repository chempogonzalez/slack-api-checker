import dotenv from 'dotenv';
import {
  Helpers,
  Bot,
  log,
  logError,
} from './tools';
import 'pretty-console-colors';

dotenv.config();

/**
 * @description Main execution.
 *            1. Check environment variables are ok
 *            2. Initialize bot
 *            3. Set listeners when
 *              - Bot is online
 *              - Bot received data from input
 *              - An error occurs when the bot is trying to connect to Slack
 */
(async (): Promise<void> => {
  try {
    Helpers.checkEnvironmentVariables();
    Bot.initializeBot();

    Bot.onOpen(() => {
      log('Bot is ready!!');
    });

    Bot.onMessageReceived((data) => {
      Bot.checkDataAndSendMsg(data);
    });

    Bot.onError();
  } catch (err) {
    logError(err.message);
  }
})();
