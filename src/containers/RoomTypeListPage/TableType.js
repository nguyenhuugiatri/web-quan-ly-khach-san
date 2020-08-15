import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Input, Space, Button, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  EditOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  fetchRoomTypeAPI,
  updateEditing,
  updateRoomTypeAPI,
  updateTotal,
} from './actions';
class TableType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formTypeRoom: React.createRef(),
      searchText: '',
      searchedColumn: '',
    };
  }
  componentDidMount() {
    this.props.fetchRoomType();
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
          onChange={(e) => {
            return setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
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
    let inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
            rules={[{ required: true, message: `Please input ${title}` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  isEditing = (record) => {
    return record.key === this.props.isediting;
  };
  configColumnTable = () => {
    let columns = [
      {
        title: 'Type name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        width: '23%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        editable: true,
        width: '23%',
        ...this.getColumnSearchProps('price'),
      },
      {
        title: 'Max customer',
        dataIndex: 'maxCustomer',
        key: 'maxCustomer',
        editable: true,
        width: '23%',
        ...this.getColumnSearchProps('maxCustomer'),
      },
      {
        title: 'Price hour',
        dataIndex: 'priceHour',
        key: 'priceHour',
        editable: true,
        width: '23%',
        ...this.getColumnSearchProps('priceHour'),
      },
      {
        title: 'Action',
        width: '8%',
        align: 'center',
        render: (_, record) => {
          const isEditing = this.isEditing(record);
          return (
            <div>
              {!isEditing ? (
                <Space>
                  <EditOutlined
                    className="control-icon blue"
                    onClick={() => {
                      this.props.updateEditing(record.key);
                      if (this.state.formTypeRoom.current !== null) {
                        this.state.formTypeRoom.current.setFieldsValue({
                          ...record,
                        });
                      }
                    }}
                  />
                </Space>
              ) : (
                <Space>
                  <Popconfirm
                    title="Save this record?"
                    onConfirm={() => {
                      this.state.formTypeRoom.current.submit();
                    }}
                  >
                    <SaveOutlined className="control-icon blue" />
                  </Popconfirm>
                  <CloseCircleOutlined
                    className="control-icon red"
                    onClick={() => {
                      this.props.updateEditing();
                    }}
                  />
                </Space>
              )}
            </div>
          );
        },
      },
    ];
    const mergeColumn = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => {
          return {
            inputType:
              col.dataIndex === 'name'
                ? 0
                : col.dataIndex === 'typeName'
                ? 1
                : col.dataIndex === 'price'
                ? 2
                : 3,
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          };
        },
      };
    });
    return mergeColumn;
  };
  updateRoom = (fields) => {
    fields.id = this.props.isediting;
    this.props.updateRoom(fields);
  };
  render() {
    return (
      <Form
        component={false}
        ref={this.state.formTypeRoom}
        onFinish={(value) => {
          this.updateRoom(value);
        }}
      >
        <Table
          bordered
          key="table-room-type"
          dataSource={this.props.listType}
          columns={this.configColumnTable()}
          onChange={(pagination, filter, sorter, extra) => {
            this.props.updateTotal(extra.currentDataSource.length);
          }}
          components={{
            body: {
              cell: this.EditableCell,
            },
          }}
          pagination={{ pageSize: this.props.pageSize, style: { display: 'none' }, current:this.props.currentPage }}
        ></Table>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  listType: state.roomType.listRoomType,
  isediting: state.roomType.isediting,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoomType: () => {
      dispatch(fetchRoomTypeAPI());
    },
    updateEditing: (rowkey) => {
      dispatch(updateEditing(rowkey));
    },
    updateRoom: (fields) => {
      dispatch(updateRoomTypeAPI(fields));
    },
    updateTotal: (total) => {
      dispatch(updateTotal(total));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableType);
