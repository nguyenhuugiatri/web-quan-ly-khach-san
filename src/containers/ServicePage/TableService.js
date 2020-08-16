import React, { Component } from 'react';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import { connect } from 'react-redux';

class TableService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { listService } = this.props;

    const columns = [
      {
        title: 'No.',
        dataIndex: 'key',
        key: 'no',
        width: '15%',
        // ...this.getColumnSearchProps('no'),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        // ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Type',
        dataIndex: 'typeName',
        key: 'typeName',
        width: '20%',
        // ...this.getColumnSearchProps('typeName'),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '20%',
        // ...this.getColumnSearchProps('price'),
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width: '15%',
        render: (text, record) =>
          listService.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              // onConfirm={() => handleDeleteService(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    listService = listService
      .sort((a, b) => b.id - a.id)
      .map((e, i) => ({ ...e, key: i + 1 }));
    return (
      <div>
        <Table columns={columns} dataSource={listService} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ listService: state.service.listService });

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TableService);
