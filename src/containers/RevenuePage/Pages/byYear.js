import React, { Component } from 'react';
import { DoughnutChart, BarChart } from '../../../components/Chart';
import createPage from '../../../components/createPage';
import { connect } from 'react-redux';
import { Col, Row, Typography, Divider } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';
import axios from './../../../utils/callAPI';
import { REVENUE_PAGE_YEAR } from '../../../components/Sidebar/constants';
const COLOR = ['#00b7c2', '#e8505b', '#f6ab6c', '#ff5f40'];
const URL = process.env.SERV_HOST || 'http://localhost:8000';
const { Title } = Typography;
class RevenueYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      labels: [],
      clip: 10,
      chart: React.createRef(),
      display: {
        total: 0,
        year: 0,
      },
    };
  }

  getData = () => {
    try {
      axios.post(`${URL}/bill`, { type: 'year' }).then((r) => {
        let total = r.data.datasets
          .map((v, i) => {
            return v.data.reduce((a, b) => a + b, 0);
          })
          .reduce((a, b) => a + b, 0);
        this.setState({
          display: {
            total,
          },
          ...r.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        <Row>
          <Title level={2}>OVERVIEW</Title>
        </Row>
        <Row>
          <Col span={18}>
            {DoughnutChart({
              ref: this.state.chart,
              labels: this.state.labels,
              datasets: this.state.datasets,
              aspectRatio: 2,
            })}
          </Col>
          <Col span={6}>
            <Title level={2}>Revenue </Title>
            <Divider style={{ border: '1px solid' }} />
            <Title level={3} style={{ textAlign: 'right' }}>
              Annual total income
            </Title>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <MoneyCollectOutlined
                style={{ fontSize: '2rem', marginRight: '10px' }}
                className='red'
              />
              <Title level={2} className='revenue-value display-revenue'>
                {this.state.display.total}
              </Title>
            </Row>
            <Row>
              <Col span={12}></Col>
              <Col span={12}>
                <Divider style={{ border: '1px solid' }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

const RevenueYearConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueYear);
const RevenuePage = createPage(RevenueYearConnect, REVENUE_PAGE_YEAR);
export default RevenuePage;
