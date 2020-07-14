import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './actions';

import 'antd/dist/antd.css';
import './styles.scss';

const { Title } = Typography;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: true,
    };
  }

  handleOnFinish = () => {
    const { remember } = this.state;
    const { login } = this.props;
    if (remember) localStorage.setItem('savedUser', JSON.stringify(this.state));
    else localStorage.clear();
    login(this.state);
  };

  handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnChangeCheckBox = (e) => {
    const { checked } = e.target;
    this.setState({
      remember: checked,
    });
  };

  componentDidMount = () => {
    const savedUser = JSON.parse(localStorage.getItem('savedUser'));
    if (savedUser) {
      const { username, password, remember } = savedUser;
      this.setState({
        username,
        password,
        remember,
      });
    }
  };

  render() {
    const { username, password, remember } = this.state;
    return (
      <>
        <Row className='login-container' justify='center' align='middle'>
          <Col>
            <Title className='login-form-header' level={2} align='center'>
              LOG IN
            </Title>
            <Form
              name='normal_login'
              className='login-form'
              onFinish={this.handleOnFinish}
            >
              <Form.Item>
                <Input
                  name='username'
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Username'
                  value={username}
                  onChange={this.handleOnChangeInput}
                />
              </Form.Item>

              <Form.Item>
                <Input
                  name='password'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.handleOnChangeInput}
                />
              </Form.Item>

              <Form.Item>
                <Form.Item noStyle>
                  <Checkbox
                    checked={remember}
                    onChange={this.handleOnChangeCheckBox}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>

                <a className='login-form-forgot' href=''>
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  disabled={!(username && password)}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(login(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
