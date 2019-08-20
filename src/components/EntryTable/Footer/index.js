import React from 'react';

const Footer = tableData => {
  const totals = Object.values(tableData).reduce(
    (acc, row) => {
      const { activity, comment, ...hours } = row;
      Object.values(hours).forEach((hour, i) => {
        acc[i] += +hour;
        acc[5] += +hour;
        return acc;
      });
      return acc;
    },
    [0, 0, 0, 0, 0, 0]
  );

  return (
    <div className="ant-table ant-table-small" style={{ border: 0 }}>
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table>
            <thead className="ant-table-thead">
              <tr>
                <th style={{ width: 200 }} />
                {totals.map(
                  (value, i) =>
                    i !== 5 && (
                      <th key={`${value}-${i}`} style={{ paddingLeft: 20 }}>
                        {value}
                      </th>
                    )
                )}
                <th style={{ width: 250 }}>Total: {totals[5]}</th>
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
