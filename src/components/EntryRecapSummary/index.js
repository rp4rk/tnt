import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Button, Badge } from 'antd';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';
import { getActiveProject } from 'selectors/projects';
import { getProjectIssues } from 'constants/endpoints';

const mapStateToProps = state => ({
  redmineKey: getRedmineKey(state),
  redmineAddress: getRedmineAddress(state),
  currentProject: getActiveProject(state)
});

function EntryRecapSummary({
  date,
  redmineKey,
  redmineAddress,
  currentProject
}) {
  const [entries, setEntries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      getProjectIssues(redmineAddress, {
        projectId: currentProject,
        spent_on: format(date, 'yyyy-MM-dd')
      }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Redmine-Api-Key': redmineKey
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        setEntries(data.time_entry);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setEntries(null);
      });
  }, [date, redmineKey, redmineAddress, currentProject]);

  return (
    <Badge count="3">
      <Button onClick={() => console.log(entries)} icon={loading && 'loading'}>
        {format(date, 'yyyy-MM-dd')}
      </Button>
    </Badge>
  );
}

export default connect(mapStateToProps)(EntryRecapSummary);
