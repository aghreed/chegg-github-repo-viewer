import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import { initialState } from "./config/reducer";

const mockStore = (state) => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

it("renders without crashing, and produces a snapshot", () => {
  const div = document.createElement("div");
  const component = ReactDOM.render(<Provider store={mockStore(initialState)}><App /></Provider>, div);
  expect(component).toMatchSnapshot();
});
