import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
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
    return (
      <Layout className='container'>
        <Sidebar collapsed={collapsed} />
        <Layout className='site-layout'>
          <Header collapsed={collapsed} handleOnToggle={this.toggle} />
          <Content className='site-layout-background content'>Content</Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomePage;
