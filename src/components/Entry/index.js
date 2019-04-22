import React from "react";
import { connect } from "react-redux";
import { Select, InputNumber, Input, Typography, Button, Icon } from "antd";

import { getProjectActivities } from "../../selectors/projects";
import { containsString } from "../../util/string";
import DateRangePicker from "../DateRangePicker";

import { StyledCard, GridContainer, ActionsContainer } from "./styled";
import { createTimeEntry } from "../../actions/entries";

const { Text } = Typography;
const { Option } = Select;

const mapStateToProps = (state, props) => ({
  activities: getProjectActivities(state, props.projectId)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createNewTimeEntry: () => dispatch(createTimeEntry(ownProps.projectId))
});

const Entry = ({ day, activities, createNewTimeEntry }) => {
  return (
    <StyledCard size="small" title="Time Entry">
      <GridContainer>
        <Text>Date</Text>
        <DateRangePicker />

        <Text>Activity</Text>
        <Select
          showSearch
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
        <Input />

        <Text>Hours</Text>
        <InputNumber />
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
