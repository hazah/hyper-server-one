import React from 'react'

import { Story, Meta } from '@storybook/react';

import AccessForm, { AccessFormProps } from './AccessForm';

export default {
  component: AccessForm,
  title: 'Components/AccessForm',
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta;

const FormTemplate: Story<AccessFormProps> = args => <AccessForm {...args}/>;

export const RegisterForm = FormTemplate.bind({});

RegisterForm.args = {
};

export const LoginForm = FormTemplate.bind({});

LoginForm.args = {
};

export const LogoutForm = FormTemplate.bind({});

LogoutForm.args = {
};
