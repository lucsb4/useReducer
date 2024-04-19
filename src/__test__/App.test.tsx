// src/__ tests __/App.test.tsx

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "../App";

test("Increments the value", () => {
  render(<App />);
  const incrementButton = screen.getByTestId("increment-button");

  fireEvent.click(incrementButton);

  const textValue = screen.getByTestId("test-result");

  expect(textValue).toHaveTextContent("1");
});

test("Decrements the value", () => {
  render(<App />);
  const decrementButton = screen.getByTestId("decrement-button");

  fireEvent.click(decrementButton);

  const textValue = screen.getByTestId("test-result");

  expect(textValue).toHaveTextContent("-1");
});
