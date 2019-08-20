import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { format, getISOWeek } from 'date-fns';
import { connect } from 'react-redux';

import { getProjectActivities, getActiveProject } from 'selectors/projects';
import { get } from 'util/object';

import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { getColumns, getDateRange } from './helpers';

const mapStateToProps = state => ({
  activeProject: getActiveProject(state),
  activities: getProjectActivities(state, getActiveProject(state)),
})

const EntryTable = ({ getProjects, projects, activeProject, activities}) => {
  const [ allEntries, setAllEntries ] = useState({});
  const [ allComments, setAllComments ] = useState({});
  const [ allActivities, setAllActivites ] = useState({});
  const [ selectedDate, setDate ] = useState(new Date());
  const [ showModal, setShowModal ] = useState(false);

  const weekNumber = getISOWeek(selectedDate);

  const tableData = [];
  get([activeProject, weekNumber], allComments, []).forEach((comment, i) => {
    tableData[i] = tableData[i] ? { ...tableData[i], comment } : { comment };
  })
  get([activeProject, weekNumber], allActivities, []).forEach((activity, i) => {
    tableData[i] = tableData[i] ? { ...tableData[i], activity } : { activity };
  })
  getDateRange(selectedDate).forEach(day => {
    const formattedDate = format(day, 'YYYY-MM-DD');
    get([activeProject, formattedDate], allEntries, []).forEach((entry, i) => {
      tableData[i] = tableData[i] ? { ...tableData[i], [formattedDate]: entry } : { [formattedDate]: entry };
    })
  })

  const onChange = (key) => (value, record, index) => {
    if(key === 'activity') {
      const toUpdate = get([activeProject, weekNumber], allActivities, [])
      toUpdate[index] = value;
      return setAllActivites({
        ...allActivities,
        [activeProject]: {
          ...allActivities[activeProject],
          [weekNumber]: toUpdate,
        }
      }) 
    }
    if (key === 'comment') {
      const toUpdate = get([activeProject, weekNumber], allComments, [])
      toUpdate[index] = value;
      return setAllComments({
        ...allComments,
        [activeProject]: {
          ...allComments[activeProject],
          [weekNumber]: toUpdate,
        }
      }) 
    }

    const toUpdate = get([activeProject, key], allEntries, []);
    toUpdate[index] = value;
    return setAllEntries({
      ...allEntries,
      [activeProject]: {
        ...allEntries[activeProject],
        [key]: toUpdate,
      }
    })
  }
  
  const includeWeekends = false;

  return(
    <>
      <Header selectedDate={selectedDate} onDateChange={setDate} />
      <Table
        columns={getColumns(includeWeekends, selectedDate, onChange, activities)}
        dataSource={[...tableData, { }]}
        pagination={false}
        style={{ marginBottom: 15 }}
        footer={Footer}
        size='small'
      />
      <Button type='primary' onClick={() => setShowModal(true)}>Submit Entries</Button>
      <Modal 
        visible={showModal}
        entries={allEntries} 
        comments={allComments} 
        activities={allActivities} 
        setShowModal={setShowModal}
      />
    </>
  )
}

export default connect(mapStateToProps)(EntryTable);