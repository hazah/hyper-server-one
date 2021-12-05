import React from 'react'

import { Story, Meta } from '@storybook/react';

import AccessForm, { AccessFormProps } from './AccessForm';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import theme from "../theme";
import { Helmet } from 'react-helmet';

export default {
  component: AccessForm,
  title: 'Components/AccessForm',
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta;

const FormTemplate: Story<AccessFormProps> = args => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>
    </Helmet>
    <AccessForm {...args}/>
  </ThemeProvider>
);

export const RegisterationForm = FormTemplate.bind({});

RegisterationForm.args = {
};

export const AuthenticationForm = FormTemplate.bind({});

AuthenticationForm.args = {
  user: {}
};

export const EjectionForm = FormTemplate.bind({});

EjectionForm.args = {
  user: { email: "john.smith@example.com" }
};
