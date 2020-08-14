import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm, InputNumber, Row } from 'antd';
import './style.scss';

export default class TableService extends Component {
  render() {
    let { serviceList, serviceCharge, handleDeleteService } = this.props;

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
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) =>
          serviceList.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDeleteService(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

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
              Service Charge:
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
