import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './styles.scss';

const { Content } = Layout;
const createPage = (ContentComponent, pageNumber) => {
  return class Page extends Component {
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
          <Sidebar collapsed={collapsed} activePage={pageNumber} />
          <Layout className='site-layout'>
            <Header collapsed={collapsed} handleOnToggle={this.toggle} />
            <Content className='site-layout-background content'>
              <ContentComponent />
            </Content>
          </Layout>
        </Layout>
      );
    }
  };
};

export default createPage;
