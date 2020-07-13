import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './styles.scss';

const { Header: HeaderAntd } = Layout;

class Header extends Component {
  render() {
    const { collapsed, handleOnToggle } = this.props;
    return (
      <HeaderAntd className='site-layout-background' style={{ padding: 0 }}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: handleOnToggle,
          }
        )}
      </HeaderAntd>
    );
  }
}

export default Header;
