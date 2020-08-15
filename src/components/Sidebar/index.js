import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from '@reach/router';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  ContainerOutlined,
  HomeOutlined,
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

          <Menu.Item key={PAGE.BOOKING_PAGE} icon={<UserOutlined />}>
            <Link to='/'>Booking</Link>
          </Menu.Item>

          <Menu.Item key={PAGE.USER_PAGE} icon={<VideoCameraOutlined />}>
            <Link to='/users'>Users</Link>
          </Menu.Item>

          <Menu.Item key={PAGE.CUSTOMER_PAGE} icon={<VideoCameraOutlined />}>
            <Link to='/customer'>Customer</Link>
          </Menu.Item>

          <Menu.Item key={PAGE.ROOM_LIST_PAGE} icon={<HomeOutlined />}>
            <Link to='/room'>Rooms</Link>
          </Menu.Item>

          <Menu.Item
            key={PAGE.ROOM_TYPE_LIST_PAGE}
            icon={<ContainerOutlined />}
          >
            <Link to='/roomtype'>Room Types</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
