import React from 'react';
import { Typography, Divider, Icon } from 'antd';
import { AuthenticationForm } from 'components/AuthenticationForm';
import AuthenticationTutorial from 'components/AuthenticationTutorial';

const { Title, Text } = Typography;

export const Authenticate = props => (
  <>
    {props.location.isRedirected && alert('Please provide Redmine settings.')}
    <AuthenticationTutorial />
    <Title level={2}>
      <Icon type="setting" /> - Authenticate
    </Title>
    <Text>
      {process.env.NODE_ENV} In order to work, we require your redmine address
      and API key.{' '}
      <strong>
        These details aren't stored anywhere else aside from your computer.
      </strong>
    </Text>
    <Divider />
    <AuthenticationForm />
  </>
);
