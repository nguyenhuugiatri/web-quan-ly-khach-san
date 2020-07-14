import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import RoomPage from '../RoomPage';
import { logout } from '../App/actions';
import './styles.scss';

const { Content } = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { collapsed } = this.state;
    const { logout } = this.props;
    return (
      <Layout className='container'>
        <Sidebar collapsed={collapsed} />
        <Layout className='site-layout'>
          <Header
            collapsed={collapsed}
            handleOnToggle={this.toggle}
            handleLogout={logout}
          />
          <Content className='site-layout-background content'>
            <RoomPage></RoomPage>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
