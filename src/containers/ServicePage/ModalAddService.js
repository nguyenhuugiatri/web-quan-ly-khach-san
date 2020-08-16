import React, { Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { getListTypeAPI } from './actions';
import { connect } from 'react-redux';

class ModalAddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: React.createRef(),
    };
  }

  componentDidMount() {
    this.props.getListType();
  }

  render() {
    const {
      visible,
      handleAddClicked,
      handleCancelClicked,
      listType,
    } = this.props;
    const { form } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          title='ADD NEW SERVICE'
          onOk={() => form.current.submit()}
          onCancel={handleCancelClicked}
          footer={[
            <Button key='cancel' onClick={handleCancelClicked}>
              Cancel
            </Button>,
            <Button
              key='add'
              type='primary'
              onClick={() => form.current.submit()}
            >
              Add
            </Button>,
          ]}
        >
          <Row justify='center' align='middle'>
            <Col span={22}>
              <Form
                onFinish={handleAddClicked}
                ref={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Form.Item
                  label='Name'
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input service name!',
                    },
                  ]}
                >
                  <Input placeholder='Input service name' />
                </Form.Item>
                <Form.Item
                  label='Type'
                  name='idType'
                  rules={[
                    {
                      required: true,
                      message: 'Please select service type!',
                    },
                  ]}
                >
                  <Select placeholder='Select service name'>
                    {listType.map((e) => (
                      <Select.Option key={e.id} value={e.id}>
                        {e.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label='Price'
                  name='price'
                  rules={[
                    {
                      required: true,
                      message: 'Please input service price!',
                    },
                  ]}
                >
                  <InputNumber
                    placeholder='Input service price'
                    style={{ width: '100%' }}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    min={1}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listType: state.service.listType,
});

const mapDispatchToProps = (dispatch) => ({
  getListType: () => {
    dispatch(getListTypeAPI());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddService);
