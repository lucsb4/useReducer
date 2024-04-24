# Implementing useReducer with useState

So my friend and I were talking the other day about how useState is just a simpler implementation of useReducer in React's library. In fact after a bit of digging and uncovering a forest of weird function names and types (with Flow!) we got to the useState implementation, and we confirmed our suspicions. It is of course in their Github repository.

He quickly implemented useState with useReducer and suggested me, as an exercise, to do the same, but in reverse: implementing useReducer with useState. With Typescript. And tests. Let's see how we can do that.

First we can set-up our project. We will install react and our test library. I used vite because create-react-app (CRA) takes 15 seconds more to install.

With the command `npm create vite` we can create our react library - just select the appropriate options and you're good to go.

After that let's install what we need for now. I'll be using Jest and Testing-library/react. I read some blog posts on the internet and apparently Vite does not fully support Jest. I don't know what specific cases that this applies and to which extent that this is true nowadays - after all, fixes and compatibility interfaces must have been implemented after those posts. And for what we need it's fine. So we can install those now.

Jest: `npm i jest jest-environment-jsdom --save-dev`
Testing-library: `npm i @testing-library/react @testing-library/jest-dom --save-dev`
And our types: `npm i @types/jest`

Now for the implementation. We create a file named useReducer.ts in the src folder. We already know what is the signature for useReducer but for good measure let's check on React's documentation.

Oh, would you look at that.

<blockquote>
<b>Parameters</b>

reducer: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.  

initialArg: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next init argument.  

optional init: The initializer function that should return the initial state. If it’s not specified, the initial state is set to initialArg. Otherwise, the initial state is set to the result of calling init(initialArg).

<b>Returns</b>  
useReducer returns an array with exactly two values:

The current state. During the first render, it’s set to init(initialArg) or initialArg (if there’s no init).

The dispatch function that lets you update the state to a different value and trigger a re-render.
</blockquote>

I knew that useReducer had a third optional parameter but I never saw that in any production code. Must be used in some very niche situations, I guess. If you know some advanced cases for that *init* function, let me know.

Ok, so useReducer takes the reducer function, the initialArg, the init (optional) and returns a tuple with the current state and the dispatch function. Let's get down to it.

```js
import { useState } from "react";

export const useReducer = function (reducer, initialArg, init) {
  // our implementation will be here

  return [state, dispatch];
};
```

Let's define how our first state will be. According to the documentation, *initialArg* and *init* take part on calculating the initial value. So...

```js
let initialState;
if (typeof init === "function") {
  initialState = init(initialArg);
} else {
  initialState = initialArg;
}

const [state, setState] = useState(initialState);
```

That was my approach. It doesn't matter what the dev puts in init as long as it is not a function. If it is, then he probably had something in mind on how to use that init function. Why would you pass a function into init anyway?!

Our state should be fine now. Let's then create our dispatch variable. Dispatch returns a new state depending on the reducer function so we can do...

```js
const dispatch = setState(reducer(state, action));
```

Oops! Action is not in our function scope, it will come from the outside world with how the reducer is implemented, so we can wrap that in a function and get action as an argument.

```js
const dispatch = (action) => {
    setState(reducer(state, action));
  };
```

This should be fine. We can now return our array.

```js
return [state, dispatch];
```

There you go, we have a useReducer hook using useState, and it's already working given that you call it with a functioning reducer and initialArg.

Let's work with our tests now.
