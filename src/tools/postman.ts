/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ObjectType,
  Execution,
  TestsFromAssertions,
} from '../types';


export default class Postman {
  /**
   * @description Creates the final requests objects **(Execution[])** based on executions array
   *
   * @param executions Param gotten from newman => summary.run.executions
   */
  static readonly createRequestsObjects = (executions: any[]): Execution[] => {
    const defaultArray: Execution[] = [];
    return executions.reduce((accumulatedExecutionObj, currentExecutionObj) => {
      const testsObj: TestsFromAssertions = Postman.getTestsFromAssertionsObj(currentExecutionObj);
      return [
        ...accumulatedExecutionObj,
        {
          postmanRequestName: currentExecutionObj.item.name,
          ...testsObj,
        },
      ] as unknown as Execution;
    }, defaultArray);
  };


  /**
   * @description Creates the object with tests and failedTest for each execution object
   *
   * @param obj This is a single object from iteration of newman => summary.run.executions
   */
  static readonly getTestsFromAssertionsObj = (obj: ObjectType): TestsFromAssertions => {
    const { assertions } = obj;
    const { members: eventList } = obj.item.events;
    let assertionObj = null;
    if (assertions
        && Array.isArray(assertions)
        && assertions[0].skipped === false
        && assertions[0].error
    ) {
      assertionObj = {
        errorTest: assertions[0].error.test,
        errorMsg: assertions[0].error.message,
      };
    }
    if (eventList) {
      const tests = eventList.filter((ev) => ev.listen === 'test');
      const parsedTests = tests.map((test) => ({
        test: {
          name: test.script.exec[0],
        },
      }));
      return {
        tests: [...parsedTests],
        failedTest: assertionObj,
      };
    }
    return undefined;
  };
}
