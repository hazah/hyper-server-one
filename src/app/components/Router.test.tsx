import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Router from "@components/Router";

import i18n from "i18n";

test("renders home screen", async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Router />
    </MemoryRouter>
  );

  const { homeTitle } = i18n.getDataByLanguage("en").translation;
  await waitFor(() => expect(document.title).toEqual(homeTitle));
  expect(getByText(homeTitle)).toBeInTheDocument();
});

test("renders about screen", async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/about"]}>
      <Router />
    </MemoryRouter>
  );

  const { aboutTitle } = i18n.getDataByLanguage("en").translation;
  await waitFor(() => expect(document.title).toEqual(aboutTitle));
  expect(getByText(aboutTitle)).toBeInTheDocument();
});
