import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Row, Col, InputNumber, Select } from 'antd';
import './styles.scss';
const { Option, OptGroup } = Select;

class CheckOutConfirm extends Component {
  render() {
    const { modalData, handleCancel, handleOk } = this.props;
    const { visible } = modalData;
    return (
      <div>
        <Modal
          visible={visible}
          title='CHECK OUT'
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key='submit' type='primary' onClick={handleOk}>
              Confirm
            </Button>,
          ]}
        >
          <Form>
            <div className='confirm-checkout'>
              <Row className='part' justify='space-between' align='middle'>
                <Col className='total-bill-confirm-title' span={12}>
                  Room:
                </Col>
                <Col span={12} className='total-bill-confirm-room'>
                  12
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
                    value={420}
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
                    value={60}
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
                    value={480}
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
                    defaultValue='cash'
                    style={{ width: 200 }}
                    // onChange={handleChange}
                  >
                    <Option value='cash'>Cash</Option>
                    <Option value='card'>Card</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CheckOutConfirm;
