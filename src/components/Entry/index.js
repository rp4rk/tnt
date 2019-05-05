import React from 'react';
import { connect } from 'react-redux';
import { Select, InputNumber, Input, Typography, Button, Icon } from 'antd';

import { getProjectActivities } from 'selectors/projects';
import { containsString } from 'util/string';
import DateRangePicker from 'components/DateRangePicker';

import { StyledCard, GridContainer, ActionsContainer } from './styled';
import { updateTimeEntry } from 'actions/entries';
import { getEntryProperty, entrySubmissionDisabled } from 'selectors/entries';
import { createPendingEntries } from 'actions/entryposts';
import { entryPostsComplete, entryPostsLoading } from 'selectors/entryposts';

const { Text } = Typography;
const { Option } = Select;

const mapStateToProps = (state, { projectId, entryId }) => ({
  activities: getProjectActivities(state, projectId),
  hours: getEntryProperty(state, projectId, entryId, 'hours'),
  comments: getEntryProperty(state, projectId, entryId, 'comments'),
  disableSubmit: entrySubmissionDisabled(state, projectId, entryId),
  complete: entryPostsComplete(state, projectId, entryId),
  loading: entryPostsLoading(state, projectId, entryId)
});

const mapDispatchToProps = (dispatch, { projectId, entryId }) => ({
  setActivityId: value =>
    dispatch(updateTimeEntry(projectId, entryId, 'activityId', value)),
  setHours: value =>
    dispatch(updateTimeEntry(projectId, entryId, 'hours', value)),
  setComments: e =>
    dispatch(updateTimeEntry(projectId, entryId, 'comments', e.target.value)),
  createPendingEntries: () => dispatch(createPendingEntries(projectId, entryId))
});

const Entry = ({
  activities,
  createPendingEntries,
  setHours,
  setComments,
  setActivityId,
  hours,
  comments,
  projectId,
  entryId,
  disableSubmit,
  complete,
  loading
}) => {
  return (
    <StyledCard size="small" title="Time Entry">
      <GridContainer>
        <Text>Date</Text>
        <DateRangePicker projectId={projectId} entryId={entryId} />

        <Text>Activity</Text>
        <Select
          showSearch
          onChange={setActivityId}
          placeholder="Select an activity"
          filterOption={(input, option) =>
            containsString(option.props.children, input)
          }
        >
          {activities.map(activity => (
            <Option key={activity.id} value={activity.id}>
              {activity.name}
            </Option>
          ))}
        </Select>

        <Text>Description</Text>
        <Input onChange={setComments} value={comments} />

        <Text>Hours</Text>
        <InputNumber onChange={setHours} value={hours} />
      </GridContainer>
      <ActionsContainer complete={complete}>
        {!complete && !loading && (
          <Button disabled={disableSubmit} onClick={createPendingEntries}>
            <Icon type="plus-circle" theme="filled" />
            Submit
          </Button>
        )}
        {loading && <Icon style={{ color: 'black' }} type="loading" />}
        {complete && (
          <>
            <span>Entries submitted successfully!</span>
            <Icon type="check-circle" />
          </>
        )}
      </ActionsContainer>
    </StyledCard>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);
