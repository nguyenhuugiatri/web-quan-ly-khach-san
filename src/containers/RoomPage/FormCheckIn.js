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
} from 'antd';
import { connect } from 'react-redux';
import {
  searchCustomerByPhoneAPI,
  updateCheckInCustomer,
  updateCheckInRoom,
} from './actions';
import './styles.scss';

class FormCheckIn extends Component {
  handleOnChangeInputCustomer = (e) => {
    const { updateCheckInCustomer, checkInCustomer } = this.props;
    const { name: inputName, value } = e.target;
    if (inputName === 'cusName')
      updateCheckInCustomer({ ...checkInCustomer, name: value });
    else updateCheckInCustomer({ ...checkInCustomer, [inputName]: value });
  };

  handleOnChangeInputRoom = (value) => {
    const { updateCheckInRoom, checkInRoom } = this.props;
    if (typeof value === 'number')
      updateCheckInRoom({ ...checkInRoom, price: value });
    else updateCheckInRoom({ ...checkInRoom, date: value });
    console.log(value);
  };

  handleOnChangeSelect = (value) => {
    const { updateCheckInCustomer, checkInCustomer } = this.props;
    updateCheckInCustomer({ ...checkInCustomer, idtype: value });
  };

  render() {
    const { searchCustomerByPhone, checkInCustomer, checkInRoom } = this.props;
    const { cmnd, name: cusName, idtype, phone } = checkInCustomer;
    const { name, typename, price } = checkInRoom;
    return (
      <Form layout='vertical' hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Name'>
              <Input
                name='cusName'
                value={cusName}
                placeholder="Input customer's name"
                onChange={this.handleOnChangeInputCustomer}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='ID Number'>
              <Input
                name='cmnd'
                value={cmnd}
                placeholder="Input customer's ID number"
                onChange={this.handleOnChangeInputCustomer}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className='form-part' gutter={16}>
          <Col span={12}>
            <Form.Item label='Customer Type'>
              <Select
                name='idtype'
                placeholder='Select customer type'
                value={idtype}
                onChange={this.handleOnChangeSelect}
              >
                <Select.Option value={1}>Local</Select.Option>
                <Select.Option value={2}>Foreign</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Phone Number'>
              <Input.Search
                value={phone}
                name='phone'
                placeholder="Input customer's phone number"
                onSearch={searchCustomerByPhone}
                onChange={this.handleOnChangeInputCustomer}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Room'>
              <Input name='name' value={name} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Type'>
              <Input name='type' value={typename} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Price'>
              <InputNumber
                style={{ width: '100%' }}
                name='price'
                value={price}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.handleOnChangeInputRoom}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='dateTime' label='DateTime'>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                getPopupContainer={(trigger) => trigger.parentElement}
                onChange={this.handleOnChangeInputRoom}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkInCustomer: state.room.checkInCustomer,
    checkInRoom: state.room.checkInRoom,
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
    searchCustomerByPhone: (phone) => {
      dispatch(searchCustomerByPhoneAPI(phone));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCheckIn);
