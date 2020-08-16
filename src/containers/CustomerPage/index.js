import React, { Component } from 'react';
import { Button, message, Pagination } from 'antd';
import moment from 'moment';
import { UserAddOutlined } from '@ant-design/icons';
import createPage from '../../components/createPage';
import axios from './../../utils/callAPI';
import 'antd/dist/antd.css';
import { CUSTOMER_PAGE } from '../../components/Sidebar/constants';

import TableCustomer from './TableCustomer';

const URL = process.env.SERV_HOST || 'http://localhost:8000';
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [],
    };
  }
  getListCustomer = () => {
    axios
      .get(`${URL}/customer/listCustomer`)
      .then((res) => {
        if (res.data) {
          let { listCustomer } = res.data;
          for (let i = 0; i < listCustomer.length; i++) {
            listCustomer[i].key = i;
          }
          this.setState({
            listCustomer: listCustomer,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getListCustomer();
  }
  render() {
    return (
      <div>
        <TableCustomer listCustomer={this.state.listCustomer}></TableCustomer>
      </div>
    );
  }
}
const CustomerPage = createPage(Customer, CUSTOMER_PAGE);
export default CustomerPage;
