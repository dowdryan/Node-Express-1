### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Callback Functions
  - Promises
  - Async and Await
  - Libraries and Frameworks

- What is a Promise?
  - A Promise in Javascript represents the result of an asynchronous operation. Using a promise guarentees that you will get some sort of result, whether it be the complete data you were looking for, or an error message.

- What are the differences between an async function and a regular function?
  - Unique Syntax
  - Regular Return statements either return some type of value, or will return undefined.
  - Async Return statements return a promise that's eventually resolved or is rejected due to an error.
  - Async functions can use try-catch blocks for synchronous/asynchronous code, where regulare functions can only use try-catch blocks for synchronous code.

- What is the difference between Node.js and Express.js?
  - Node
    - A runtime environment tbat can execute JS code on the server-side.
    - Provides core functionality for creating server apps
    - Event-Driven
  - Express
    - Web Framework
    - Routing System that can handle different types of HTTP requests (GET, POST, PATCH, DELETE, etc.)
    - Uses middleware functions

- What is the error-first callback pattern?
  - A convention used in JS to handle asynchronous functions that use callbacks.

- What is middleware?
  - A piece of software capable of allowing different software applications to interact with each other.

- What does the `next` function do?
  - Passes control from the current middleware to the next middleware function, so that the requests/responses can continue moving throughout the middleware pipeline.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
  - A request does not need to be physically written for each user. 
    - Fix: ```const response = await $.getJSON(`https://api.github.com/users/${username}`);```
  - No error handling.
  - Joel's and Matt's usernames do not provide as much simplicity as Elie's.
