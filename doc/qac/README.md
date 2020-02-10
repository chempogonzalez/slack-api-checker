# 🔰 JavaScript Documentation Standards
JSDoc is a markup language used to annotate JavaScript source code files. Using comments containing JSDoc, programmers can add documentation describing the application programming interface of the code they're creating.

More info: [JSDoc](https://jsdoc.app/)

### SINGLE LINE COMMENTS
```js
// Extract the array values.
```

### MULTI-LINE COMMENTS
```js
/**
 * This is a comment that is long enough to warrant being stretched over
 * the span of multiple lines. You'll notice this follows basically
 * the same format as the JSDoc wrapping and comment block style.
 */
```

### CLASS
```js
/**
 * @class IntentClassFactory
 *
 * @description Create classes dynamically to the target intent. Typescript reflection
 *
 * @author First and Last Name | Github User
 */
```

### FUNCTIONS
```js
/**
* @function getIntentClass
*
* @description Return an intent class from its name.
*
* @param {string} intentName - The name located in the attribute 'name' in the loaded json in the variable intentsJson.
*
* @returns {Promise<any>}
*
*/
```

### INTERFACES
```js
/**
 * @interface DialogflowResponse
 *
 * @description Original Dialogflow response ready to send.
 *
 * @author First and Last Name | Github User
 *
 * @property {string} fulfillment_text - The text to be shown on the screen.
 */
```