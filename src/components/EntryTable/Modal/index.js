import React from 'react';
import { Modal } from 'antd';

import { store } from '../../../store';
import { getSummary } from '../helpers';
import { getTimeEntryEndpoint } from 'constants/endpoints';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';

const submitEntries = entries => {
  const state = store.getState();
  const host = getRedmineAddress(state);
  const key = getRedmineKey(state);

  entries.forEach((entry, i) => {
    setTimeout(
      () =>
        fetch(getTimeEntryEndpoint(host), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Redmine-Api-Key': key
          },
          body: JSON.stringify({
            time_entry: { ...entry }
          })
        }),
      500 * i
    );
  });
};

const SummaryModal = ({
  entries,
  comments,
  activities,
  visible,
  setShowModal
}) => {
  const [summary, components] = getSummary(entries, comments, activities);

  return (
    <Modal
      title="Entries Summary"
      okText="Submit"
      visible={visible}
      onOk={() => submitEntries(summary)}
      onCancel={() => setShowModal(false)}
    >
      {components}
    </Modal>
  );
};

export default SummaryModal;
