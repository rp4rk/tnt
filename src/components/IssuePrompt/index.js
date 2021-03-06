import React, { useMemo, useState } from 'react';
import { Select, Icon } from 'antd';
import { connect } from 'react-redux';

import { getRedmineAddress, getRedmineKey } from 'selectors/redmine';
import { setIssuesForProject } from 'actions/projects';
import { getIssuesEndpoint } from 'constants/endpoints';
import { useFetch } from 'hooks/fetch';
import { get } from 'util/object';
import { debounce } from 'util/fn';

const mapStateToProps = state => ({
  host: getRedmineAddress(state),
  redmineKey: getRedmineKey(state)
});

const mapDispatchToProps = dispatch => ({
  setIssuesForProject: (projectId, issues) =>
    dispatch(setIssuesForProject(projectId, issues))
});

const ISSUE_FETCH_PARAMS = (key, issueSubject) => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Redmine-Api-Key': key
  }
});

const IssuePrompt = ({
  projectId,
  host,
  redmineKey,
  onChange,
  initialValue,
  autoFocus,
  tourLabel,
  style = { width: '100%' },
  activeIssue,
  setIssuesForProject,
  allowClear = false
}) => {
  const [issueSubject, setIssueSubject] = useState(null);
  const [initiallyLoaded, setInitialLoad] = useState(false);
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

  // Set initially loaded
  if (issues) {
    !initiallyLoaded && setInitialLoad(true);
  }

  // Get the initial issue
  const initialIssue = issues && issues.find(({ id }) => +id === +initialValue);

  return (
    (initiallyLoaded && (
      <Select
        data-tour={tourLabel}
        autoFocus={autoFocus}
        showSearch
        allowClear={allowClear}
        filterOption={false}
        style={style}
        placeholder="Find an issue..."
        defaultActiveFirstOption={false}
        defaultValue={initialIssue && initialIssue.subject}
        onSearch={debounce(value => setIssueSubject(value), 350)}
        onChange={onChange}
        value={activeIssue}
      >
        {issues &&
          issues.map(issue => (
            <Select.Option key={issue.id} value={issue.id}>
              {issue.subject}
            </Select.Option>
          ))}
      </Select>
    )) || <Icon type="loading" />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuePrompt);
