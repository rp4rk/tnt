import React from 'react';
import Tutorial from 'components/Tutorial';
import { Typography } from 'antd';
import { TUTORIALS } from 'constants/tutorials';

const { Title } = Typography;

const steps = [
  {
    content: () => (
      <>
        <Title level={4}>
          Welcome!{' '}
          <span role="img" aria-label="smiley face">
            😁
          </span>
        </Title>
        <p>This short tutorial will help you to get started with TNT!</p>
      </>
    )
  },
  {
    selector: '[data-tour="redmine-address"]',
    content: () => (
      <>
        <Title level={4}>Redmine Address</Title>
        <p>
          Your redmine address typically ends with <strong>/redmine</strong>.
        </p>
        <p>
          Ensure that this is an HTTPS link, unsecured HTTP is not supported.
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="redmine-key"]',
    content: () => (
      <>
        <Title level={4}>Redmine API Key</Title>
        <p>
          TNT uses your API key to authenticate with Redmine, this can be found
          in your account page.
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="redmine-details-save"]',
    content: () => (
      <>
        <Title level={4}>Save Details</Title>
        <p>When you press save, your details are stored to your browser.</p>
        <p>
          <strong>Your details are never stored elsewhere.</strong>
        </p>
      </>
    )
  }
];

const AuthenticationTutorial = () => {
  return <Tutorial steps={steps} tutorial={TUTORIALS.AUTHENTICATION} />;
};

export default AuthenticationTutorial;
