import React from "react";
import { connect } from "react-redux";
import { Select, InputNumber, Input, Typography, Button, Icon } from "antd";

import { getProjectActivities } from "../../selectors/projects";
import { containsString } from "../../util/string";
import DateRangePicker from "../DateRangePicker";

import { StyledCard, GridContainer, ActionsContainer } from "./styled";
import { createTimeEntry, updateTimeEntry } from "../../actions/entries";
import { getEntryProperty } from "../../selectors/entries";

const { Text } = Typography;
const { Option } = Select;

const mapStateToProps = (state, { projectId, entryId }) => ({
  activities: getProjectActivities(state, projectId),
  hours: getEntryProperty(state, projectId, entryId, "hours"),
  comments: getEntryProperty(state, projectId, entryId, "comments")
});

const mapDispatchToProps = (dispatch, { projectId, entryId }) => ({
  createNewTimeEntry: () => dispatch(createTimeEntry(projectId)),
  setActivityId: value =>
    dispatch(updateTimeEntry(projectId, entryId, "activityId", value)),
  setHours: value =>
    dispatch(updateTimeEntry(projectId, entryId, "hours", value)),
  setComments: e =>
    dispatch(updateTimeEntry(projectId, entryId, "comments", e.target.value))
});

const Entry = ({
  activities,
  createNewTimeEntry,
  setHours,
  setComments,
  setActivityId,
  hours,
  comments,
  projectId,
  entryId
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
      <ActionsContainer>
        <Button>
          <Icon type="plus-circle" theme="filled" />
          Submit
        </Button>
        <Button type="primary" onClick={createNewTimeEntry}>
          <Icon type="plus-circle" theme="filled" />
          New Time Entry
        </Button>
      </ActionsContainer>
    </StyledCard>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);
