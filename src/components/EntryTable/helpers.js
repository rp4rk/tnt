import React from 'react';
import { Input, Select } from 'antd';

import {
  startOfISOWeek,
  endOfISOWeek,
  eachDay,
  format,
  getISOWeek,
  parse
} from 'date-fns';
import { get } from 'util/object';

export const getDateRange = selectedDate => {
  const start = startOfISOWeek(selectedDate);
  const end = endOfISOWeek(selectedDate);
  return eachDay(start, end);
};

const getDayColumns = (includeWeekends, selectedDate, onChange) => {
  let range = getDateRange(selectedDate);
  !includeWeekends && range.splice(-2, 2);

  return range.map(day => {
    const formattedDate = format(day, 'YYYY-MM-DD');

    return {
      title: format(day, 'ddd'),
      dataIndex: formattedDate,
      render: (value, record, index) => (
        <Input
          placeholder="0"
          value={value}
          onChange={e => onChange(formattedDate)(e.target.value, record, index)}
        />
      )
    };
  });
};

export const getColumns = (
  includeWeekends,
  selectedDate,
  onChange,
  activities
) => {
  return [
    {
      title: 'Activity',
      dataIndex: 'activity',
      width: 200,
      render: (value, record, index) => (
        <Select
          placeholder="Activity"
          value={value}
          onChange={activity => onChange('activity')(activity, record, index)}
          style={{ width: '100%' }}
        >
          {activities.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      )
    },
    ...getDayColumns(includeWeekends, selectedDate, onChange),
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 250,
      render: (value, record, index) => (
        <Input
          placeholder="Comment"
          value={value}
          onChange={e => onChange('comment')(e.target.value, record, index)}
        />
      )
    }
  ];
};

export const getSummary = (
  entries,
  comments,
  activities,
  projectActivities,
  activeProjects,
  allIssues
) => {
  let summary = [];
  let components = [];
  Object.entries(entries).forEach(([project, issue]) => {
    components.push(
      <h3 style={{ marginTop: 20 }}>
        {activeProjects.find(p => p.id === +project).name}
      </h3>
    );
    Object.entries(issue).forEach(([issueId, entry]) => {
      components.push(<h3 style={{ marginTop: 20 }}>Issue ID {issueId}</h3>);
      summary = [
        ...summary,
        ...Object.entries(entry).reduce((acc, [date, hours]) => {
          const entries = [];
          const week = getISOWeek(parse(date));
          const weekComments = get([project, issueId, week], comments, []);
          const weekActivities = get([project, issueId, week], activities, []);

          components.push(
            <div style={{ fontWeight: 'bold', marginTop: 10 }}>
              {format(date, 'Do MMMM')}
            </div>
          );

          hours.forEach((hour, i) => {
            const activity = projectActivities.find(
              pa => pa.id === weekActivities[i]
            );
            const activityName = activity ? activity.name : '';
            components.push(
              <div>{`${activityName} - ${hour} hours - ${
                weekComments[i]
              }`}</div>
            );

            let entryToSubmit = {
              spent_on: date,
              hours: hour,
              comments: weekComments[i],
              activity_id: weekActivities[i],
              project_id: project
            };

            if (issueId !== 'no-issue') {
              entryToSubmit = {
                ...entryToSubmit,
                issue_id: issueId
              };
            }

            entries.push(entryToSubmit);
          });

          return [...acc, ...entries];
        }, [])
      ];
    });
  });

  return [summary, components];
};
