import React from 'react';
import { Input } from 'antd';

const Comment = ({ value, onChange }) => {
  return (
    <Input value={value} onChange={onChange} placeholder='Activity comment' />
  )
};

export default Comment;
