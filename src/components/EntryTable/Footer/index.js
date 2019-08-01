import React from 'react';

const getValue = column => {
  return column.footerValue ? column.footerValue : '-';
};

const Footer = ({ columns = [] }) => {
  return (
    <div className="ant-table ant-table-small" style={{ border: 0 }}>
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table>
            <thead className="ant-table-thead">
              <tr>
                {columns.map((column, i) => (
                  <th
                    key={column.dataIndex}
                    style={{
                      border: 0,
                      boxSizing:
                        i === columns.length - 1 ? 'border-box' : 'content-box',
                      width: column.width
                    }}
                  >
                    {getValue(column)}
                  </th>
                ))}
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
