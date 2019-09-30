import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

export const RecapSummaryButton = styled(({ hoursMet, ...rest }) => (
  <Button {...rest} />
))`
  && {
    color: ${({ hoursMet }) => (hoursMet ? '#23ce6b' : '#cc2936')};
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: ${({ hoursMet }) => (hoursMet ? '#23ce6b' : '#cc2936')};
      color: white;
    }

    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: ${({ hoursMet }) => (hoursMet ? '#23ce6b' : '#cc2936')};
      color: white;
    }
  }
`;
