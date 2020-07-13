import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import './styles.scss';

class MenuBar extends Component {
  render() {
    return (
      <Menu className='menu' theme='light' mode='horizontal'>
        <Menu.Item key='1'>Check in</Menu.Item>
        <Menu.Item key='2'>Check out</Menu.Item>
        <Menu.Item key='3'>Service</Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
