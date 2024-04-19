export type State = {
  value: number;
};

export const ActionTypes = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
} as const;

export type Action = {
  type: keyof typeof ActionTypes;
  payload?: number;
};

export const initialState: State = { value: 1 };

export const reducer = (state = initialState, action: Action) => {
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
