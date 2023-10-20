// src/_tests_/NumberOfEvents.test.js

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test("renders text input", () => {
   const input = NumberOfEventsComponent.queryByRole('textbox');
   expect(input).toBeInTheDocument();
  });

  test("number of events is 32 by default", () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toHaveValue("32");
  });

  test("updates textbox correctly when user types in NumberOfEvents textbox", async () => {
    //User Interaction Setup
    const user = userEvent.setup();
    //user types "10" in NumberOfEvents textbox
    const input = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(input, '{backspace}{backspace}10');
    // Rerender NumberOfEvents with user input
    expect(input).toHaveValue("10");
  });
});
