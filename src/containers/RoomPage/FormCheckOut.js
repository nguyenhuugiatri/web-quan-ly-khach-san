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
import AddServiceForm from './../../components/AddServiceForm';
import {
  fillCheckOutCustomerAPI,
  updateCheckInCustomer,
  updateCheckInRoom,
  checkOutAPI,
  getListServiceTypeAPI,
} from './actions';
import moment from 'moment';
import axios from 'axios';
import './styles.scss';
const URL = process.env.SERV_HOST || 'http://localhost:8000';

class FormCheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleAddService = (newService) => {
    this.setState({ loading: true });
    const { idService, amount } = newService;
    const { checkInRoom, checkOut } = this.props;
    const { rentReceiptId: idRentReceipt, id: idRoom } = checkInRoom;
    axios({
      method: 'POST',
      url: `${URL}/service/add`,
      data: { idService, amount, idRoom, idRentReceipt },
    })
      .then(this.setState({ loading: false, visible: false }, checkOut(idRoom)))
      .catch((err) => console.log(err));
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    const {
      checkInRoom,
      fillCheckOutCustomer,
      checkOut,
      getListServiceType,
    } = this.props;
    getListServiceType();
    fillCheckOutCustomer(checkInRoom.id);
    checkOut(checkInRoom.id);
  }
  render() {
    const {
      checkInCustomer,
      checkInRoom,
      listCustomerType,
      listServiceType,
    } = this.props;

    const {
      idNumber,
      name: cusName,
      phone,
      typeName: cusTypeName,
    } = checkInCustomer;

    let {
      name,
      typeName,
      dateIn,
      total,
      serviceList,
      serviceCharge,
    } = checkInRoom;

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
            <Form.Item label='Room Charge'>
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
            <Button
              shape='circle'
              icon={<AppstoreAddOutlined onClick={this.showModal} />}
            />
          </Tooltip>
        </Row>
        <TableService serviceList={serviceList} serviceCharge={serviceCharge} />
        <AddServiceForm
          modalData={{ ...this.state, listServiceType }}
          handleAddService={this.handleAddService}
          handleCancel={this.handleCancel}
        />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkInCustomer: state.room.checkInCustomer,
    checkInRoom: state.room.checkInRoom,
    listCustomerType: state.room.listCustomerType,
    listServiceType: state.room.listServiceType,
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
    getListServiceType: () => {
      dispatch(getListServiceTypeAPI());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCheckOut);
