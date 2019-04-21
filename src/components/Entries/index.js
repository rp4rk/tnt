import React from "react";
import { Typography, Divider, Icon } from "antd";
import TimeEntry from "../TimeEntry";

const { Title, Text } = Typography;

export const Entries = () => (
  <>
    <Title level={2}>
      <Icon type="clock-circle" /> - Time Entries
    </Title>
    <Text>
      Draft your time entries here, don't worry about making mistakes they won't
      save until you say so!
    </Text>
    <Divider />
    <TimeEntry />
  </>
);
