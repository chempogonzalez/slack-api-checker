/* Export all types */
import { ObjectType } from './object';

export * from './object';

// Bot related
export type BotMsg = { icon_emoji: string; blocks: ObjectType[] };
export type Field = { type: string; text: string };
export type Block = { type: string; elements?: Field[]; fields?: Field[] };


// Postman related
export type TestsFromAssertions = { tests: ObjectType[]; failedTest: ObjectType };
export type Execution = { postmanRequestName: string } & TestsFromAssertions;
