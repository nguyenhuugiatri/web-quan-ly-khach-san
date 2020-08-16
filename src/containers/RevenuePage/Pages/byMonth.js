import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REVENUE_PAGE_MONTH } from '../../../components/Sidebar/constants';
import createPage from '../../../components/createPage';
import Axios from 'axios';
import { Select, Row, Col, Typography, Switch } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';
import '../style.scss';
import { BarChart, LineChart } from '../../../components/Chart';
const { Title } = Typography;
const URL = process.env.SERV_HOST || 'http://localhost:8000';

class RevenueMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datasets: [],
      labels: [],
      titleForChart: 'Overview',
      BarChart: React.createRef(),
      LineChart: React.createRef(),
      BarOrLine: false,
      dataSelect: [],
      selectIndex: '',
      display: {
        total: 0,
        month: '',
        year: '',
      },
    };
  }
  componentDidMount() {
    Axios.post(`${URL}/bill`, { type: 'month' }).then((r) => {
      this.setState({
        datasets: '',
        labels: '',
        ...r.data,
      });
    });
  }
  lineChartConfig = (aspectRatio) => {
    console.log(this.state.datasets);
    let datasets = Array.from(this.state.datasets, (v) => {
      let obj = {
        fill: false,
        label: v.label,
        data: v.data,
        borderColor: v.backgroundColor[0],
      };
      return obj;
    });
    return LineChart({
      aspectRatio,
      datasets,
      labels: this.state.labels,
      ref: this.state.LineChart,
    });
  };
  barChartConfig = (aspectRatio) => {
    let datasets =
      this.state.dataSelect.length === 0
        ? this.state.datasets
        : this.state.dataSelect;
    return BarChart({
      ref: this.state.BarChart,
      labels: this.state.labels,
      datasets,
      aspectRatio,
      onClick: (e, i, l) => {
        this.onSelectLegendLable(e, i, l);
      },
    });
  };
  onSelectLegendLable = (e, i, l) => {
    const index = i.datasetIndex;
    if (this.state.selectIndex === index) {
      return this.setState({
        dataSelect: this.state.datasets,
        selectIndex: '',
      });
    }
    this.setState({
      selectIndex: index,
    });
    let temp = Array.from(this.state.datasets);
    let a = temp.map((e, ii) => {
      let v = e;
      if (ii !== index) {
        return { label: v.label };
      }
      return v;
    });
    this.setState({
      dataSelect: a,
      display: {
        total: a[index].data.reduce(function (a, b) {
          return a + b;
        }, 0),
        year: a[index].label,
      },
    });
    console.log(a);
  };
  render() {
    return (
      <>
        <Row className="header-chart" gutter={16}>
          <Col span={20}>
            <h2
              style={{
                fontWeight: 600,
                textTransform: 'uppercase',
                marginRight: '10px',
              }}
            >
              {this.state.titleForChart}
            </h2>
          </Col>
          <Col span={4}>
            <Switch
              checkedChildren="Line Chart"
              unCheckedChildren="Bar chart"
              onChange={(value) => {
                this.setState({ BarOrLine: value });
              }}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16} className="char">
            {!this.state.BarOrLine
              ? this.barChartConfig(1.5)
              : this.lineChartConfig(1.5)}
          </Col>
          <Col span={8} className="horizontal-display">
            <Row>
              <Col span={4}></Col>
              <Col span={20}>
                <Row>
                  <Title level={3}>
                    Total Revenue{' '}
                    {this.state.display.year.length > 0
                      ? ` ${this.state.display.year}`
                      : ''}
                  </Title>
                </Row>
                <Row className="display-revenue">
                  <MoneyCollectOutlined
                    style={{ fontSize: '2.5rem' }}
                    className="red"
                  />
                  <Title level={1} className="revenue-value">
                    {this.state.display.total}
                  </Title>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col span={23}>
                <Row className="display-revenue">
                  {this.state.BarOrLine
                    ? this.barChartConfig(1)
                    : this.lineChartConfig(1)}
                </Row>
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

const RevenueConnect = connect(mapStateToProps, mapDispatchToProps)(RevenueMonth);
const RevenuePage = createPage(RevenueConnect, REVENUE_PAGE_MONTH);
export default RevenuePage;
