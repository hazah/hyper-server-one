import React from "react";

import { Story, Meta } from "@storybook/react";

import Access, { AccessProps } from "./Access";

import theme from "../theme";
import { Helmet } from "react-helmet";

export default {
  component: Access,
  title: "Components/Access",
  argTypes: { onSubmit: { action: "submit" } },
} as Meta;

const FormTemplate: Story<AccessProps> = (args) => (
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Access {...args} />
  </>
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
