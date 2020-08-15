import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, Row, InputNumber, Select } from 'antd';

export default class AddServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idService: 1,
      amount: 1,
    };
  }

  handleOnChangeSelect = (value) => {
    this.setState({ idService: value });
  };

  handleOnChangeNumber = (value) => {
    this.setState({ amount: value });
  };

  render() {
    let { serviceList } = this.props;
    if (serviceList)
      serviceList = serviceList.map((e, i) => ({ key: i + 1, ...e }));
    const { handleAddService, handleCancel, modalData } = this.props;
    const { visible, loading, listServiceType } = modalData;

    return (
      <>
        <Modal
          visible={visible}
          title='New Service'
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={async () => {
                await handleAddService(this.state);
                this.setState({ idService: 1 });
              }}
            >
              Add
            </Button>,
          ]}
        >
          <Form>
            <Row justify='space-between' align='middle'>
              <Form.Item style={{ width: '75%', margin: 0 }}>
                <Select
                  placeholder='Service Name'
                  onChange={this.handleOnChangeSelect}
                  value={this.state.idService}
                >
                  {listServiceType.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item style={{ width: '20%', margin: 0 }}>
                <InputNumber
                  value={this.state.amount}
                  min={1}
                  max={10}
                  onChange={this.handleOnChangeNumber}
                />
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}
