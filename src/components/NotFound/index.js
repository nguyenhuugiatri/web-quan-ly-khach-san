import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from '@reach/router';

export default class NotFoundPage extends Component {
  render() {
    return (
      <Result
        status='error'
        title='404 Not Found'
        subTitle='Please check your URL'
        extra={[
          <Button type='primary' key='back'>
            <Link to='/'>Go home</Link>
          </Button>,
        ]}
      ></Result>
    );
  }
}
