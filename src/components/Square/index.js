import React, { Component } from 'react';
import { Card, Row } from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  ClockCircleFilled,
} from '@ant-design/icons';
import './styles.scss';

export default class Square extends Component {
  renderStatus(status) {
    switch (status) {
      case 0:
        return (
          <Row align='middle' style={{ color: '#237804' }}>
            <CheckCircleFilled />
            <span className='status'>Availabe</span>
          </Row>
        );
      case 1:
        return (
          <Row align='middle' style={{ color: '#cf1322' }}>
            <ExclamationCircleFilled />
            <span className='status'>Rent</span>
          </Row>
        );
      case 2:
        return (
          <Row align='middle' style={{ color: '#096dd9' }}>
            <InfoCircleFilled />
            <span className='status'>Reserved</span>
          </Row>
        );
      case 3:
        return (
          <Row align='middle' style={{ color: '#ad8b00' }}>
            <ClockCircleFilled />
            <span className='status'>Cleaning</span>
          </Row>
        );
      default:
        return 'Unknown';
    }
  }

  render() {
    const { id, name, max_persons, status } = this.props;
    let type;
    if (max_persons % 2 >= 1) {
      type = 'Twin';
    } else {
      type = 'Single';
    }
    return (
      <>
        <Card
          className='room-card'
          data-id={id}
          hoverable
          actions={[
            <SettingOutlined key='setting' />,
            <EditOutlined key='edit' />,
            <EllipsisOutlined key='ellipsis' />,
          ]}
        >
          <>
            <Row justify='space-between' align='middle' className='status-line'>
              {this.renderStatus(status)}
              <div className='room-type'>{type}</div>
            </Row>
            <div className='room-number'>{name}</div>
          </>
        </Card>
      </>
    );
  }
}
