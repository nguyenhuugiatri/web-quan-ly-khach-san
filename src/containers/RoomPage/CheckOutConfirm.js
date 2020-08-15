import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Row, Col, InputNumber, Select } from 'antd';
import './styles.scss';
const { Option, OptGroup } = Select;

class CheckOutConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, paymentMethod: 'cash' };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleDoneClicked = () => {
    const { handleConfirmCheckOut } = this.props;
    this.setState({
      visible: false,
    });
    handleConfirmCheckOut();
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChangePaymentMethod = (value) => {
    this.setState({ paymentMethod: value });
  };

  handleConfirmClicked = () => {
    const { paymentMethod } = this.state;
    const { handleConfirmCheckOut } = this.props;

    if (paymentMethod === 'card') {
      this.showModal();
    } else {
      handleConfirmCheckOut();
    }
  };

  render() {
    const {
      modalData,
      handleCancel,
      checkInRoom,
      handleConfirmCheckOut,
    } = this.props;
    const { name, serviceCharge, total: roomCharge } = checkInRoom;
    const { visible } = modalData;
    return (
      <div>
        <Modal
          visible={visible}
          title='CHECK OUT'
          onOk={this.handleConfirmClicked}
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key='submit'
              type='primary'
              onClick={this.handleConfirmClicked}
            >
              Confirm
            </Button>,
          ]}
        >
          <Form>
            <div className='confirm-checkout'>
              <Row className='part' justify='space-between' align='middle'>
                <Col className='total-bill-confirm-title' span={12}>
                  Name:
                </Col>
                <Col span={12} className='total-bill-confirm-room'>
                  {name}
                </Col>
              </Row>
              <Row className='part' justify='space-between' align='middle'>
                <Col className='total-bill-confirm-title' span={12}>
                  Room Charge:
                </Col>
                <Col span={12}>
                  <InputNumber
                    className='serviceCharge'
                    disabled
                    value={roomCharge}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
              <Row className='part' justify='space-between' align='middle'>
                <Col className='total-bill-confirm-title' span={12}>
                  Service Charge:
                </Col>
                <Col span={12}>
                  <InputNumber
                    className='serviceCharge'
                    disabled
                    value={serviceCharge}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
              <Row
                className='part total-bill-confirm'
                justify='space-between'
                align='middle'
              >
                <Col className='total-bill-confirm-title' span={12}>
                  Total Cost:
                </Col>
                <Col span={12}>
                  <InputNumber
                    className='serviceCharge'
                    disabled
                    value={serviceCharge + roomCharge}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Col>
              </Row>
              <Row justify='space-between' align='middle'>
                <Col className='total-bill-confirm-title' span={12}>
                  Payment Method:
                </Col>
                <Col span={12}>
                  <Select
                    value={this.state.paymentMethod}
                    style={{ width: 200 }}
                    onChange={this.handleChangePaymentMethod}
                  >
                    <Option value='cash'>Cash</Option>
                    <Option value='card'>Card</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
        <Modal
          title='SWIPE CARD'
          visible={this.state.visible}
          onOk={this.handleDoneClicked}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key='submit'
              type='primary'
              onClick={this.handleDoneClicked}
            >
              Done
            </Button>,
          ]}
        >
          <img
            width='100%'
            height='100%'
            src='https://i.pinimg.com/originals/f8/b0/a2/f8b0a277e663688f577cf09101d1d1fe.gif'
            alt=''
          />
        </Modal>
      </div>
    );
  }
}

export default CheckOutConfirm;
