import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm } from 'antd';

const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: 'Unit price',
    dataIndex: 'price',
  },
  {
    title: 'action',
    dataIndex: 'action',
    render: (text, record) => (
      // this.state.dataSource.length >= 1 ? (
      <Popconfirm
        title='Sure to delete?'
        onConfirm={() => this.handleDelete(record.key)}
      >
        <a>Delete</a>
      </Popconfirm>
    ),
    // ) : null,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    no: i + 1,
    name: `Snack ${i + 1}`,
    amount: i + 2,
    price: 200,
  });
}

export default class TableService extends Component {
  render() {
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 300 }}
        />
      </div>
    );
  }
}
