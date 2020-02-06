/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/camelcase */
export default {
  STARTER_BOT_MSG: {
    icon_emoji: ':bar_chart:',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Ok, give me some seconds _(less than a minute)_ to execute all the tests! :rocket:\n'
                + 'I will be back soon with the results summary :sunglasses:',
        },
      },
    ],
  },
  NOT_STARTER_BOT_MSG: {
    icon_emoji: ':bar_chart:',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:no_entry: Sorry but the only command allowed is "*_start_*"`,
        },
      },
    ],
  },
};
