import React, { Component } from "react";
import createPage from "../../components/createPage";
import { HOME_PAGE } from "../../components/Sidebar/constants";
import { connect } from "react-redux";
import { getListRoomAPI, updateCheckInRoom } from "./actions";
import Square from "../../components/Square";
import { Button, Col, Row, Radio, Typography, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import RoomDrawer from "./RoomDrawer.js";
import { STATUS } from "./constants";
import ModalChangeRoom from "./ModalChangeRoom";
import showNotification from '../../utils/showNotification';
import moment from "moment";
import axios from "axios";
import "./styles.scss";
const URL = process.env.SERV_HOST || "http://localhost:8000";
class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      visible: false,
      visibleModal: false,
      idRoomCurrent: "",
      idRoomChange: "",
      idTypeRoom:"",
      idRentReceipt: "",
      nameTypeRoom:"",
      price:"",
      priceHour:"",
      dateIn: "",
      dateOut: "",
      valueForm: React.createRef(),
      listRoomRent: [],
      listTypeRoom:[],
      listRoomByType:[],
      searchText: "",
    };
  }
  handleOnChangeSelectRoomChange = (value) => {
    console.log('aaaaaaaa',value);
    this.setState(
      {
        idRoomChange: value,
      },
      () => {
        this.getNameTypeAndPrice();
      }
    );
  };
  handleOnChangePrice=(value)=>{
    this.setState({
      price:value
    });
  }
  handleOnChangeRoomCurrent = (value) => {
    this.setState(
      {
        idRoomCurrent: value,
      },
      async () => {
        await this.getDataRoom();
        await this.getNameTypeAndPrice();
        await this.getListRoomByType();
      }
    );
  };
  getNameTypeAndPrice = () => {
   return axios({
      method: "POST",
      url: `${URL}/room/roomCurrent`,
      data: {
        id: this.state.idRoomCurrent,
      },
    })
      .then((result) => {
        let data = result.data;
        console.log('222222',data);
        this.setState({
          priceHour: data[0].priceHour,
          price: data[0].price,
          nameTypeRoom: data[0].name,
          idTypeRoom:data[0].id
        });
      })
      .catch((err) => {
        if (err && err.response) {
        }
      });
  };
  getListRoomByType = () => {
    return axios({
      method: "POST",
      url: `${URL}/room/listRoomByType`,
      data: {
        id: this.state.idTypeRoom,
        dateIn: this.state.dateIn,
        dateOut: this.state.dateOut,
      },
    })
      .then((result) => {
        let data = result.data;
        this.setState({
          listRoomByType: data,
        });
      })
      .catch((err) => {
        if (err && err.response) {
        }
      });
  };
  getListTypeRoom = () => {
    axios
      .get(`${URL}/room/listTypeRoom`)
      .then((res) => {
        if (res.data) {
          let listTypeRoom = res.data;
          this.setState({
            listTypeRoom: listTypeRoom,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getDataRoom = () => {
   return axios({
      method: "POST",
      url: `${URL}/room/dataRoom`,
      data: {
        id: this.state.idRoomCurrent,
      },
    })
      .then((result) => {
        let data = result.data;
        let dateIn = moment(data.dateIn).format("YYYY-MM-DD HH:mm");
        let dateOut = moment(data.dateOut).format("YYYY-MM-DD HH:mm");
        this.setState({
          idRentReceipt: data.id,
          dateIn: dateIn,
          dateOut:dateOut,
        });
      })
      .catch((err) => {
        if (err && err.response) {
        }
      });
  };
  getListRoomRent = () => {
    axios
      .get(`${URL}/room/listRoomRent`)
      .then((res) => {
        if (res.data) {
          let listRoomRent = res.data;
          this.setState({
            listRoomRent: listRoomRent,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  acceptChangeRoom =()=>{
    axios({
      method: "POST",
      url: `${URL}/room/changeRoom`,
      data: {
        idRentReceipt: this.state.idRentReceipt,
        idRoom:this.state.idRoomChange,
        idRoomCurrent:this.state.idRoomCurrent,
        price:this.state.price
      },
    }).then((result) => {
      const { message } = result.data;
      showNotification(STATUS.SUCCESS, message);
      this.onCloseModal();
      this.props.getListRoom();
      this.getListRoomRent();
      this.setState({
        idRoomCurrent: null
      });
    }).catch((err) => {
      if (err && err.response) {
        showNotification(STATUS.ERROR, "Change Room Fail!");
        this.onCloseModal();
        this.props.getListRoom();
        this.getListRoomRent();
      }
    });
  }
  componentDidMount = () => {
    this.props.getListRoom();
    this.getListRoomRent();
    this.getListTypeRoom();
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState(
      {
        visible: false,
      },
      ()=>{
        this.props.getListRoom();
        this.getListRoomRent();
      }
    );
  };
  onShowModal = () => {
    this.setState({
      visibleModal: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      visibleModal: false,
    });
  };

  handleSearch = (input) => {
    if (typeof input === "string") this.setState({ searchText: input });
    else this.setState({ searchText: input.target.value });
  };

  renderListRoom = (list, filter, searchText) => {
    if (searchText)
      list = list.filter(
        (room) =>
          room.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    if (!list) return { list: null, total: null };
    if (filter !== 0) list = list.filter((room) => room.status === filter);
    list = list.sort((a, b) => a.id - b.id);
    const rows = list.map((room) => (
      <Col key={room.id} style={{ padding: "15px" }} span={4}>
        <Square
          {...room}
          key={room.id}
          name={room.name.replace("Room ", "")}
          handleOnClick={() => {
            this.props.updateCheckInRoom(room);
            this.showDrawer();
          }}
        />
      </Col>
    ));
    return {
      list: <Row align="middle">{rows}</Row>,
      total: rows.length,
    };
  };

  handleOnChangeRadio = (e) => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };

  render() {
    const { filter, visible, searchText } = this.state;
    const { listRoom } = this.props;
    const { list, total } = this.renderListRoom(listRoom, filter, searchText);
    return (
      <>
        <div className="list-container">
          <Row className="filter-room" justify="space-between" align="middle">
            <Col>
              <Radio.Group
                onChange={this.handleOnChangeRadio}
                defaultValue={0}
                buttonStyle="solid"
              >
                <Radio.Button value={0}>All</Radio.Button>
                <Radio.Button value={STATUS.AVAILABLE}>Available</Radio.Button>
                <Radio.Button value={STATUS.RENT}>Rent</Radio.Button>
                <Radio.Button value={STATUS.RESERVED}>Reserved</Radio.Button>
                <Radio.Button value={STATUS.CLEANING}>Cleaning</Radio.Button>
              </Radio.Group>
            </Col>
            <Col flex={1} style={{ padding: "0 20px" }}>
              <Button onClick={this.onShowModal} type="primary">
                Change Room
              </Button>
              <div>
                <ModalChangeRoom
                  visibleModal={this.state.visibleModal}
                  valueForm={this.state.valueForm}
                  onCloseModal={this.onCloseModal}
                  handleOnChangeRoomCurrent={this.handleOnChangeRoomCurrent}
                  handleOnChangeSelectRoomChange={this.handleOnChangeSelectRoomChange}
                  acceptChangeRoom={this.acceptChangeRoom}
                  handleOnChangePrice={this.handleOnChangePrice}
                  nameTypeRoom={this.state.nameTypeRoom}
                  idRoomCurrent={this.state.idRoomCurrent}
                  price={this.state.price}
                  priceHour={this.state.priceHour}
                  listRoomRent={this.state.listRoomRent}
                  listTypeRoom={this.state.listTypeRoom}
                  listRoomByType={this.state.listRoomByType}
                ></ModalChangeRoom>
              </div>
            </Col>
            <Col flex={1} style={{ padding: "0 20px" }}>
              <Input.Search
                placeholder="Input search text"
                onSearch={this.handleSearch}
                onChange={this.handleSearch}
                enterButton
                allowClear
              />
            </Col>
            <Col style={{ minWidth: "60px" }}>
              <Typography.Text>Total: {total}</Typography.Text>
            </Col>
          </Row>

          <div className="list-room">{list}</div>
        </div>
        <RoomDrawer visible={visible} onClose={this.onClose} />
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
      dispatch(getListRoomAPI());
    },
    updateCheckInRoom: (room) => {
      dispatch(updateCheckInRoom(room));
    },
  };
};

const RoomListConnect = connect(mapStateToProps, mapDispatchToProps)(RoomList);

const RoomPage = createPage(RoomListConnect, HOME_PAGE);

export default RoomPage;
