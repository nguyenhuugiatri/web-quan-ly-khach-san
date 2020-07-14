import React, { Component } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import createPage from '../../components/createPage';
import axios from 'axios';
import 'antd/dist/antd.css';
import './styles.scss';
import { USER_PAGE } from '../../components/Sidebar/constants';

const URL = process.env.SERV_HOST || 'http://localhost:8000';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchText: '',
      searchedColumn: '',
    };
  }

  getList = () => {
    axios
      .get(`${URL}/users/list`)
      .then((res) => {
        const { listUser } = res.data;
        for (let i = 0; i < listUser.length; i++) {
          listUser[i].key = i + 1;
          if (listUser[i].permission == '0') {
            listUser[i].permission = 'Receptionist';
          } else listUser[i].permission = 'Manager';
        }
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

  render() {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '30%',
        ...this.getColumnSearchProps('username'),
      },
      {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
        width: '20%',
        ...this.getColumnSearchProps('password'),
      },
      {
        title: 'Permission',
        dataIndex: 'permission',
        key: 'permission',
        ...this.getColumnSearchProps('permission'),
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => {
          return (
            <Space size='middle'>
              <a href='#'>Delete</a>
              <a href='#'>Edit</a>
            </Space>
          );
        },
      },
    ];
    return (
      <div>
        <Button
          icon={<UserAddOutlined />}
          type='primary'
          style={{
            marginBottom: 16,
          }}
        >
          Add User
        </Button>
        <Table columns={columns} dataSource={this.state.list} bordered></Table>
      </div>
    );
  }
}

const UserListPage = createPage(UserList, USER_PAGE);
export default UserListPage;
