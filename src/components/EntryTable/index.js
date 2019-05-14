import React, { useState } from 'react';
import { Input, Select, Table } from 'antd';
import moment from 'moment';

import ActivitySelect from './ActivitySelect';
import CommentInput from './CommentInput';
import Header from './Header';
import HourInput from './HourInput';
import Footer from './Footer';

const EntryTable = () => {
  const [date, setDate] = useState(moment())
  const activeDate = date.clone().startOf('week').format('DD/MM/YYYY');
  const [tableData, setTableData] = useState({ [activeDate]: [{}]});

  const handleDataChange = (index, key, value) => {
    let newData = tableData[activeDate] ? [...tableData[activeDate]] : [{}];
    newData[index][key] = value;
    const rowsWithData = newData.filter(row => {
      return Object.values(row).filter(value => !!value).length > 0;
    })
    if(rowsWithData.length === newData.length) { newData.push({}); }
    else { newData = [...rowsWithData, {}]; }

    setTableData({
      ...tableData,
      [activeDate]: newData
    });
  }

  const getDateRange = () => {
    const start = date.clone().startOf('week');
    const end = date.clone().endOf('week');
    const range = [];
    while(start.isSameOrBefore(end)) {
      range.push(start.clone());
      start.add(1, 'days');
    }
    return range;
  }


  const totals = (tableData[activeDate] || [{}]).reduce((acc, row) => {
    Object.entries(row).forEach(([key, value]) => {
      if(!value || ['activity', 'comment'].includes(key)) { return; }
      acc[key] ? acc[key] += parseFloat(value) : acc[key] = parseFloat(value);
      acc.total ? acc.total += parseFloat(value) : acc.total = parseFloat(value);
    })
    return acc;
  }, {});

  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      width: 150,
      footerValue: 'Total',
      render: (value, row, index) => <ActivitySelect value={value} onChange={(newValue) => handleDataChange(index, 'activity', newValue)} />
    },
    ...getDateRange().map(day => ({ title: day.format('ddd'), key: day.format('DD/MM/YYYY'), dataIndex: day.format('DD/MM/YYYY'), footerValue: totals[day.format('DD/MM/YYYY')], render: (value, row, index) => <HourInput value={value} onChange={(e) => handleDataChange(index, day.format('DD/MM/YYYY'), e.target.value)} /> })),
    {
      title: 'Comment',
      key: 'comment',
      dataIndex: 'comment',
      width: 250, 
      footerValue: totals.total,
      render: (value, row, index) => <CommentInput value={value} onChange={(e) => handleDataChange(index, 'comment', e.target.value)} />,
    }
  ];

  return(
    <>
      <Header onDateChange={setDate} value={date} />
      <Table
        pagination={false}
        columns={columns}
        dataSource={tableData[activeDate] || [{}]}
        footer={() => <Footer columns={columns} />}
      />
    </>
  )
};

export default EntryTable;
