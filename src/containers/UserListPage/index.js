import React, { Component } from 'react';
import { Button, message, Pagination } from 'antd';
import DrawerUser from '../../components/DrawerUser';
import TableUser from '../../components/TableUser';
import { UserAddOutlined } from '@ant-design/icons';
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
      disable: false,
      isediting: '',
      currentPage: 1,
      formRef: React.createRef(),
      loading: false,
      visible: false,
      formInsert: React.createRef(),
      pageSize: 10,
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

  isEditing = (record) => {
    return record.key === this.state.isediting;
  };
  cancelEdit = () => {
    this.setState({
      isediting: '',
    });
  };
  handleEdit = (record) => {
    return () => {
      this.setState({
        isediting: record.key,
        disable: false,
      });

      this.state.formRef.current.setFieldsValue({
        username: record.username,
      });
    };
  };
  handleResetPassword = (record) => {
    return () => {
      this.setState({ loading: true, disable: false });
      axios
        .patch(`${URL}/user/resetpassword`, { id: record.id })
        .then((res) => {
          if (res.status === 200) {
            message.success({
              top: 100,
              content: 'Reset password success',
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
      const { username, permission } = form.getFieldsValue(
        'username permission'
      );
      if (permission === 'Manager') {
        per = 1;
      } else {
        per = 0;
      }
      axios
        .patch(`${URL}/user/update`, {
          id: record.id,
          username: username,
          permission: per,
        })
        .then((res) => {
          if (res.status === 200) {
            message.success({
              content: res.data.message,
              top: 100,
            });
            this.getList();
            this.setState({
              isediting: '',
            });
          } else {
            message.warning({
              content: res.data.message,
              top: 100,
            });
            this.setState({
              isediting: '',
            });
          }
        });
    };
  };
  submitAdd = () => {
    const fields = this.state.formInsert.current.getFieldsValue();
    axios.post(`${URL}/user/insert`, fields).then((value) => {
      if (value) {
        message.success('Insert user success');
        this.state.formInsert.current.resetFields();
        this.getList();
      }
    });
  };
  render() {
    return (
      <div>
        <div className='header-table'>
          <Button
            icon={<UserAddOutlined />}
            type='primary'
            onClick={() => {
              this.setState({ visible: true });
              let form = this.state.formInsert.current;
              if (form !== null) {
                form.resetFields();
              }
            }}
          >
            Add User
          </Button>
          <DrawerUser
            title='ADD USER'
            visible={this.state.visible}
            onClose={() => {
              this.setState({ visible: false });
            }}
            userList={this.state.list}
            form={this.state.formInsert}
            onSubmit={this.submitAdd}
            onSuccess={this.getList}
          ></DrawerUser>
          <Pagination
            size='medium'
            defaultPageSize={this.state.pageSize}
            current={this.state.currentPage}
            defaultCurrent={1}
            total={this.state.list.length}
            onChange={(pageNumber, pageSize) => {
              this.setState({
                currentPage: pageNumber,
                isediting: '',
                pageSize,
              });
            }}
          />
        </div>

        <TableUser
          listUser={this.state.list}
          formUser={this.state.formRef}
          currentPage={this.state.currentPage}
          idEditing={this.isEditing}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleResetPassword={this.handleResetPassword}
          handleSave={this.handleSave}
          isediting={this.state.isediting}
          cancelEdit={this.cancelEdit}
          loading={this.state.loading}
          disable={this.state.disable}
          pageSize={this.state.pageSize}
        ></TableUser>
      </div>
    );
  }
}

const UserListPage = createPage(UserList, USER_PAGE);
export default UserListPage;
