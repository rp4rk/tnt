import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const Activity = ({ value, onChange }) => {
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
      <Option value="development">Development</Option>
      <Option value="meeting">Meeting</Option>
      <Option value="testing">Testing</Option>
    </Select>
  );
};

export default Activity;
