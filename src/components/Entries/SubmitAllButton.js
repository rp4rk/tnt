import React, { useState } from 'react';
import { Button, Icon, Modal, Alert } from 'antd';
import { connect } from 'react-redux';

import { createAllPendingEntries } from 'actions/entryposts';
import { validEntries, getEntriesForProject } from 'selectors/entries';
import { get } from 'util/object';

const mapStateToProps = (state, { projectId }) => ({
  validEntries: validEntries(state),
  entries: getEntriesForProject(state, projectId)
});

const mapDispatchToProps = dispatch => ({
  submitAllEntries: activeProjectId =>
    dispatch(createAllPendingEntries(activeProjectId))
});

const SubmitAllButton = ({
  projectId,
  submitAllEntries,
  validEntries,
  entries
}) => {
  const [showPrompt, togglePrompt] = useState(false);
  const validEntryCount = get(['length'], validEntries) || 0;
  const entryCount = get(['length'], entries) || 0;

  return (
    <>
      <Modal
        title="Submit All Entries?"
        visible={showPrompt}
        onOk={() => submitAllEntries(projectId)}
        onCancel={() => togglePrompt(false)}
      >
        <p>
          Going ahead with this will submit <strong>all</strong> of your
          completed entries so far, continue?
        </p>

        {validEntryCount < entryCount && (
          <Alert
            type="warning"
            message="Some of your entries are incomplete, they will be ignored!"
          />
        )}
      </Modal>
      <Button
        disabled={validEntryCount === 0}
        style={{ marginRight: 12 }}
        data-tour="new-entry-button"
        onClick={() => togglePrompt(true)}
      >
        <Icon type="file-protect" />
        Submit Entries
      </Button>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitAllButton);
