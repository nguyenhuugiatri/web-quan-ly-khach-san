import React, { Component } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

export default class TableBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const { listBill } = this.props;
    
    
    const columns = [
      {
        title: "User",
        dataIndex: "username",
        key: "username",
        width: "10%",
        ...this.getColumnSearchProps("username"),
      },
      {
        title: "Id Bill ",
        dataIndex: "id",
        key: "id",
        width: "10%",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "ROOM",
        dataIndex: "idRoom",
        key: "idRoom",
        width: "10%",
        ...this.getColumnSearchProps("idRoom"),
      },
      {
        title: "Date In",
        dataIndex: "dateIn",
        key: "dateIn",
        width: "15%",
        ...this.getColumnSearchProps("dateIn"),
      },
      {
        title: "Date Out",
        dataIndex: "dateOut",
        key: "dateOut",
        width: "15%",
        ...this.getColumnSearchProps("dateOut"),
      },
      {
        title: "Room Price",
        dataIndex: "price",
        key: "price",
        ...this.getColumnSearchProps("price"),
      },
      {
        title: "Room Charge",
        dataIndex: "roomCharge",
        key: "roomCharge",
        ...this.getColumnSearchProps("roomCharge"),
      },
      {
        title: "Service Charge",
        dataIndex: "serviceCharge",
        key: "serviceCharge",
        ...this.getColumnSearchProps("serviceCharge"),
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        ...this.getColumnSearchProps("total"),
      },
    ];
    
    return <Table columns={columns} dataSource={listBill} />;
  }
}
