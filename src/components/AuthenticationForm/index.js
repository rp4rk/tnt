import React from 'react';
import { Form, Input, Button, Icon, Tooltip } from 'antd';
import { connect } from 'react-redux';

import { getRedmineKey, getRedmineAddress } from 'selectors/redmine';
import { useInputWithValidation } from 'util/useInput';
import { isValidApiKey, isSecureUrl } from 'util/redmine';
import { setRedmineAddress, setRedmineKey } from 'actions/redmine';

const mapStateToProps = state => ({
  storedKey: getRedmineKey(state),
  storedAddress: getRedmineAddress(state)
});

const mapDispatchToProps = dispatch => ({
  updateRedmineAddress: address => dispatch(setRedmineAddress(address)),
  updateRedmineKey: key => dispatch(setRedmineKey(key))
});

function UnconnectedAuthenticationForm({
  storedKey,
  storedAddress,
  updateRedmineAddress,
  updateRedmineKey
}) {
  const [
    redmineApiKey,
    setRedmineApiKey,
    apiKeyValid,
    apiPristine
  ] = useInputWithValidation(isValidApiKey, storedKey);
  const [
    redmineAddress,
    setRedmineAddress,
    addressValid,
    addressPristine
  ] = useInputWithValidation(isSecureUrl, storedAddress);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        updateRedmineAddress(redmineAddress);
        updateRedmineKey(redmineApiKey);
      }}
    >
      <Form.Item
        label="Redmine Address"
        validateStatus={addressValid || addressPristine ? null : 'error'}
        help={addressValid || addressPristine ? null : 'HTTPS only'}
      >
        <Input
          prefix={<Icon type="global" />}
          id="warning"
          placeholder="Redmine Address"
          defaultValue={redmineAddress}
          onChange={setRedmineAddress}
        />
      </Form.Item>
      <Form.Item
        label="API Key"
        validateStatus={apiKeyValid || apiPristine ? null : 'error'}
        help={
          apiKeyValid || apiPristine
            ? null
            : "This doesn't look like a valid Redmine API key."
        }
      >
        <Input
          prefix={<Icon type="key" />}
          placeholder="API Key"
          defaultValue={redmineApiKey}
          onChange={setRedmineApiKey}
        />
      </Form.Item>
      <Tooltip
        visible={!apiKeyValid || !addressValid}
        title="Enter a valid address and API key!"
        placement="right"
        trigger="hover"
      >
        <Button
          disabled={!apiKeyValid || !addressValid}
          type="primary"
          htmlType="submit"
          onSubmit={() => {
            updateRedmineAddress(redmineAddress);
            updateRedmineKey(redmineApiKey);
          }}
        >
          Save
        </Button>
      </Tooltip>
    </Form>
  );
}

export const AuthenticationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAuthenticationForm);
