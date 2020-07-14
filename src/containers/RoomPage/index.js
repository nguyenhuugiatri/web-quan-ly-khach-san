import React, { Component } from "react";
import createPage from "../../components/createPage";
import { BOOKING_PAGE } from "../../components/Sidebar/constants";
import { connect } from "react-redux";
import { gerListRoomAPI } from "./actions";

import Square from "../../components/Square";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  Radio,
  Typography,
} from "antd";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      visible: false,
      currentRoom: {
        id: "",
        name: "",
        typeid: "",
        typename: "",
        price: "",
      },
    };
  }

  componentDidMount = () => {
    this.props.getListRoom();
  };
  showDrawer = (Room) => {
    this.setState({
      visible: true,
      currentRoom: Room,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  renderListRoom = (list, filter) => {
    if (!list) return { list: null, total: null };
    if (filter !== null) list = list.filter((room) => room.status === filter);
    const rows = list.map((room) => (
      <Col key={room.id} style={{ padding: "15px" }} span={4}>
        <Square
          {...room}
          key={room.id}
          name={room.name.replace("Phòng ", "")}
          roomCurrent={{
            id: room.id,
            name: room.name,
            typeid: room.typeid,
            typename: room.typename,
            price: room.price,
          }}
          handleOnClick={(room) => this.showDrawer(room)}
        />
      </Col>
    ));
    return { list: <Row align="middle">{rows}</Row>, total: rows.length };
  };

  handleOnChangeRadio = (e) => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };

  render() {
    const { filter } = this.state;
    const { listRoom } = this.props;
    const { list, total } = this.renderListRoom(listRoom, filter);
    return (
      <>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "15px" }}
        >
          <Radio.Group
            onChange={this.handleOnChangeRadio}
            defaultValue={null}
            buttonStyle="solid"
          >
            <Radio.Button value={null}>All</Radio.Button>
            <Radio.Button value={0}>Available</Radio.Button>
            <Radio.Button value={1}>Rent</Radio.Button>
            <Radio.Button value={2}>Reserved</Radio.Button>
            <Radio.Button value={3}>Cleaning</Radio.Button>
          </Radio.Group>
          <Col style={{ minWidth: "60px" }}>
            <Typography.Text>Total: {total}</Typography.Text>
          </Col>
        </Row>
        {list}

        <Drawer
          title="CHECK IN"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name of customer"
                  rules={[
                    {
                      required: true,
                      message: "Please enter name of customer",
                    },
                  ]}
                >
                  <Input placeholder="Please enter name of customer" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="CMND"
                  label="CMND"
                  rules={[{ required: true, message: "Please enter CMND" }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Please enter CMND"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="room "
                  label="Room"
                  rules={[{ required: true, message: "Room" }]}
                >
                  <p>{this.state.currentRoom.name}</p>
                  {/* <Input
                    className="inputCheckin"
                   value='22222'
                  /> */}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    { required: true, message: "Please choose the type" },
                  ]}
                >
                  <p >{this.state.currentRoom.typename}</p>
                  {/* <Input
                    className="inputCheckin"
                    defaultValue="Phong Vip"
                    disabled
                  /> */}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "Price" }]}
                >
                  <p>{this.state.currentRoom.price}</p>
                  {/* <Input
                    className="inputCheckin"
                    defaultValue="500.000"
                    disabled
                  /> */}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[
                    { required: true, message: "Please choose the dateTime" },
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter url description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter url description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listRoom: state.room.listRoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListRoom: () => {
      dispatch(gerListRoomAPI());
    },
  };
};

const RoomListConnect = connect(mapStateToProps, mapDispatchToProps)(RoomList);

const RoomPage = createPage(RoomListConnect, BOOKING_PAGE);

export default RoomPage;
