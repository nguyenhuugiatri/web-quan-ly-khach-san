import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, Row, InputNumber, Select } from 'antd';

export default class AddServiceForm extends Component {
  render() {
    let { serviceList } = this.props;
    if (serviceList)
      serviceList = serviceList.map((e, i) => ({ key: i + 1, ...e }));
    const { handleOk, handleCancel, modalData } = this.props;
    const { visible, loading, listServiceType } = modalData;

    return (
      <>
        <Modal
          visible={visible}
          title='New Service'
          onOk={this.handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={handleOk}
            >
              Add
            </Button>,
          ]}
        >
          <Form
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          >
            <Row justify='space-between' align='middle'>
              <Form.Item style={{ width: '75%', margin: 0 }}>
                <Select
                  name='name'
                  placeholder='Service Name'
                  // onChange={this.handleOnChangeSelect}
                >
                  {listServiceType.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item style={{ width: '20%', margin: 0 }}>
                <InputNumber value={1} min={1} max={10} onChange={null} />
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}
