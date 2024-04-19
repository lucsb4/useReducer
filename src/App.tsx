import { Action, ActionTypes, State } from "./reducer";
import { useReducer } from "./useReducer";

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
      <p data-testid="test-result">{state.value}</p>
      <button
        onClick={() => dispatch({ type: ActionTypes.INCREMENT })}
        data-testid="increment-button"
      >
        increment
      </button>
      <button
        onClick={() => dispatch({ type: ActionTypes.DECREMENT })}
        data-testid="decrement-button"
      >
        decrement
      </button>
    </>
  );
};
