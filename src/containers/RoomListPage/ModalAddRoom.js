import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Input, Row, Col, Button } from 'antd';
import {
  getListRoomTypeAPI,
  updateVisible,
  createRoom,
} from './actions';
class ModalAddRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: React.createRef(),
    };
  }
  initialValues = () => {
    let roomName = Array.from(
      this.props.listRoom,
      (v) => +v.name.match(/\d+/g)
    );
    if(this.state.form.current!==null){
        this.state.form.current.setFieldsValue({
            name:`Room ${Math.max(...roomName) + 1}`
        })
    }
  };
  componentDidMount() {
    this.initialValues();
    this.props.getListRoomType();
  }
  onChangeRoomType = (value) => {
    let typeInfo = this.props.listRoomType.filter((v) => v.id === value);
    this.state.form.current.setFieldsValue({
      price: typeInfo[0].price,
      maxCustomer: typeInfo[0].maxCustomer,
    });
  };
  addRoom = (fields) => {
    let req = {
      idType: fields.idType,
      name: fields.name,
    };
    this.props.createRoom(req);
    this.initialValues();
  };
  render() {
    console.log('aaa');
    let roomName = Array.from(
        this.props.listRoom,
        (v) => +v.name.match(/\d+/g)
      );
    return (
      <Modal
        visible={this.props.visible}
        title="Choose option"
        onCancel={() => {
          this.props.updateVisible();
        }}
        footer={[
          <Button key="back" onClick={() => this.props.updateVisible()}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              this.state.form.current.submit();
            }}
          >
            Add Room
          </Button>,
        ]}
      >
        <Form
          onFinish={(fields) => {
            this.addRoom(fields);
          }}
          layout="vertical"
          ref={this.state.form}
          initialValues={{ name: `Room ${Math.max(...roomName) + 1}` }}
        >
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item name="name" label="Room name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                name="idType"
                label="Room type"
                rules={[{ required: true, message: 'Room type is required!' }]}
              >
                <Select
                  placeholder="Choose room type"
                  onChange={(value) => {
                    this.onChangeRoomType(value);
                  }}
                >
                  {this.props.listRoomType.map((type) => (
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
              <Form.Item label="Price" name="price">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Max person" name="maxCustomer">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  visible: state.roomTableList.visible,
  listRoomType: state.roomTableList.listRoomType,
  listRoom: state.roomTableList.listRoom,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getListRoomType: () => {
      dispatch(getListRoomTypeAPI());
    },
    updateVisible: () => {
      dispatch(updateVisible());
    },
    createRoom: (fields) => {
      dispatch(createRoom(fields));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddRoom);
