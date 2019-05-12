import React, { useMemo, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';

import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';
import { getIssuesEndpoint } from 'constants/endpoints';
import { useFetch } from 'hooks/fetch';
import { get } from 'util/object';
import { debounce } from 'util/fn';

const mapStateToProps = state => ({
  host: getRedmineAddress(state),
  redmineKey: getRedmineKey(state)
});

const ISSUE_FETCH_PARAMS = (key, issueSubject) => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Redmine-Api-Key': key
  }
});

const IssuePrompt = ({ projectId, host, redmineKey }) => {
  const [issueSubject, setIssueSubject] = useState(null);
  const [url, setUrl] = useState(null);
  const [params, setParams] = useState(null);

  // Memoisation is used here to ensure that "params" is stable
  useMemo(() => {
    setParams(ISSUE_FETCH_PARAMS(redmineKey));
  }, [redmineKey]);

  useMemo(() => {
    setUrl(
      getIssuesEndpoint(host, {
        project_id: projectId,
        ...(issueSubject && { subject: `~${issueSubject}` })
      })
    );
  }, [projectId, issueSubject, host]);

  // Fetch our data
  const { data } = useFetch(url, params);

  // Get issues safely
  const issues = get(['issues'], data);

  console.log(issues);

  return (
    <>
      <Select
        autoFocus
        showSearch
        placeholder="Find an issue..."
        style={{ width: '100%' }}
        onSearch={debounce(value => setIssueSubject(value), 350)}
        filterOption={false}
        defaultActiveFirstOption={false}
      >
        {issues &&
          issues.map(issue => (
            <Select.Option key={issue.id} value={issue.id}>
              {issue.subject}
            </Select.Option>
          ))}
      </Select>
    </>
  );
};

export default connect(mapStateToProps)(IssuePrompt);
