import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";

import i18n from "i18n";
import App from "@app/screens/App";
import AuthProvider from "@infra/AuthProvider";

let getByText;
let initialEntries: string[];

const translation = i18n.getDataByLanguage("en").translation;
const homeTitle = translation["/"];
const aboutTitle = translation["/about"];


beforeEach(() => {
  const renderResult = render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );

  getByText = renderResult.getByText;
  initialEntries = ["/"];
});

test("starts on home screen", () => {
  expect(getByText(homeTitle)).toBeInTheDocument();
});

test("clicking on about link on home screen loads about page", () => {
  fireEvent.click(getByText("about"));

  expect(getByText(aboutTitle)).toBeInTheDocument();
});

test("clicking on home link on about screen loads home page", () => {
  initialEntries = ["/about"];

  fireEvent.click(getByText("home"));

  expect(getByText(homeTitle)).toBeInTheDocument();
});
