import React, { Component } from 'react';
import {
  Input,
  Space,
  Button,
  Select,
  Form,
  Popconfirm,
  Tag,
  Table,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default class TableUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      searchedColumn: '',
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      let inputNode = (
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      );
      return (
        <div style={{ padding: 8 }}>
          {inputNode}
          <Space>
            <Button
              type="primary"
              onClick={() =>
                this.handleSearch(selectedKeys, confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  handleEdit = (record) => {
    return this.props.handleEdit(record);
  };
  handleResetPassword = (record) => {
    return this.props.handleResetPassword(record);
  };
  handleDelete = (record) => {
    return this.props.handleDelete(record);
  };
  handleSave = (record) => {
    return this.props.handleSave(record);
  };
  isEditing = (record) => {
    return record.key === this.props.isediting;
  };
  EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    inputType,
    record,
    editing,
    ...restProps
  }) => {
    let inputNode = <Input/>;
    if (inputType === 1) {
      inputNode = (
        <Button
          type="primary"
          loading={this.props.loading}
          onClick={this.handleResetPassword(record)}
          disabled={this.props.disable}
        >
          Reset password
        </Button>
      );
    } else if (inputType === 2) {
      inputNode = (
        <Select defaultValue={record.permission}>
          <Select.Option value="Manager">Manager</Select.Option>
          <Select.Option value="Reception">Receptionist</Select.Option>
        </Select>
      );
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  render() {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '35%',
        editable: true,
        ...this.getColumnSearchProps('username'),
      },
      {
        title: 'Password',
        dataIndex: 'password',
        editable: true,
        key: 'password',
        width: '30%',
      },
      {
        title: 'Permission',
        editable: true,
        dataIndex: 'permission',
        key: 'permission',
        width: '30%',
        className: 'tag',
        render: (permission) => {
          let color = '#096DD9';
          if (permission === 'Receptionist') {
            color = '#CF1322';
          }
          return <Tag color={color}>#{permission}</Tag>;
        },
        filters: [
          { text: 'Receptionist', value: 'Receptionist' },
          { text: 'Manager', value: 'Manager' },
        ],
        onFilter: (value, record) => record.permission.indexOf(value) === 0,
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: '5%',
        render: (_, record) => {
          if (!this.isEditing(record)) {
            return (
              <Space size="middle">
                <EditOutlined
                  style={{ color: '#096DD9' }}
                  onClick={this.handleEdit(record)}
                  className="control-icon"
                  placement="topLeft"
                />
                <Popconfirm
                  title="Are you sure ?"
                  onConfirm={this.handleDelete(record)}
                >
                  <DeleteOutlined
                    style={{ color: '#CF1322' }}
                    className="control-icon"
                  />
                </Popconfirm>
              </Space>
            );
          } else {
            return (
              <Space size="middle">
                <Popconfirm
                  title="Are you sure save this?"
                  onConfirm={this.handleSave(record)}
                >
                  <SaveOutlined
                    style={{ color: '#096DD9' }}
                    className="control-icon"
                  />
                </Popconfirm>

                <CloseCircleOutlined
                  style={{ color: '#CF1322' }}
                  onClick={this.props.cancelEdit}
                  className="control-icon"
                />
              </Space>
            );
          }
        },
      },
    ];
    const mergeColumn = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          inputType:
            col.dataIndex === 'username'
              ? 0
              : col.dataIndex === 'password'
              ? 1
              : 2,
          record,
          width: col.width,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <Form ref={this.props.formUser} component={false}>
        <Table
          components={{
            body: {
              cell: this.EditableCell,
            },
          }}
          columns={mergeColumn}
          dataSource={this.props.listUser}
          pagination={{
            pageSize: 9,
            current: this.props.currentPage,
            style: { display: 'none' },
          }}
          bordered
        ></Table>
      </Form>
    );
  }
}
