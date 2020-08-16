import React, { Component } from 'react';
import MenuBar from '../MenuBar';
import 'antd/dist/antd.css';
import {
  Layout,
  Row,
  Button,
  Col,
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Input,
  Form,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import showNotification from '../../utils/showNotification';
import { STATUS } from '../../utils/constants';
import { logout } from './../../containers/App/actions';
import { connect } from 'react-redux';
import axios from './../../utils/callAPI';
import './styles.scss';

const { Header: HeaderAntd } = Layout;
const URL = process.env.SERV_HOST || 'http://localhost:8000';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      form: React.createRef(),
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (values) => {
    console.log('values', values);
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOnFinish = async ({ password, newPassword }) => {
    const { username } = this.props.currentUser;
    try {
      const result = await axios({
        method: 'POST',
        url: `${URL}/user/changePassword`,
        data: { username, password, newPassword },
      });
      showNotification(STATUS.SUCCESS, result.data.message);
      this.handleCancel();
      this.props.handleLogout();
    } catch (err) {
      console.log('Error:', err.response.data.message);
      showNotification(STATUS.ERROR, err.response.data.message);
    }
  };

  render() {
    const { collapsed, handleOnToggle, handleLogout, currentUser } = this.props;
    const { visible } = this.state;
    return (
      <HeaderAntd className='site-layout-background' style={{ padding: 0 }}>
        <Row justify='space-between' align='middle'>
          <Row align='middle'>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: handleOnToggle,
              }
            )}
            <MenuBar />
          </Row>
          <Row align='middle'>
            <Row justify='center' align='middle' style={{ marginRight: 10 }}>
              <Avatar
                size='small'
                icon={<UserOutlined />}
                style={{ marginRight: 7 }}
              />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item icon={<SwapOutlined />} onClick={this.showModal}>
                      Change password
                    </Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
                      Log out
                    </Menu.Item>
                  </Menu>
                }
              >
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => e.preventDefault()}
                  style={{ color: 'unset', paddingRight: 25 }}
                >
                  {currentUser.username} <DownOutlined />
                </a>
              </Dropdown>
            </Row>
          </Row>
        </Row>

        <Modal
          visible={visible}
          title='CHANGE PASSWORD'
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key='submit'
              type='primary'
              onClick={() => this.state.form.current.submit()}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            onFinish={this.handleOnFinish}
            ref={this.state.form}
            id='changePasswordForm'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label='Current Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='New Password'
              name='newPassword'
              hasFeedback
              rules={[
                { required: true, message: 'Please input your new password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='Confirm Password'
              name='confirmPassword'
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </HeaderAntd>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.global.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
