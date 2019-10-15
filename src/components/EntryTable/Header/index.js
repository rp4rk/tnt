import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { format, startOfISOWeek, endOfISOWeek } from 'date-fns';
import { DatePicker, Select } from 'antd';

import { fetchProjects, setActiveProject } from 'actions/projects';
import { getActiveProject } from 'selectors/projects';
import IssuePrompt from 'components/IssuePrompt';

const { Option } = Select;

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(fetchProjects()),
  setActiveProject: id => dispatch(setActiveProject(id))
});

const mapStateToProps = state => ({
  activeProject: getActiveProject(state)
});

const Header = ({
  selectedDate,
  onDateChange,
  getProjects,
  activeProjects,
  setActiveProject,
  setIssue,
  activeProject,
  activeIssue
}) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onChangeProject = id => {
    setActiveProject(id);
    setIssue();
  };

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
        <Select
          placeholder="Project"
          style={{ width: 150, marginLeft: 15 }}
          value={activeProject}
          onChange={onChangeProject}
        >
          {activeProjects.map(({ id, name }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
        </Select>
        <IssuePrompt
          style={{ width: 250, marginLeft: 15 }}
          projectId={activeProject}
          onChange={setIssue}
          activeIssue={activeIssue}
          allowClear
          initialValue={activeProject}
        />
      </div>
      <h3>{`${startOf} - ${endOf}`}</h3>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
