import React, { Component } from 'react';
import { Table, Input, Button, Space, Popconfirm, Form, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

class TableService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      form: React.createRef(),
    };
  }

  isEditing = (record) => record.id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  edit = (record) => {
    this.state.form.current.setFieldsValue({
      name: '',
      typeName: '',
      price: '',
      ...record,
    });
    this.setState({ editingKey: record.id });
  };

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

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
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
        <Space>
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
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
        setTimeout(() => this.searchInput.select(), 100);
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

  render() {
    let {
      listService,
      listType,
      handleDeleteClicked,
      handleEditClicked,
    } = this.props;
    const { editingKey, form } = this.state;

    const columns = [
      {
        title: 'No.',
        dataIndex: 'key',
        key: 'no',
        width: '15%',
        editable: false,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        editable: true,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Type',
        dataIndex: 'idType',
        key: 'idType',
        width: '20%',
        editable: true,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '20%',
        editable: true,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width: '15%',
        render: (_, record) => {
          let content = [];
          const editable = this.isEditing(record);
          if (editable)
            content = [
              ...content,
              <span key='save-button'>
                <a
                  // href='javascript:;'
                  // onClick={() => handleEditClicked({id:record.id,service:form.current.getFieldsValue()})}
                  onClick={() => form.current.submit()}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </a>
                <Popconfirm title='Sure to cancel?' onConfirm={this.cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>,
            ];
          else {
            content = [
              ...content,
              <a
                key='edit-button'
                disabled={editingKey !== ''}
                onClick={() => this.edit(record)}
              >
                Edit
              </a>,
            ];
            if (listService.length >= 1)
              content = [
                ...content,
                <Popconfirm
                  key='delete-button'
                  title='Sure to delete?'
                  onConfirm={() => handleDeleteClicked(record.id)}
                >
                  <a style={{ marginLeft: 10 }}>Delete</a>
                </Popconfirm>,
              ];
          }

          return content;
        },
      },
    ];

    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode =
        dataIndex === 'idType' ? (
          <Select>
            {listType.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input />
        );
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
          ) : dataIndex === 'idType' ? (
            record.typeName
          ) : (
            children
          )}
        </td>
      );
    };

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    listService = listService
      .sort((a, b) => b.id - a.id)
      .map((e, i) => ({ ...e, key: i + 1 }));
    return (
      <div>
        <Form
          ref={form}
          component={false}
          onFinish={(editedService) => {
            handleEditClicked({ id: editingKey, editedService });
            this.setState({ editingKey: '' });
          }}
        >
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={listService}
            columns={mergedColumns}
            rowClassName='editable-row'
            pagination={{
              onChange: this.cancel,
            }}
          />
        </Form>
        {/* <Table columns={columns} dataSource={listService} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listService: state.service.listService,
  listType: state.service.listType,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TableService);
