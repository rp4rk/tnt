import React from 'react';
import { Table } from 'antd';
import { format } from 'date-fns';
import _ from 'lodash';

const groupByDate = allEntries => {
  let summary = [];
  let grouped = _.groupBy(allEntries, 'spent_on');
  const groupedByDate = Object.entries(grouped);

  groupedByDate.forEach(date => {
    let totalHours = 0;
    let dateEntries = date[1];
    let isHoliday = '';
    dateEntries.forEach(entry => {
      totalHours += entry.hours;
      if (entry.activity.name === 'Vacation/PTO/Holiday')
        isHoliday = ' - Vacation';
    });
    summary.push({
      key: date[0],
      spent_on: format(date[0], 'dddd YYYY-MM-DD'),
      hours: `${totalHours}${isHoliday}`
    });
  });
  return summary;
};

const columns = [
  {
    title: 'Date',
    dataIndex: 'spent_on',
    key: 'spent_on',
    width: 100
  },
  {
    title: 'Total Hours',
    dataIndex: 'hours',
    key: 'hours',
    width: 100
  }
];

const SummaryTable = ({ groupedEntries }) => {
  const data = groupByDate(groupedEntries);

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 5 }}
      style={{ width: '80%', marginBottom: 15 }}
    />
  );
};

export default SummaryTable;
