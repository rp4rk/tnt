import React from "react";
import { connect } from "react-redux";
import { Card, Select, InputNumber, Input, Typography, Button } from "antd";
import styled from "styled-components";

import { getProjectActivities } from "../../selectors/projects";
import { containsString } from "../../util/string";
import DateRangePicker from "../DateRangePicker";

const { Text } = Typography;

const { Option } = Select;
const StyledCard = styled(Card)`
  && {
    padding-bottom: 5px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;

  && > * {
    margin-bottom: 12px;
  }
`;

const mapStateToProps = (state, props) => ({
  activities: getProjectActivities(state, props.project)
});

const Entry = ({ day, activities }) => {
  return (
    <StyledCard size="small" title="Time Entry">
      <GridContainer>
        <Text>Date</Text>
        <DateRangePicker />

        <Text>Activity</Text>
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

        <Text>Description</Text>
        <Input />

        <Text>Hours</Text>
        <InputNumber />
        <Button type="primary">Submit</Button>
      </GridContainer>
    </StyledCard>
  );
};

export default connect(mapStateToProps)(Entry);
