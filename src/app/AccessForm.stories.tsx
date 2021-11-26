import React from 'react'

import { Story, Meta } from '@storybook/react';

import AccessForm, { AccessFormProps } from './AccessForm';

export default {
  component: AccessForm,
  title: 'Components/AccessForm',
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta;

const FormTemplate: Story<AccessFormProps> = args => <AccessForm {...args}/>;

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
