import React, { Component } from 'react';
import { Drawer, Button, Form, Input, Col, Row, Select } from 'antd';


export default class DrawerUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form:this.props.form,
      checkUser: true,
      visible:this.props.visible
    };
  }
  SetDefaultPassword = () => {
    this.state.form.current.setFieldsValue({
      password: 'password123',
    });
  };
  Submit = () => {
    const fields = this.state.form.current.getFieldsValue();
    const userList = Array.from(
      this.props.userList,
      ({ username }) => username
    );
    if (userList.includes(fields.username)) {
      this.setState({ checkUser: false });
      return;
    }
    if(!fields.username||fields.username.length<6||!fields.password||![1,0].includes(fields.permission)){
      return;
    }
    this.props.onSubmit()
  };
  validateUsername = (rule, value) => {
    this.setState({
      checkUser: true,
    });
    if (!this.state.checkUser) {
      return Promise.reject('Username is exist!');
    }
    return Promise.resolve();
  };
  render() {
    return (
      <Drawer
        title={this.props.title}
        placement="right"
        width={360}
        closable={true}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form name="addUser" layout="vertical" ref={this.state.form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input username!',
              },
              {
                min: 6,
                message: 'Length of username must be than 6',
              },
              {
                validator: this.validateUsername,
                trigger: 'onBlur',
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Button onClick={this.SetDefaultPassword}>
                Use default password
              </Button>
            </Col>
          </Row>
          <Form.Item
            label="Permission"
            name="permission"
            rules={[
              {
                required: true,
                message: 'Please input password!',
              },
            ]}
          >
            <Select placeholder="Choose permission">
              <Select.Option value={0}>Receptionist</Select.Option>
              <Select.Option value={1}>Manager</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="default" style={{marginRight:"5px"}} onClick={()=>{this.state.form.current.resetFields()}}>Reset</Button>
            <Button type="primary" htmlType="submit" onClick={this.Submit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}
