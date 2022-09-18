import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

import i18n from "i18n";
import Router from "@components/Router";
import AuthProvider from "@infra/AuthProvider";

test("renders home screen", async () => {
  const { getByText } = render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Router />
      </MemoryRouter>
    </AuthProvider>
  );

  const translation = i18n.getDataByLanguage("en").translation;
  const homeTitle = translation["/"];
  
  await waitFor(() => expect(document.title).toEqual(homeTitle));
  expect(getByText(homeTitle)).toBeInTheDocument();
});

test("renders about screen", async () => {
  const { getByText } = render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/about"]}>
        <Router />
      </MemoryRouter>
    </AuthProvider>
  );

  const translation = i18n.getDataByLanguage("en").translation;
  const aboutTitle = translation["/about"];

  await waitFor(() => expect(document.title).toEqual(aboutTitle));
  expect(getByText(aboutTitle)).toBeInTheDocument();
});
