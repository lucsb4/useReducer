import { useState } from "react";

type Action<S> = { type: string; payload?: S };

type Reducer<S> = (state: S, action: any) => S;

type UseReducer = <S>(
  reducer: Reducer<S>,
  initialArg: S,
  init?: (p: S) => S
) => [state: S, dispatch: (action: Action<S>) => void];

export const useReducer: UseReducer = function (reducer, initialArg, init) {
  let initialState;
  if (typeof init === "function") {
    initialState = init(initialArg);
  } else {
    initialState = initialArg;
  }

  const [state, setState] = useState(initialState);

  const dispatch = (action: Action<typeof state>) => {
    setState(reducer(state, action));
  };

  return [state, dispatch];
};
