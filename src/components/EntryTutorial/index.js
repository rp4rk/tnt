import React from 'react';
import { Typography } from 'antd';

import Tutorial from 'components/Tutorial';
import { TUTORIALS } from 'constants/tutorials';

const { Title } = Typography;

const steps = [
  {
    content: () => (
      <>
        <Title level={4}>Time Entry!</Title>
        <p>
          It's time to get started with time entries, follow this tutorial to
          find out how!
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="tour-date-entry"]',
    content: () => (
      <>
        <Title level={4}>Enter a Date</Title>
        <p>
          Exactly what it sounds like, you can enter a date here for your time
          entry to be submitted on.
        </p>
        <p>
          Unlike Redmine, TNT supports submitting entries for multiple days -
          including an option to log on weekends! Note that by default,{' '}
          <strong>weekends are ignored!</strong>
        </p>
        <p>
          Do not worry about entries spanning across multiple weeks!{' '}
          <span role="img" aria-label="smiley face">
            😁
          </span>
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="activity-selector"]',
    content: () => (
      <>
        <Title level={4}>Enter an Activity</Title>
        <p>
          By default, Redmine requires time entries to have an activity
          associated with them.
        </p>
        <p>
          For example, if entering a standup you can set this to "Meeting" or
          similar.
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="activity-description"]',
    content: () => (
      <>
        <Title level={4}>Enter a Description</Title>
        <p>
          Enter what you were doing, it's best if this is as descriptive as
          possible. At least 7 characters are required!
        </p>
        <p>
          For entries spanning multiple days, the same description will be used.
          This means multiple day entries aren't great for detail, but good for
          getting rid of repetitive entries.
          <span role="img" aria-label="smiley face">
            👀
          </span>
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="activity-issue"]',
    content: () => (
      <>
        <Title level={4}>Enter an Issue (?)</Title>
        <p>
          If you log your time under a certain issue for your own name, or use
          issues for what they're actually intended for, you can choose one from
          here.
        </p>
        <p>
          Note that issues are entirely optional, and aren't required to submit
          an entry!
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="activity-hours"]',
    content: () => (
      <>
        <Title level={4}>Enter a Duration</Title>
        <p>
          Super simple, enter the amount of time you were doing something for!
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="activity-submit"]',
    content: () => (
      <>
        <Title level={4}>
          Submit your Issue!{' '}
          <span role="img" aria-label="siren">
            🚨
          </span>
        </Title>
        <p>
          Be super careful, pressing this button submits this entry to Redmine!
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="new-entry-button"]',
    content: () => (
      <>
        <Title level={4}>Do it Again!</Title>
        <p>
          Press this to add a new time entry template to fill in and submit!
        </p>
      </>
    )
  },
  {
    selector: '[data-tour="project-settings"]',
    content: () => (
      <>
        <Title level={4}>
          Psst...{' '}
          <span role="img" aria-label="ninja">
            🐱‍👤
          </span>
        </Title>
        <p>
          This button is the project settings button, it allows you to set a
          nickname or default issue for a project.
        </p>
        <p>
          Setting a nickname is simple, it just allows you to rename a project
          in case it's annoying you.
        </p>
        <p>
          Setting a default issue will ensure all entries going forward are
          logged uner that entry for the project!
        </p>
      </>
    )
  }
];

const TimeEntryTutorial = () => {
  return <Tutorial steps={steps} tutorial={TUTORIALS.TIME_ENTRY} />;
};

export default TimeEntryTutorial;
