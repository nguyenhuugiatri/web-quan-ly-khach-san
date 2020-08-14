import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm, InputNumber, Row } from 'antd';
import './style.scss';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
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

export default class TableService extends Component {
  render() {
    let { serviceList, serviceCharge } = this.props;
    if (serviceList)
      serviceList = serviceList.map((e, i) => ({ key: i + 1, ...e }));
    return (
      <div>
        <Table
          locale={{ emptyText: 'No services have been added' }}
          columns={columns}
          dataSource={serviceList}
          pagination={false}
          scroll={{ y: 250 }}
          footer={() => (
            <Row align='middle'>
              Total:
              <InputNumber
                className='serviceCharge'
                disabled
                value={serviceCharge || 0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Row>
          )}
        />
      </div>
    );
  }
}
