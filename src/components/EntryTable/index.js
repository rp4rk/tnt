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
  const [issue, setIssue] = useState();

  const weekNumber = getISOWeek(selectedDate);
  const issueKey = issue || 'no-issue';

  const tableData = [];
  get([activeProject, issueKey, weekNumber], allComments, []).forEach(
    (comment, i) => {
      tableData[i] = tableData[i] ? { ...tableData[i], comment } : { comment };
    }
  );
  get([activeProject, issueKey, weekNumber], allActivities, []).forEach(
    (activity, i) => {
      tableData[i] = tableData[i]
        ? { ...tableData[i], activity }
        : { activity };
    }
  );
  getDateRange(selectedDate).forEach(day => {
    const formattedDate = format(day, 'YYYY-MM-DD');
    get([activeProject, issueKey, formattedDate], allEntries, []).forEach(
      (entry, i) => {
        tableData[i] = tableData[i]
          ? { ...tableData[i], [formattedDate]: entry }
          : { [formattedDate]: entry };
      }
    );
  });

  const onChange = key => (value, record, index) => {
    if (key === 'activity') {
      const toUpdate = get(
        [activeProject, issueKey, weekNumber],
        allActivities,
        []
      );
      toUpdate[index] = value;
      return setAllActivites({
        ...allActivities,
        [activeProject]: {
          ...allActivities[activeProject],
          [issueKey]: {
            ...get([activeProject, issueKey], allActivities, {}),
            [weekNumber]: toUpdate
          }
        }
      });
    }
    if (key === 'comment') {
      const toUpdate = get(
        [activeProject, issueKey, weekNumber],
        allComments,
        []
      );
      toUpdate[index] = value;
      return setAllComments({
        ...allComments,
        [activeProject]: {
          ...allComments[activeProject],
          [issueKey]: {
            ...get([activeProject, issueKey], allComments, {}),
            [weekNumber]: toUpdate
          }
        }
      });
    }

    const toUpdate = get([activeProject, issueKey, key], allEntries, []);
    toUpdate[index] = value;
    return setAllEntries({
      ...allEntries,
      [activeProject]: {
        ...allEntries[activeProject],
        [issueKey]: {
          ...get([activeProject, issueKey], allEntries, {}),
          [key]: toUpdate
        }
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
        setIssue={setIssue}
        activeIssue={issue}
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
        footer={Footer(selectedDate)}
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
