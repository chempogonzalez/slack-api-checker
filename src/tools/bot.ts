/* eslint-disable @typescript-eslint/camelcase */
import SlackBot from 'slackbots';
import { Helpers, Newman } from './index';
import {
  Execution,
  BotMsg,
  Block,
  Field,
} from '../types';
import Constants from '../config/constants';
import log, { logError } from './logger';


class Bot {
  /* Bot to be used to send messages */
  private _bot: SlackBot;

  /**
   * @description Executes callback code inside 'open' Event.
   *              - Event: websocket connection is open and ready to communicate.
   *
   * @returns {void}
   */
  public readonly onOpen = (cb: Function): void => {
    if (this._bot) {
      this._bot.on('open', () => {
        cb();
      });
      return;
    }
    this.botNotInitialized();
  };

  /**
   * @description Executes callback code inside 'start' Event.
   *              - Event: event fired, when Real Time Messaging API is started (via websocket).
   *
   * @returns {void}
   */
  public readonly onStart = (cb: Function): void => {
    if (this._bot) {
      this._bot.on('start', () => {
        cb();
      });
      return;
    }
    this.botNotInitialized();
  };

  /**
   * @description Executes callback code inside 'message' Event.
   *              - Event: event fired, when something happens in Slack.
   *
   * @returns {void}
   */
  public readonly onMessageReceived = (cb: Function): void => {
    if (this._bot) {
      this._bot.on('message', (data) => {
        cb(data);
      });
      return;
    }
    this.botNotInitialized();
  }

  /**
   * @description Executes callback code inside 'message' Event.
   *              - Event: an error occurred while connecting to Slack
   *
   * @returns {void}
   */
  public readonly onError = (cb?: Function): void => {
    if (this._bot) {
      this._bot.on('error', (error) => {
        logError(error);
        if (cb) cb(error);
      });
      return;
    }
    this.botNotInitialized();
  };

  /**
   * @description Initialize bot based on bot token and bot name provided through .env variables
   *
   * @returns {void}
   */
  public readonly initializeBot = (): void => {
    this._bot = new SlackBot({
      token: `${process.env.SLACK_BOT_TOKEN}`,
      name: `${process.env.SLACK_BOT_NAME}`,
    });
  };


  /**
   * @description Creates bot message based on the executions object with the Slack blocks format.
   *
   * @param {Array<Execution>} executionsObj Array of executions got from newman summary
   *
   * @returns {BotMsg}
   */
  public readonly createBotMsg = (executionsObj: Execution[]): BotMsg => {
    const projectName = process.env.PROJECT_NAME;
    const okCheck = ':heavy_check_mark:';
    const failCheck = ':x:';
    const botMsg = {
      icon_emoji: ':bar_chart:',
    };
    const messageBlocks: Block[] = [
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*${projectName.toUpperCase()}* - API status report`,
          },
          {
            type: 'mrkdwn',
            text: `*Execution hour:* ${Helpers.getExecutionHour()}`,
          },
        ],
      },
      {
        type: 'divider',
      },
    ];

    const processedFields: Field[][] = executionsObj.map((execution) => [
      {
        type: 'mrkdwn',
        text: `:small_orange_diamond: *${execution.postmanRequestName}*`,
      },
      {
        type: 'mrkdwn',
        text: `${execution.failedTest ? failCheck : okCheck}`,
      },
    ]);

    const flattedFields: Field[] = Helpers.flatArray(processedFields);
    const numFieldSections = flattedFields.length / 6;

    for (let i = 0; i < numFieldSections; i += 1) {
      messageBlocks.push(
        {
          type: 'section',
          fields: flattedFields.slice(6 * i, (i > numFieldSections - 1) ? undefined : (6 * i) + 6),
        },
      );
    }

    return {
      ...botMsg,
      blocks: messageBlocks,
    };
  };


  /**
   * @description Checks if data gotten from slack is valid to start the execution
   *
   * @param data data object from
   * @param bot bot instance
   *
   * @returns {Promise<void>}
   */
  public readonly checkDataAndSendMsg = async (data): Promise<void> => {
    if (data.type !== 'message' || data.subtype === 'bot_message' || !data.text) return;

    const { text: msgText, channel } = data;
    if (data
      && msgText
      && msgText.indexOf(process.env.SLACK_BOT_ID) !== -1
      && channel) {
      const text = data.text.substring(data.text.indexOf('>') + 1).trim();
      if (text === 'start') {
        // Send starter message to inform the user
        this.sendMessage(channel, Constants.STARTER_BOT_MSG);

        // Execute newman and get the message well formatted
        const botMsg = await Newman.executeNewmanAndGetMessage();
        // Send the report via message
        this.sendMessage(channel, botMsg);
        log('Message sent!');
      } else {
        // Send error message when other command is requested
        this.sendMessage(channel, Constants.NOT_STARTER_BOT_MSG);
      }
    }
  };

  /**
   * @description Send message to a channel, group or user directly by Id
   *
   * @param id channel | group | user  - ID
   * @param msg Message to be sent in block formatted mode
   *
   * @returns {void}
   */
  public readonly sendMessage = (id: string, msg: BotMsg): void => {
    if (this._bot) {
      this._bot.postMessage(id, '', msg).fail((data) => {
        logError(data);
      });
      return;
    }
    this.botNotInitialized();
  }

  /**
   * @description Send message to an user directly in a private conversation
   *
   * @param user User name
   * @param msg Message to be sent in block formatted mode
   *
   * @returns {void}
   */
  public readonly sendMessageToUser = (user: string, msg: BotMsg): void => {
    if (this._bot) {
      this._bot.postMessageToUser(user, '', msg).fail((data) => {
        logError(data);
      });
      return;
    }
    this.botNotInitialized();
  }


  /**
   * @description Send message to a channel publicly
   *
   * @param {string} channel channel name
   * @param {BotMsg} msg Message to be sent in block formatted mode
   *
   * @returns {void}
   */
  public readonly sendMessageToChannel = (channel: string, msg: BotMsg): void => {
    if (this._bot) {
      this._bot.postMessageToChannel(channel, '', msg);
      return;
    }
    this.botNotInitialized();
  }


  /**
   * @description Throws an error if bot is not initialized
   *
   * @returns {Error}
   */
  private readonly botNotInitialized = (): Error => { throw Error('Bot is not initialized'); };
}


export default new Bot();
