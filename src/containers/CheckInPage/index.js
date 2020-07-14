import React, { Component } from "react";
import { Drawer, Table,Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CHECKIN_PAGE } from '../../components/Sidebar/constants';
import createPage from '../../components/createPage';
import "antd/dist/antd.css";
import "./styles.scss";

const { Option } = Select;

const { Column, ColumnGroup } = Table;
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}: {content}</p>
    
  </div>
);
class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: false,
    };
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
 

  render() {
    
    return (
        <>
          <Button type="primary" onClick={this.showDrawer}>
            <PlusOutlined /> New account
          </Button>
          <Drawer
            title="CHECK IN"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.onClose} type="primary">
                  Submit
                </Button>
              </div>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name of customer"
                    rules={[{ required: true, message: 'Please enter name of customer' }]}
                  >
                    <Input placeholder="Please enter name of customer" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="CMND"
                    label="CMND"
                    rules={[{ required: true, message: 'Please enter CMND' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Please enter CMND"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="room "
                    label="Room"
                    rules={[{ required: true, message: 'Room' }]}
                  >
                    <Input className='inputCheckin' defaultValue='Phong 316' disabled   />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please choose the type' }]}
                  >
                    
                    <Input className='inputCheckin' defaultValue='Phong Vip' disabled   />
                    
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Price' }]}
                  >
                    <Input className='inputCheckin' defaultValue='500.000' disabled   />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="DateTime"
                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentElement}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="please enter url description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </>
      );
  }
}
const CheckInPage = createPage(CheckIn, CHECKIN_PAGE);
export default CheckInPage;
