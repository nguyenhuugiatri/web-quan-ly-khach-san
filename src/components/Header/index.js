import React, { Component } from 'react';
import MenuBar from '../MenuBar';
import 'antd/dist/antd.css';
import { Layout, Row, Button, Col, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { logout } from './../../containers/App/actions';
import { connect } from 'react-redux';
import './styles.scss';

const { Header: HeaderAntd } = Layout;

class Header extends Component {
  render() {
    const { collapsed, handleOnToggle, handleLogout, currentUser } = this.props;
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
              <div>{currentUser.username}</div>
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
        </Row>
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
