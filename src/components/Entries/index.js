import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography, Divider, Icon, Button } from 'antd';

import TimeEntry from 'components/TimeEntry';
import { createTimeEntry } from 'actions/entries';
import { getActiveProject } from 'selectors/projects';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';
import { ActionHolder } from './styled';

const { Title, Text } = Typography;

const mapStateToProps = state => ({
  activeProjectId: getActiveProject(state),
  redmineAddress: getRedmineAddress(state),
  redmineKey: getRedmineKey(state)
});

const mapDispatchToProps = dispatch => ({
  createNewTimeEntry: activeProjectId =>
    dispatch(createTimeEntry(activeProjectId))
});

const Entries = ({
  createNewTimeEntry,
  activeProjectId,
  redmineAddress,
  redmineKey
}) => {
  if (!redmineAddress || !redmineKey) {
    return (
      <Redirect
        to={{
          pathname: '/settings',
          isRedirected: true
        }}
      />
    );
  }

  return (
    <>
      <Title level={2}>
        <Icon type="clock-circle" /> Time Entries
      </Title>
      <Text>
        Draft your time entries here, don't worry about making mistakes they
        won't save until you say so!
      </Text>
      <Divider />
      <TimeEntry />
      <ActionHolder>
        <Button
          data-tour="new-entry-button"
          type="primary"
          onClick={() => createNewTimeEntry(activeProjectId)}
        >
          <Icon type="plus-circle" theme="filled" />
          New Time Entry
        </Button>
      </ActionHolder>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);
