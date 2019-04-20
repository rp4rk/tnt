import React from "react";
import { connect } from "react-redux";
import { Card, Select } from "antd";
import styled from "styled-components";
import { getProjectActivities } from "../../selectors/projects";
import { containsString } from "../../util/string";

const { Option } = Select;
const StyledCard = styled(Card)`
  && {
    padding-bottom: 5px;
  }
`;

const mapStateToProps = (state, props) => ({
  activities: getProjectActivities(state, props.project)
});

const Entry = ({ day, activities }) => {
  return (
    <StyledCard size="small" title="Time Entry">
      <Select
        style={{ width: 200 }}
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
    </StyledCard>
  );
};

export default connect(mapStateToProps)(Entry);
