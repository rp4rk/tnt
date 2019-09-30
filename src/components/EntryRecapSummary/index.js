import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';
import { getActiveProject } from 'selectors/projects';
import { getProjectIssues } from 'constants/endpoints';
import { RecapSummaryButton } from './styled';

// Sums hours on time_entries array
const sumHours = (acc, curr) => acc + curr.hours;

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

  /**
   * Fetch entry data for the day being recapped
   */
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
        setEntries(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setEntries(null);
      });
  }, [date, redmineKey, redmineAddress, currentProject]);

  /**
   * Calculate hours logged for the day being recapped
   */
  const hours = ((entries && entries.time_entries) || []).reduce(sumHours, 0);

  return (
    <RecapSummaryButton
      hoursMet={hours >= 2}
      onClick={() => console.log(entries)}
      icon={
        (loading && 'loading') || hours >= 2
          ? 'check-circle'
          : 'exclamation-circle'
      }
    >
      {format(date, 'yyyy-MM-dd')}
    </RecapSummaryButton>
  );
}

export default connect(mapStateToProps)(EntryRecapSummary);
