import React, { ComponentProps } from 'react'

import { Story, Meta } from '@storybook/react';

import LoginForm, { LoginFormProps } from './LoginForm';

export default {
  component: LoginForm,
  title: 'Components/LoginForm',
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta;

const FormTemplate: Story<LoginFormProps> = args => <LoginForm {...args}/>;

export const Form = FormTemplate.bind({});

Form.args = {
};
