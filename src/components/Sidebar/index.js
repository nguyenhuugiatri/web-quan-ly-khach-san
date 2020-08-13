import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from '@reach/router';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import * as PAGE from './constants';
import './styles.scss';

const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    const { collapsed, activePage } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'></div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[`${activePage}`]}
        >
          <Menu.Item key={PAGE.HOME_PAGE} icon={<UserOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key={PAGE.USER_PAGE} icon={<VideoCameraOutlined />}>
            <Link to='/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key={PAGE.BOOKING_PAGE} icon={<VideoCameraOutlined />}>
            <Link to='/booking'>Booking</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
