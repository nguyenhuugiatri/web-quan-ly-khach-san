import React, { Component } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Form,
  Select,
  Tag,
  message,
  Pagination,
  Popconfirm,
} from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import createPage from "../../components/createPage";
import axios from "axios";
import "antd/dist/antd.css";
import "./styles.scss";
import { USER_PAGE } from "../../components/Sidebar/constants";
const URL = process.env.SERV_HOST || "http://localhost:8000";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchText: "",
      disable: false,
      searchedColumn: "",
      isediting: "",
      currentPage: 1,
      formRef: React.createRef(),
      loading: false,
    };
  }

  getList = () => {
    axios
      .get(`${URL}/user/list`)
      .then((res) => {
        let { listUser } = res.data;
        this.setState({
          list: listUser,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getList();
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
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
        setTimeout(() => this.searchInput.select());
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
  isEditing = (record) => {
    return record.key === this.state.isediting;
  };
  handleEdit = (record) => {
    return () => {
      this.setState({
        isediting: record.key,
        disable:false
      });
      this.state.formRef.current.setFieldsValue({
        username:record.username
      });
    };
  };
  handleResetPassword = (record) => {
    return () => {
      this.setState({ loading: true, disable: false });
      axios
        .patch(`${URL}/user/resetpassword`, { id: record.key })
        .then((res) => {
          if (res.status === 200) {
            message.success({
              top: 100,
              content: "Reset password success",
            });
            this.setState({ loading: false, disable: true });
          }
        });
    };
  };
  handleDelete = (record) => {
    return () => {
      axios.patch(`${URL}/user/delete`, { id: record.id }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          message.success({
            style: {
              top: 100,
              right: 100,
            },
            content: res.data.message,
          });
          this.getList();
        } else {
          message.warning({
            style: {
              top: 100,
              right: 100,
            },
            content: res.data.message,
          });
        }
      });
    };
  };
  handleSave = (record) => {
    return () => {
      let per;
      let form = this.state.formRef.current;
      const {username,permission} = form.getFieldsValue('username permission');
      if(permission==="Manager"){
        per = 1;
      }else{
        per = 0;
      }
      axios.patch(`${URL}/user/update`,{id: record.id,username,permission:per}).then(res=>{
        if(res.status===200){
          message.success({
            content:res.data.message,
            top:100
          })
          this.getList();
          this.setState({
            isediting:"",
          })
        }else{
          message.warning({
            content:res.data.message,
            top:100
          })
          this.setState({
            isediting:"",
          })
        }
      })
    };
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
    if (inputType === 1) {
      inputNode = (
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.handleResetPassword(record)}
          disabled={this.state.disable}
        >
          Reset password
        </Button>
      );
    } else if (inputType === 2) {
      inputNode = (
        <Select defaultValue={record.permission}>
          <Select.Option value="Manager" >Manager</Select.Option>
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
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "35%",
        editable: true,
        ...this.getColumnSearchProps("username"),
      },
      {
        title: "Password",
        dataIndex: "password",
        editable: true,
        key: "password",
        width: "30%",
      },
      {
        title: "Permission",
        editable: true,
        dataIndex: "permission",
        key: "permission",
        width: "30%",
        className: "tag",
        render: (permission) => {
          let color = "#096DD9";
          if (permission === "Receptionist") {
            color = "#CF1322";
          }
          return <Tag color={color}>{permission}</Tag>;
        },
        filters: [
          { text: "Receptionist", value: "Receptionist" },
          { text: "Manager", value: "Manager" },
        ],
        onFilter: (value, record) => record.permission.indexOf(value) === 0,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: "5%",
        render: (_, record) => {
          if (!this.isEditing(record)) {
            return (
              <Space size="middle">
                <EditOutlined
                  style={{ color: "#096DD9" }}
                  onClick={this.handleEdit(record)}
                  className="control-icon"
                  placement="topLeft"
                />
                <Popconfirm
                  title="Are you sure ?"
                  onConfirm={this.handleDelete(record)}
                >
                  <DeleteOutlined
                    style={{ color: "#CF1322" }}
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
                    style={{ color: "#096DD9" }}
                    onClick={this.handleEdit(record)}
                    className="control-icon"
                  />
                </Popconfirm>

                <CloseCircleOutlined
                  style={{ color: "#CF1322" }}
                  onClick={() => {
                    this.setState({ isediting: "" });
                  }}
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
            col.dataIndex === "username"
              ? 0
              : col.dataIndex === "password"
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
      <div>
        <div className="header-table">
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add User
          </Button>
          <Pagination
            size="medium"
            defaultPageSize={9}
            current={this.state.currentPage}
            defaultCurrent={1}
            total={this.state.list.length}
            onChange={(pageNumber) => {
              this.setState({ currentPage: pageNumber, isediting: "" });
            }}
          />
        </div>

        <Form ref={this.state.formRef} component={false}>
          <Table
            components={{
              body: {
                cell: this.EditableCell,
              },
            }}
            columns={mergeColumn}
            dataSource={this.state.list}
            pagination={{
              pageSize: 9,
              current: this.state.currentPage,
              style: { display: "none" },
            }}
            bordered
          ></Table>
        </Form>
      </div>
    );
  }
}

const UserListPage = createPage(UserList, USER_PAGE);
export default UserListPage;
