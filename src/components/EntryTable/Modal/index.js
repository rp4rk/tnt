import React, { useState } from 'react';
import { Modal, Spin } from 'antd';

import { store } from '../../../store';
import { getSummary } from '../helpers';
import { getTimeEntryEndpoint } from 'constants/endpoints';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';

const Spinner = () => (
  <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <Spin size="large" />
  </div>
);

const submitEntries = async entries => {
  const state = store.getState();
  const host = getRedmineAddress(state);
  const key = getRedmineKey(state);

  for (const entry of entries) {
    await fetch(getTimeEntryEndpoint(host), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Redmine-Api-Key': key
      },
      body: JSON.stringify({
        time_entry: { ...entry }
      })
    });
  }
  return true;
};

const SummaryModal = ({
  entries,
  comments,
  activities,
  visible,
  setShowModal,
  onEntriesSubmitted,
  projectActivities,
  activeProjects
}) => {
  const [loading, setLoading] = useState(false);
  const [summary, components] = getSummary(
    entries,
    comments,
    activities,
    projectActivities,
    activeProjects
  );

  const handleOk = async () => {
    setLoading(true);
    await submitEntries(summary);
    setLoading(false);
    onEntriesSubmitted();
  };

  return (
    <Modal
      title="Entries Summary"
      okText="Submit"
      visible={visible}
      onOk={handleOk}
      onCancel={() => setShowModal(false)}
      okButtonProps={{ disabled: loading }}
      cancelButtonProps={{ disabled: loading }}
      closable={false}
    >
      {loading ? <Spinner /> : components}
    </Modal>
  );
};

export default SummaryModal;
