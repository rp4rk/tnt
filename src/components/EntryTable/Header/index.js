import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { format, startOfISOWeek, endOfISOWeek } from 'date-fns'
import { DatePicker, Select } from 'antd';

import { fetchProjects, setActiveProject } from 'actions/projects';
import { getActiveProjects, getActiveProject } from 'selectors/projects';

const { Option } = Select;

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(fetchProjects()),
  setActiveProject: id => dispatch(setActiveProject(id)),
});

const mapStateToProps = state => ({
  projects: getActiveProjects(state),
  activeProject: getActiveProject(state)
})

const Header = ({ selectedDate, onDateChange, getProjects, projects, setActiveProject, activeProject }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const startOf = format(startOfISOWeek(selectedDate), 'Do MMMM YYYY');
  const endOf = format(endOfISOWeek(selectedDate), 'Do MMMM YYYY');

  return (
    <>
      <div>
        <DatePicker
          value={moment(selectedDate)}
          onChange={date => onDateChange(date)}
          style={{ marginBottom: 16, width: 'fit-content' }}
          allowClear={false}
        />
        <Select placeholder='Project' style={{ width: 150, marginLeft: 15 }} value={activeProject} onChange={setActiveProject}>
          {projects.map(({ id, name }) => <Option key={id} value={id}>{name}</Option>)}
        </Select>
        <Select placeholder='Issue' style={{ width: 150, marginLeft: 15 }}>
          <Option value='issue1'>Issue 1</Option>
          <Option value='issue2'>Issue 2</Option>
          <Option value='issue3'>Issue 3</Option>
        </Select>
      </div>
      <h3>{`${startOf} - ${endOf}`}</h3>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
