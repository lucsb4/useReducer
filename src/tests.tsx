import React from "react";
import { useReducer } from "./useReducer";

type State = {
  value: number;
};

// usando enums!
enum ActionTypes {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

type Action = {
  type: ActionTypes;
  payload?: number;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case ActionTypes.DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };
    default:
      return state;
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <>
      <p>{state.value}</p>
      <button onClick={() => dispatch({ type: ActionTypes.INCREMENT })}>
        increment
      </button>
      <button onClick={() => dispatch({ type: ActionTypes.DECREMENT })}>
        decrement
      </button>
    </>
  );
};
