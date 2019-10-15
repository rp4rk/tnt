import React from 'react';
import { format } from 'date-fns';
import { getDateRange } from '../helpers';

const Footer = selectedDate => tableData => {
  const dates = getDateRange(selectedDate).map(date =>
    format(date, 'YYYY-MM-DD')
  );
  dates.splice(-2, 2);

  const totals = Object.values(tableData).reduce((acc, row) => {
    const { activity, comment, ...hours } = row;
    Object.entries(hours).forEach(([day, hour], i) => {
      acc[day] = acc[day] ? acc[day] + +hour : +hour;
      acc.total = acc.total ? acc.total + +hour : +hour;
      return acc;
    });
    return acc;
  }, {});

  return (
    <div className="ant-table ant-table-small" style={{ border: 0 }}>
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th style={{ width: 200 }} />
                {dates.map((date, i) => {
                  const value = totals[date] ? totals[date] : 0;
                  return (
                    <th key={`${value}-${i}`} style={{ paddingLeft: 20 }}>
                      {value}
                    </th>
                  );
                })}
                <th style={{ width: 250 }}>Total: {totals.total || 0}</th>
              </tr>
            </thead>
          </table>
          <style>{`.ant-table-footer{padding: 0px;}`}</style>
        </div>
      </div>
    </div>
  );
};

export default Footer;
