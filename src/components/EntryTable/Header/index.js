import React from 'react';
import { DatePicker } from 'antd';

const Header = ({ value, onDateChange }) => {
  return (
    <>
    <DatePicker value={value} onChange={(date) => onDateChange(date)} style={{ marginBottom: 25 }} allowClear={false} />
      <h3>{`${value.startOf('week').format('Do MMMM YYYY')} - ${value.endOf('week').format('Do MMMM YYYY')}`}</h3>
    </>
  );
}

export default Header;
