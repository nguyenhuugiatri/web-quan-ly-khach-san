import React, { Component } from "react";
import { Button, message, Pagination } from "antd";
import {
  Drawer,
  Form,
  Col,
  Row,
  Input,
  DatePicker,
  Divider,
  Select,
  InputNumber,
} from "antd";
import DrawerUser from "../../components/DrawerUser";
import TableUser from "../../components/TableUser";
import { UserAddOutlined } from "@ant-design/icons";
import createPage from "../../components/createPage";
import axios from "axios";
import "antd/dist/antd.css";
import { BOOKING_PAGE } from "../../components/Sidebar/constants";
const URL = process.env.SERV_HOST || "http://localhost:8000";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      listCustomerType: [],
      listRoom: [],
      idRoom: "",
      idTypeRoom:"",
      typeRoom: "",
      priceRoom: "",
      valueForm: React.createRef(),
    };
  }
  handleOnChangeSelectRoom = (value) => {
    this.setState(
      {
        idRoom: value,
      },
      () => {
        this.getNameTypeAndPrice();
      }
    );
  };
  handleOnChangeSelectCusType = (value) => {
    this.setState(
      {
        idTypeRoom: value,
      }
    );
  };
  getListType = () => {
    axios
      .get(`${URL}/customer/listType`)
      .then((res) => {
        if (res.data) {
          let { listCustomerType } = res.data;
          this.setState({
            listCustomerType: listCustomerType,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getListRoom = () => {
    axios
      .get(`${URL}/room/listRoom`)
      .then((res) => {
        if (res.data) {
          let listRoom = res.data;
          this.setState({
            listRoom: listRoom,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getNameTypeAndPrice = () => {
    console.log(this.state.idRoom);
    axios({
      method: "POST",
      url: `${URL}/room/roomCurrent`,
      data: {
        id: this.state.idRoom,
      },
    })
      .then((result) => {
        let data = result.data;
        console.log(data[0].name);
        this.setState({
          typeRoom: data[0].name,
          priceRoom: data[0].price,
        });
      })
      .catch((err) => {
        if (err && err.response) {
        }
      });
  };
  componentDidMount() {
    this.getListType();
    this.getListRoom();
  }
  submitBooking = () => {
    var data = this.state.valueForm.current.getFieldsValue();
    //
    let customerBook = {
      idNumber: data.idNumber,
      name: data.cusName,
      idType: data.idCusType,
      phone:data.phone,
    }
    let roomBook = {
      idRoom: this.state.idRoom,
      idTypeRoom: this.state.idTypeRoom,
      price: this.state.priceRoom,
      date:data.dateTime
    }
    let dataSend = {
      checkInCustomer:customerBook,
      checkInRoom:roomBook,
    }
  
    // const { name, typeName, price } = checkInRoom;
    //
    axios({
      method: 'POST',
      url: `${URL}/booking/bookRoom`,
      data : dataSend,
    }).then((result) => {
      console.log(result.data);
    });
  };
  render() {
    const { listCustomerType, listRoom } = this.state;
    return (
      <div>
        <div className="header-table">
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
            onClick={() => {
              this.setState({ visible: true });
            }}
          >
            Add User
          </Button>
          <Drawer
            title="BOOKING"
            visible={this.state.visible}
            onClose={() => {
              this.setState({ visible: false });
            }}
            width={720}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={this.handleClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={this.submitBooking}
                  style={{ marginRight: 8 }}
                >
                  Book
                </Button>
              </div>
            }
            onSubmit={this.submitBooking}
          >
            <Form layout="vertical" hideRequiredMark ref={this.state.valueForm}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Name" name="cusName">
                    <Input
                      
                      // value={cusName || ''}
                      placeholder="Input customer's name"
                      // onChange={this.handleOnChangeInputCustomer}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="ID Number" name="idNumber">
                    <Input
                      //   value={idNumber || ''}
                      placeholder="Input customer's ID number"
                      //   onChange={this.handleOnChangeInputCustomer}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="form-part" gutter={16}>
                <Col span={12}>
                  <Form.Item label="Customer Type" name="idCusType">
                    <Select  placeholder="Select customer type" onChange={this.handleOnChangeSelectCusType}>
                      {listCustomerType.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input.Search
                      //  value={phone || ''}
                      placeholder="Input customer's phone number"
                      //  onSearch={searchCustomerByPhone}
                      //  onChange={this.handleOnChangeInputCustomer}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider></Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Room" name="idRoom" >
                    <Select
                     
                      placeholder="Select room"
                      onChange={this.handleOnChangeSelectRoom}
                    >
                      {listRoom.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Type">
                    <Input name="type" value={this.state.typeRoom} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Price">
                    <InputNumber
                      style={{ width: "100%" }}
                      name="price"
                      value={this.state.priceRoom || 0}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      // onChange={this.handleOnChangeInputRoom}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="dateTime" label="DateTime">
                    <DatePicker.RangePicker
                      style={{ width: "100%" }}
                      getPopupContainer={(trigger) => trigger.parentElement}
                      // onChange={this.handleOnChangeInputRoom}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </div>
      </div>
    );
  }
}

const BookingPage = createPage(Booking, BOOKING_PAGE);
export default BookingPage;
