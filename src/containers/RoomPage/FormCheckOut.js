import React, { Component } from 'react';
import {
  Form,
  Col,
  Row,
  Input,
  DatePicker,
  Divider,
  Select,
  InputNumber,
  Typography,
  Button,
  Tooltip,
} from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import TableService from './../../components/TableService';
import {
  fillCheckOutCustomerAPI,
  updateCheckInCustomer,
  updateCheckInRoom,
  checkOutAPI,
} from './actions';
import moment from 'moment';
import './styles.scss';

class FormCheckOut extends Component {
  componentDidMount() {
    const { checkInRoom, fillCheckOutCustomer, checkOut } = this.props;
    fillCheckOutCustomer(checkInRoom.id);
    checkOut(checkInRoom.id);
  }
  render() {
    const { checkInCustomer, checkInRoom, listCustomerType } = this.props;

    const {
      idNumber,
      name: cusName,
      phone,
      typeName: cusTypeName,
    } = checkInCustomer;

    let { name, typeName, dateIn, total } = checkInRoom;

    return (
      <Form layout='vertical' hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Name'>
              <Input
                className='inputDisabled'
                disabled
                name='cusName'
                value={cusName || ''}
                placeholder="Input customer's name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='ID Number'>
              <Input
                className='inputDisabled'
                disabled
                name='idNumber'
                value={idNumber || ''}
                placeholder="Input customer's ID number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className='form-part' gutter={16}>
          <Col span={12}>
            <Form.Item label='Customer Type'>
              <Select
                disabled
                name='idType'
                placeholder='Select customer type'
                value={cusTypeName || null}
              >
                {listCustomerType.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Phone Number'>
              <Input
                className='inputDisabled'
                disabled
                value={phone || ''}
                name='phone'
                placeholder="Input customer's phone number"
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Room'>
              <Input
                className='inputDisabled'
                disabled
                name='name'
                value={name || ''}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Type'>
              <Input
                className='inputDisabled'
                disabled
                name='type'
                value={typeName || ''}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Total'>
              <InputNumber
                disabled
                style={{ width: '100%' }}
                name='total'
                value={total || 0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {dateIn && (
              <Form.Item name='dateTime' label='Date'>
                <DatePicker.RangePicker
                  defaultValue={[moment(moment(dateIn)), moment()]}
                  disabled
                  showTime
                  format='YYYY/MM/DD HH:mm'
                />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Divider></Divider>
        <Row
          justify='space-between'
          align='middle'
          style={{
            marginBottom: '8px',
          }}
        >
          <Typography.Text
            style={{
              color: 'rgba(0, 0, 0, 0.85)',
            }}
          >
            Services
          </Typography.Text>
          <Tooltip title='Add service'>
            <Button shape='circle' icon={<AppstoreAddOutlined />} />
          </Tooltip>
        </Row>
        <TableService />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkInCustomer: state.room.checkInCustomer,
    checkInRoom: state.room.checkInRoom,
    listCustomerType: state.room.listCustomerType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCheckInCustomer: (customer) => {
      dispatch(updateCheckInCustomer(customer));
    },
    updateCheckInRoom: (room) => {
      dispatch(updateCheckInRoom(room));
    },
    fillCheckOutCustomer: (idRoom) => {
      dispatch(fillCheckOutCustomerAPI(idRoom));
    },
    checkOut: (idRoom) => {
      dispatch(checkOutAPI(idRoom));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCheckOut);
