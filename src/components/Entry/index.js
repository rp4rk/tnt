import React from "react";
import { Card } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  padding-bottom: 5px;
`;

const Entry = ({ day }) => {
  return (
    <StyledCard size="small" title="yeet">
      Yeet
    </StyledCard>
  );
};

export default Entry;
