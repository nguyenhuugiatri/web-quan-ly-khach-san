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
import { STATUS } from '../../containers/RoomPage/constants';
import './styles.scss';

export default class Square extends Component {
  renderStatus = (status) => {
    switch (status) {
      case STATUS.AVAILABLE:
        return (
          <Row align='middle' style={{ color: '#237804' }}>
            <CheckCircleFilled />
            <span className='status'>Availabe</span>
          </Row>
        );
      case STATUS.RENT:
        return (
          <Row align='middle' style={{ color: '#cf1322' }}>
            <ExclamationCircleFilled />
            <span className='status'>Rent</span>
          </Row>
        );
      case STATUS.RESERVED:
        return (
          <Row align='middle' style={{ color: '#096dd9' }}>
            <InfoCircleFilled />
            <span className='status'>Reserved</span>
          </Row>
        );
      case STATUS.CLEANING:
        return (
          <Row align='middle' style={{ color: '#ad8b00' }}>
            <ClockCircleFilled />
            <span className='status'>Cleaning</span>
          </Row>
        );
      default:
        return 'Unknown';
    }
  };

  render() {
    const {
      id,
      name,
      status,
      typeName,
      handleOnClick,
      roomCurrent,
    } = this.props;

    return (
      <>
        <Card
          className='room-card'
          data-id={id}
          onClick={() => handleOnClick(roomCurrent)}
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
              <div className='room-type'>{typeName}</div>
            </Row>
            <div className='room-number'>{name}</div>
          </>
        </Card>
      </>
    );
  }
}
