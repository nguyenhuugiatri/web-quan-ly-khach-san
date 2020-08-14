import React, { Component } from 'react'
import { Button, message, Pagination } from "antd";
import moment from "moment";
import {
    Drawer,
    Form,
    Col,
    Row,
    Input,
    DatePicker,
    Divider,
    Select,
    InputNumber,
  } from "antd";
export default class BookDrawer extends Component {
  
       

    
    
    render() {
         const {dataForm,handleOnClose,handleOnChangeSelectCusType,handleOnChangeDateTime,handleOnChangePrice,handleOnChangeSelectRoom,handleOnChangeSelectTypeRoom,submitBooking} = this.props;
        const {listCustomerType,listTypeRoom,listRoomByType,visible,valueForm,priceRoom} = dataForm;
        return (
            <div>
                <Drawer
            title="BOOKING"
            visible={visible}
            onClose={handleOnClose}
            width={720}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={handleOnClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={submitBooking}
                  style={{ marginRight: 8 }}
                >
                  Book
                </Button>
              </div>
            }
            onSubmit={submitBooking}
          >
            <Form layout="vertical" hideRequiredMark ref={valueForm}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Name" name="cusName">
                    <Input
                      // value={cusName || ''}
                      placeholder="Input customer's name"
                      // onChange={this.handleOnChangeInputCustomer}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="ID Number" name="idNumber">
                    <Input
                      //   value={idNumber || ''}
                      placeholder="Input customer's ID number"
                      //   onChange={this.handleOnChangeInputCustomer}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="form-part" gutter={16}>
                <Col span={12}>
                  <Form.Item label="Customer Type" name="idCusType">
                    <Select
                      placeholder="Select customer type"
                      onChange={handleOnChangeSelectCusType}
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
                  <Form.Item label="Phone Number" name="phone">
                    <Input.Search
                      //  value={phone || ''}
                      placeholder="Input customer's phone number"
                      //  onSearch={searchCustomerByPhone}
                      //  onChange={this.handleOnChangeInputCustomer}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider></Divider>
              <Row>
              <Col span={24}>
                  <Form.Item name="dateTime" label="Date">
                    <DatePicker.RangePicker
                    style={{width:'100%'}}
                      ranges={{
                        Today: [moment(), moment()],
                        "This Month": [
                          moment().startOf("month"),
                          moment().endOf("month"),
                        ],
                      }}
                      showTime
                      format="YYYY/MM/DD HH:mm"
                      onChange={handleOnChangeDateTime}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Type" name="type">
                    {/* <Input name="type" value={this.state.typeRoom} disabled /> */}
                    <Select
                      placeholder="Select type room"
                      onChange={handleOnChangeSelectTypeRoom}
                    >
                      {listTypeRoom.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Room" name="idRoom">
                    <Select
                      placeholder="Select room"
                      onChange={handleOnChangeSelectRoom}
                    >
                      {listRoomByType.map((item) => (
                        <Select.Option key={item.id + item.name} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Price"   >
                    <InputNumber
                     value={priceRoom}
                      style={{ width: "100%" }}
                      
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                       onChange={handleOnChangePrice}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
            </div>
        )
    }
}
