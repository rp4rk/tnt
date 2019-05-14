import React from 'react';
import { Input } from 'antd';

const Hours = ({ value, onChange }) => {
  return <Input value={value} onChange={onChange} placeholder="0" />;
};

export default Hours;
