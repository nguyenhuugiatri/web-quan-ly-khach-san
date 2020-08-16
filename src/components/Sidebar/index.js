import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Link } from '@reach/router';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import {
  UserOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  NumberOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import * as PAGE from './constants';
import './styles.scss';

const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    const { collapsed, activePage, currentUser } = this.props;
    if (currentUser && currentUser.permission === 1)
      return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='logo'></div>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[`${activePage}`]}
          >
            <Menu.Item key={PAGE.HOME_PAGE} icon={<ScheduleOutlined />}>
              <Link to='/'>Renting</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.BOOKING_PAGE} icon={<CalendarOutlined />}>
              <Link to='/booking'>Booking</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.USER_PAGE} icon={<UserOutlined />}>
              <Link to='/users'>Users</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.CUSTOMER_PAGE} icon={<UsergroupAddOutlined />}>
              <Link to='/customer'>Customer</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.ROOM_LIST_PAGE} icon={<HomeOutlined />}>
              <Link to='/room'>Rooms</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.ROOM_TYPE_LIST_PAGE} icon={<NumberOutlined />}>
              <Link to='/roomtype'>Room Types</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.SERVICE_PAGE} icon={<MoneyCollectOutlined />}>
              <Link to='/service'>Services</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.BILL_PAGE} icon={<MoneyCollectOutlined />}>
              <Link to='/bill'>Bills</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      );
    else if (currentUser && currentUser.permission === 0)
      return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='logo'></div>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[`${activePage}`]}
          >
            <Menu.Item key={PAGE.HOME_PAGE} icon={<ScheduleOutlined />}>
              <Link to='/'>Renting</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.BOOKING_PAGE} icon={<CalendarOutlined />}>
              <Link to='/booking'>Booking</Link>
            </Menu.Item>

            <Menu.Item key={PAGE.BILL_PAGE} icon={<MoneyCollectOutlined />}>
              <Link to='/bill'>Bills</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.global.currentUser,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
