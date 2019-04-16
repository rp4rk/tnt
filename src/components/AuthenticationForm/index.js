import React from "react";
import { Form, Input, Button } from "antd";

export const AuthenticationForm = () => {
  return (
    <Form>
      <Form.Item label="Redmine Address">
        <Input placeholder="Redmine Address" />
      </Form.Item>
      <Form.Item label="API Key">
        <Input placeholder="API Key" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};
