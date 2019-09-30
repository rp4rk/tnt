import styled from 'styled-components';

export const RecapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecapButtonContainer = styled.div`
  margin: 0 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  flex-grow: 1;
  justify-content: space-between;

  & > button {
    margin: 6px;
  }
`;
