import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

export default class AddServiceForm extends Component {
  render() {
    let { serviceList } = this.props;
    if (serviceList)
      serviceList = serviceList.map((e, i) => ({ key: i + 1, ...e }));
    const { handleOk, handleCancel, modalData } = this.props;
    const { visible, loading } = modalData;

    return (
      <>
        <Modal
          visible={visible}
          title='Title'
          onOk={this.handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }
}
