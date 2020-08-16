import React, { Component } from 'react';
import { DoughnutChart } from '../../../components/Chart';
import createPage from '../../../components/createPage';
import { connect } from 'react-redux';
import { Col, Row, Typography,Divider } from 'antd';
import axios from 'axios';
import { REVENUE_PAGE_YEAR } from '../../../components/Sidebar/constants';
const URL = process.env.SERV_HOST || 'http://localhost:8000';
const { Title } = Typography;
class RevenueYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      labels: [],
      clip:10,
      chart: React.createRef(),
      display:{
          total:0,
          year:0
      }
    };
  }

  getData = () => {
    try {
      axios.post(`${URL}/bill`, { type: 'year' }).then((r) => {
        this.setState({
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
          <Col span={20}>
            {DoughnutChart({
              ref: this.state.chart,
              labels: this.state.labels,
              datasets: this.state.datasets,
              aspectRatio: 2,
            })}
          </Col>
          <Col span={4}>
                <Title level={3}>Revenue </Title>
                <Divider style={{border: '1px solid'}}/>
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
