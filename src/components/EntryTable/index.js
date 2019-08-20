import React, { useState } from 'react';
import { Alert, Button, Table } from 'antd';
import { format, getISOWeek } from 'date-fns';
import { connect } from 'react-redux';

import {
  getProjectActivities,
  getActiveProject,
  getActiveProjects
} from 'selectors/projects';
import { get } from 'util/object';

import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { getColumns, getDateRange } from './helpers';

const mapStateToProps = state => ({
  activeProject: getActiveProject(state),
  activeProjects: getActiveProjects(state),
  projectActivities: getProjectActivities(state, getActiveProject(state))
});

const EntryTable = ({
  getProjects,
  projects,
  activeProject,
  activeProjects,
  projectActivities
}) => {
  const [allEntries, setAllEntries] = useState({});
  const [allComments, setAllComments] = useState({});
  const [allActivities, setAllActivites] = useState({});
  const [selectedDate, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const weekNumber = getISOWeek(selectedDate);

  const tableData = [];
  get([activeProject, weekNumber], allComments, []).forEach((comment, i) => {
    tableData[i] = tableData[i] ? { ...tableData[i], comment } : { comment };
  });
  get([activeProject, weekNumber], allActivities, []).forEach((activity, i) => {
    tableData[i] = tableData[i] ? { ...tableData[i], activity } : { activity };
  });
  getDateRange(selectedDate).forEach(day => {
    const formattedDate = format(day, 'YYYY-MM-DD');
    get([activeProject, formattedDate], allEntries, []).forEach((entry, i) => {
      tableData[i] = tableData[i]
        ? { ...tableData[i], [formattedDate]: entry }
        : { [formattedDate]: entry };
    });
  });

  const onChange = key => (value, record, index) => {
    if (key === 'activity') {
      const toUpdate = get([activeProject, weekNumber], allActivities, []);
      toUpdate[index] = value;
      return setAllActivites({
        ...allActivities,
        [activeProject]: {
          ...allActivities[activeProject],
          [weekNumber]: toUpdate
        }
      });
    }
    if (key === 'comment') {
      const toUpdate = get([activeProject, weekNumber], allComments, []);
      toUpdate[index] = value;
      return setAllComments({
        ...allComments,
        [activeProject]: {
          ...allComments[activeProject],
          [weekNumber]: toUpdate
        }
      });
    }

    const toUpdate = get([activeProject, key], allEntries, []);
    toUpdate[index] = value;
    return setAllEntries({
      ...allEntries,
      [activeProject]: {
        ...allEntries[activeProject],
        [key]: toUpdate
      }
    });
  };

  const clearAllEntries = () => {
    setAllEntries({});
    setAllComments({});
    setAllActivites({});
    setShowModal(false);
  };

  const includeWeekends = false;

  return (
    <>
      <Alert
        style={{ marginBottom: 15 }}
        type="warning"
        message="This feature is experimental, use with caution"
      />
      <Header
        selectedDate={selectedDate}
        onDateChange={setDate}
        activeProjects={activeProjects}
      />
      <Table
        columns={getColumns(
          includeWeekends,
          selectedDate,
          onChange,
          projectActivities
        )}
        dataSource={[...tableData, {}]}
        pagination={false}
        style={{ marginBottom: 15 }}
        footer={Footer}
        size="small"
      />
      <Button type="primary" onClick={() => setShowModal(true)}>
        Submit Entries
      </Button>
      <Modal
        visible={showModal}
        entries={allEntries}
        comments={allComments}
        activities={allActivities}
        projectActivities={projectActivities}
        activeProjects={activeProjects}
        setShowModal={setShowModal}
        onEntriesSubmitted={clearAllEntries}
      />
    </>
  );
};

export default connect(mapStateToProps)(EntryTable);
