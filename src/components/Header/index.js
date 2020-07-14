import React, { Component } from 'react';
import MenuBar from '../MenuBar';
import 'antd/dist/antd.css';
import { Layout, Row, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './styles.scss';

const { Header: HeaderAntd } = Layout;

class Header extends Component {
  render() {
    const { collapsed, handleOnToggle, handleLogout } = this.props;
    return (
      <HeaderAntd className='site-layout-background' style={{ padding: 0 }}>
        <Row justify='space-between' align='middle'>
          <Row>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: handleOnToggle,
              }
            )}
            <MenuBar />
          </Row>
          <Button
            className='logout-button'
            type='text'
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Row>
      </HeaderAntd>
    );
  }
}

export default Header;
