import React from 'react';
import { Modal } from 'antd';

import { getSummary } from '../helpers';

const submitEntries = (entries) => {
  entries.forEach((entry, i) => {
    fetch('http://localhost:3001/time_entries.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Redmine-Api-Key': '3150e4a3e90c5a7ca4225b45a3eccd217d7fb2c4'
      },
      body: JSON.stringify({
        time_entry: { ...entry }
      })
    })
  })
}

const SummaryModal = ({ entries, comments, activities, visible }) => {
  const [summary, components] = getSummary(entries, comments, activities);

  return (
    <Modal title="Entries Summary" okText='Submit' visible={visible} onOk={() => submitEntries(summary)}>
      {components}
    </Modal>
  );
};

export default SummaryModal;