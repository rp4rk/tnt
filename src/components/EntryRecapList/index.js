import React, { useState, useReducer } from 'react';
import {
  setDate,
  startOfMonth,
  endOfMonth,
  subMonths,
  eachDayOfInterval,
  getDate,
  isWeekend
} from 'date-fns';
import { addMonths } from 'date-fns/esm';
import EntryRecapSummary from 'components/EntryRecapSummary';
import { Button } from 'antd';
import { RecapContainer, RecapButtonContainer } from './styled';

const MID_MONTH = 15;
const initialState = {
  date: new Date(),
  day: getDate(new Date()),
  half: getDate(new Date()) <= MID_MONTH ? 0 : 1
};

const reducer = (state, action) => {
  const ops = {
    GO_BACK: state => {
      const { half, date } = state;

      return {
        ...state,
        half: half === 1 ? 0 : 1,
        date: half === 0 ? subMonths(date, 1) : date
      };
    },
    GO_FORWARD: state => {
      const { half, date } = state;

      return {
        ...state,
        half: half === 1 ? 0 : 1,
        date: half === 1 ? addMonths(date, 1) : date
      };
    }
  };

  if (!ops[action.type])
    throw new Error(`Action of type ${action.type} not defined!`);

  return ops[action.type](state, action);
};

function EntryRecapList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dates = [
    eachDayOfInterval({
      start: startOfMonth(state.date),
      end: setDate(state.date, MID_MONTH)
    }).filter(d => !isWeekend(d)),
    eachDayOfInterval({
      start: setDate(state.date, MID_MONTH + 1),
      end: endOfMonth(state.date)
    }).filter(d => !isWeekend(d))
  ];

  return (
    <RecapContainer>
      <Button
        shape="circle"
        icon="left"
        type="primary"
        size="small"
        onClick={() => dispatch({ type: 'GO_BACK' })}
      />
      <RecapButtonContainer>
        {dates[state.half].map(date => (
          <EntryRecapSummary key={date} date={date} />
        ))}
      </RecapButtonContainer>
      <Button
        shape="circle"
        icon="right"
        type="primary"
        size="small"
        onClick={() => dispatch({ type: 'GO_FORWARD' })}
      />
    </RecapContainer>
  );
}

export default EntryRecapList;
