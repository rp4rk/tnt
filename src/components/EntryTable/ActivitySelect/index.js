import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const Activity = ({ activities, value, onChange }) => {
  return (
    <Select
      onChange={onChange}
      value={value}
      showSearch
      style={{ width: 150 }}
      placeholder="Activity"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {activities.map(activity => <Option key={activity.id} value={activity.id}>{activity.name}</Option>)}
    </Select>
  );
};

export default Activity;
