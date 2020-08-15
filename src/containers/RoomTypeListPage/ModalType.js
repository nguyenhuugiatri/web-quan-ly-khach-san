import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { Row, Col, Form, Input } from 'antd';
import { updateVisibleFalse, insertRoomType } from './actions';

class ModalType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formModal: React.createRef(),
    };
  }
  insertRoomType = (fields) => {
    this.props.insertRoomType(fields);
  };
  render() {
    return (
      <Modal
        title="Add room type"
        visible={this.props.visible}
        onCancel={() => {
          this.props.updateVisibleFalse();
        }}
        onOk={() => {
          this.state.formModal.current.submit();
        }}
      >
        <Form
          layout="vertical"
          ref={this.state.formModal}
          key="form-modal-type"
          onFinish={(fields) => {
            this.insertRoomType(fields);
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Type name"
                name="name"
                key="nameadd"
                rules={[{ required: true, message: 'Type name is required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Max customer"
                name="maxCustomer"
                rules={[
                  { required: true, message: 'Max customer is required' },
                ]}
                key="maxCustomeradd"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Price/Day $"
                rules={[{ required: true, message: 'Price/Day is required' }]}
                name="price"
                key="price"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price/Hour $"
                rules={[{ required: true, message: 'Price/Hour is required' }]}
                name="priceHour"
                key="Price/Hour"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  visible: state.roomType.visible,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateVisibleFalse: () => {
      dispatch(updateVisibleFalse());
    },
    insertRoomType: (fields) => {
      dispatch(insertRoomType(fields));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalType);
