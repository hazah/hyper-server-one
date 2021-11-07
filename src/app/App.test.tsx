import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@app/App";

import i18n from "i18n";

let getByText;
let initialEntries = ["/"];

const { homeTitle, aboutTitle } = i18n.getDataByLanguage('en').translation;

beforeEach(() => {
  const renderResult = render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
  
  getByText = renderResult.getByText;
});

test("starts on home screen", () => {
  expect(getByText(homeTitle)).toBeInTheDocument();
});

test("clicking on about link on home screen loads about page", () => {
  fireEvent.click(getByText('about'));

  expect(getByText(aboutTitle)).toBeInTheDocument();
});

test("clicking on home link on about screen loads home page", () => {
  initialEntries = ["/about"]

  fireEvent.click(getByText('home'));

  expect(getByText(homeTitle)).toBeInTheDocument();
});
