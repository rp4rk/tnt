import React from "react";
import { Typography, Divider } from "antd";
import { AuthenticationForm } from "../AuthenticationForm";

const { Title, Text } = Typography;

export const Authenticate = () => (
  <>
    <Title level={2}>Authenticate</Title>
    <Text>
      In order to work, we require your redmine address and API key.{" "}
      <strong>
        These details aren't stored anywhere else aside from your computer.
      </strong>
    </Text>
    <Divider />
    <AuthenticationForm />
  </>
);
