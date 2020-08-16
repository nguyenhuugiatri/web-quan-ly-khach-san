import React, { Component } from 'react';
import { Row, Col, DatePicker, Button, message, Pagination } from 'antd';
import moment from 'moment';
import { UserAddOutlined } from '@ant-design/icons';
import createPage from '../../components/createPage';
import axios from './../../utils/callAPI';
import 'antd/dist/antd.css';
import { BILL_PAGE } from '../../components/Sidebar/constants';
import TableBill from './TableBill';

const URL = process.env.SERV_HOST || 'http://localhost:8000';
class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBill: [],
      array: [],
    };
  }
  getAllBill = () => {
    axios
      .get(`${URL}/bill/allBill`)
      .then((res) => {
        if (res.data) {
          let { listAllBill } = res.data;
          for (let i = 0; i < listAllBill.length; i++) {
            listAllBill[i].key = i;
          }
          this.setState({
            listBill: listAllBill,
            array: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showListBill = () => {
    console.log('aaa', '1' + this.state.array[0] + '1', this.state.array[1]);
    if (this.state.array[0]) {
      const dateFrom = moment(this.state.array[0]).format('YYYY-MM-DD');
      const dateTo = moment(this.state.array[1]).format('YYYY-MM-DD');
      axios({
        method: 'POST',
        url: `${URL}/bill/listBill`,
        data: {
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
      })
        .then((result) => {
          const { listBill } = result.data;
          console.log('data', listBill);
          this.setState({
            listBill: listBill,
          });
        })
        .catch((err) => {
          if (err && err.response) {
          }
        });
    } else {
      this.getAllBill();
    }
  };
  componentDidMount() {
    this.getAllBill();
  }
  handleOnChangeDateTime = (value) => {
    try {
      this.setState({
        array: [value[0], value[1]],
      });
    } catch (err) {}
  };
  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [
                  moment().startOf('month'),
                  moment().endOf('month'),
                ],
              }}
              showTime
              value={this.state.array}
              allowClear={false}
              format='YYYY/MM/DD '
              onChange={this.handleOnChangeDateTime}
            />
          </Col>
          <Col span={16}>
            <Button onClick={this.getAllBill} type='primary'>
              Clear
            </Button>
            <Button
              style={{ marginLeft: '5px' }}
              onClick={this.showListBill}
              type='primary'
            >
              Filter
            </Button>
          </Col>
        </Row>

        <TableBill listBill={this.state.listBill}></TableBill>
      </div>
    );
  }
}
const BillPage = createPage(Bill, BILL_PAGE);
export default BillPage;
