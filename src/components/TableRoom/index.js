import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';
import {
  Input,
  Space,
  Button,
  Select,
  Form,
  Table,
  Tag,
  Popconfirm,
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { STATUS } from '../../containers/RoomPage/constants';
import { connect } from 'react-redux';
import {
  updateTotal,
  editingRow,
  cancelEdit,
  getListRoomTypeAPI,
  deleteRoom,
  updateInformationRoom,
} from '../../containers/RoomListPage/actions';
import './style.scss';
class TableRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      searchedColumn: '',
      width: 0,
      form: React.createRef(),
      maxPerson: '',
      price: '',
      initialValues: [],
    };
  }

  componentDidMount() {
    this.props.getRoomType();
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
    this.props.updateTotal(this.props.dataSource.length);
  };
  
  onSelectedChange = (value) => {
    let type = this.props.listRoomType.filter((obj) => {
      return obj.name === value;
    });
    this.state.form.current.setFieldsValue({
      price: type[0].price,
      maxCustomer: type[0].maxCustomer,
    });
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
    if (editing) {
      switch (inputType) {
        case 0:
          inputNode = <Input autoComplete="off" />;
          break;
        case 1:
          inputNode = (
            <Select
              style={{ width: '100%' }}
              onChange={(value) => this.onSelectedChange(value)}
            >
              {this.props.listRoomType.map((type) => (
                <Select.Option key={type.id} value={type.name}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          );
          break;
        case 2:
          inputNode = <Input type="number" disabled={true} />;
          break;
        case 3:
          inputNode = <Input disabled={true} />;
          break;
        default:
          break;
      }
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

  isEditing = (record) => {
    return record.key === this.props.isediting;
  };
  submitForm = (value) => {
    value.id = this.props.isediting;
    var type = this.props.listRoomType.filter((obj) => {
      return obj.name === value.typeName;
    });
    value.idType = type[0].id;
    let fields = { id: value.id, idType: value.idType, name: value.name };
    this.props.updateRoom(fields);
  };
  render() {
    let filterForType = this.props.listRoomType.map(type=>{
      return{
        text:type.name,
        value:type.name
      }
    })
    let columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Type',
        dataIndex: 'typeName',
        key: 'typeName',
        editable: true,
        filters:filterForType,
        onFilter:(value,record)=>record.typeName===value
      },
      {
        title: 'Price (VND)',
        dataIndex: 'price',
        key: 'price',
        editable: true,
        filterMultiple: true,
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('price'),
      },
      {
        title: 'Max person',
        dataIndex: 'maxCustomer',
        key: 'maxCustomer',
        editable: true,
        sorter: (a, b) => a.maxCustomer - b.maxCustomer,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'Available', value: STATUS.AVAILABLE },
          { text: 'Rent', value: STATUS.RENT },
          { text: 'Reserved', value: STATUS.RESERVED },
          { text: 'Cleaning', value: STATUS.CLEANING },
        ],
        onFilter: (value, record) => {
          return  record.status===value;
        },
        render: (_, record) => {
          switch (record.status) {
            case STATUS.AVAILABLE:
              return <Tag color="#237804"># Available</Tag>;
            case STATUS.RENT:
              return <Tag color="#CF1322"># Rent</Tag>;
            case STATUS.RESERVED:
              return <Tag color="#096DD9"># Reserved</Tag>;
            case STATUS.CLEANING:
              return <Tag color="#AD8B00"># Reserved</Tag>;

            default:
              break;
          }
        },
      },
      {
        title: 'Action',
        with: '10%',

        key: 'operation',
        align: 'center',
        render: (_, record) => {
          return (
            <div>
              {!this.isEditing(record) ? (
                <Space size="middle">
                  <EditOutlined
                    className="control-icon blue"
                    onClick={() => {
                      this.props.Edit(record.key);
                      this.state.form.current.setFieldsValue({
                        name: '',
                        typeName: '',
                        price: '',
                        maxCustomer: '',
                        ...record,
                      });
                    }}
                  />
                  <Popconfirm
                    title="Delete this room ?"
                    onConfirm={() => {
                      this.props.deleteRoom(record.id);
                    }}
                  >
                    <DeleteOutlined className="control-icon red" />
                  </Popconfirm>
                </Space>
              ) : (
                <Space size="middle">
                  <Popconfirm
                    title="Save this record?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      this.state.form.current.submit();
                    }}
                  >
                    <SaveOutlined className="control-icon blue" />
                  </Popconfirm>
                  <CloseCircleOutlined
                    className="control-icon red"
                    onClick={() => {
                      this.props.cancelEdit();
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
    return (
      <Form
        name="tableRoomForm"
        component={false}
        ref={this.state.form}
        initialValues={this.state.initialValues}
        onFinish={(value) => {
          this.submitForm(value);
        }}
      >
        <Table
        key='tableRoom'
          scroll={{ x: 'max-content' }}
          onChange={(pagination, filters, sorter, extra) => {
            const { currentDataSource } = extra;
              this.props.updateTotal(currentDataSource.length);
          }}
          size="middle"
          components={{
            body: {
              cell: this.EditableCell,
            },
          }}
          dataSource={this.props.dataSource}
          columns={mergeColumn}
          pagination={{
            pageSize: 11,
            current: this.props.currentPage,
            style: { display: 'none' },
          }}
          bordered
        />
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  listRoom: state.roomTableList.listRoom,
  total: state.roomTableList.total,
  isediting: state.roomTableList.isEditing,
  listRoomType: state.roomTableList.listRoomType,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomType: () => {
      dispatch(getListRoomTypeAPI());
    },
    Edit: (key) => {
      dispatch(editingRow(key));
    },
    cancelEdit: () => {
      dispatch(cancelEdit());
    },
    updateRoom: (fields) => {
      dispatch(updateInformationRoom(fields));
    },
    deleteRoom: (id) => {
      dispatch(deleteRoom(id));
    },
    updateTotal:(total)=>{
      dispatch(updateTotal(total))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRoom);
