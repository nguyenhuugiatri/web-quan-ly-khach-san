import React, { Component } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

export default class TableBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
    };
  }

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
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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
    this.setState({ searchText: "" });
  };
  render() {
    const { listBooking ,checkInRoomBooked } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: "10%",
        ...this.getColumnSearchProps("phone"),
      },
      {
        title: "ID Number",
        dataIndex: "idNumber",
        key: "idNumber",
        width: "10%",
        ...this.getColumnSearchProps("idNumber"),
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
        title: "Room",
        dataIndex: "nameRoom",
        key: "nameRoom",
        width: "20%",
        ...this.getColumnSearchProps("nameRoom"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: "30%",
        ...this.getColumnSearchProps("price"),
      },
      {
        title: "Action",
        key: "opera",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" style={{ marginRight: 8 }} onClick={checkInRoomBooked(record)}>
              Accept
            </Button>
            <Button  style={{ marginRight: 8 }} onClick={checkInRoomBooked(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ];
    return <Table columns={columns} dataSource={listBooking} />;
  }
}
