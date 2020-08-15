import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Form, Select, Input, Row, Col, Button } from "antd";
import { getListRoomTypeAPI, updateVisible, createRoom } from "./actions";
import "./styles.scss";
export default class ModalChangeRoom extends Component {
  render() {
    return (
      <div>
        <Modal
          visible={this.props.visibleModal}
          title="Choose option"
          onCancel={() => {
            this.props.onCloseModal();
          }}
          footer={[
            <Button key="back" onClick={() => this.props.onCloseModal()}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                this.props.acceptChangeRoom();
              }}
            >
              Accept
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            ref={this.props.valueForm}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="Room name">
                 <Select onChange={(value) => {
                         this.props.handleOnChangeRoomCurrent(value);
                       }}>
                       
                 {this.props.listRoomRent.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                 </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="roomType"
                  label="Room type"
                  rules={[
                    { required: true, message: "Room type is required!" },
                  ]}
                >
                  <Select
                    placeholder="Choose room type"
                      onChange={(value) => {
                        this.props.handleOnChangeSelectTypeRoom(value);
                      }}
                  >
                    
                    {this.props.listTypeRoom.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="roomChange"
                  label="Room Change"
                  rules={[
                    { required: true, message: "Room type is required!" },
                  ]}
                >
                  <Select
                    placeholder="Choose room change"
                      onChange={(value) => {
                        this.props.handleOnChangeSelectRoomChange(value);
                      }}
                  >
                    {this.props.listRoomByType.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Price/Day" >
                <Input name="price" value={this.props.price} disabled />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Price/Hour" >
                  <Input name="pricehour" value={this.props.priceHour} disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
