import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import './styles.scss';

class MenuBar extends Component {
  render() {
    return (
      <>
        <Typography.Text strong style={{ paddingBottom: 5 }}>
          AE1N HOTEL MANAGEMENT
        </Typography.Text>
        {/* <Menu theme='light' mode='horizontal'>
          <Menu.Item key='1' icon={<UserOutlined />}>
            Check in
          </Menu.Item>
          <Menu.Item key='2' icon={<UserOutlined />}>
            Check out
          </Menu.Item>
          <Menu.Item key='3' icon={<UserOutlined />}>
            Service
          </Menu.Item>
        </Menu> */}
      </>
    );
  }
}

export default MenuBar;
