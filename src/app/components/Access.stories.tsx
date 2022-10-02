import React from "react";

import { Story, Meta } from "@storybook/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Access from "@components/Access";
import AccessProps from "@components/access/props";

import theme from "theme";

export default {
  component: Access,
  title: "Components/Access",
  argTypes: { onSubmit: { action: "submit" } },
} as Meta;

const FormTemplate: Story<AccessProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Access {...args} />
  </ThemeProvider>
);

export const RegisterationForm = FormTemplate.bind({});

RegisterationForm.args = {};

export const AuthenticationForm = FormTemplate.bind({});

AuthenticationForm.args = {
  user: {},
};

export const EjectionForm = FormTemplate.bind({});

EjectionForm.args = {
  user: { email: "john.smith@example.com" },
};
