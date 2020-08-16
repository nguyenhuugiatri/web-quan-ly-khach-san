import React, { Component } from "react";
import { Row,Col,DatePicker,Button, message, Pagination } from "antd";
import moment from "moment";
import { UserAddOutlined } from "@ant-design/icons";
import createPage from "../../components/createPage";
import axios from "axios";
import "antd/dist/antd.css";
import { BOOKING_PAGE } from "../../components/Sidebar/constants";
import BookDrawer from "./BookDrawer";
import TableBooking from "./TableBooking";
import showNotification from '../../utils/showNotification';
import { STATUS } from '../../utils/constants';
import { connect } from 'react-redux';
const URL = process.env.SERV_HOST || "http://localhost:8000";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleAccept:false,
      listCustomerType: [],
      listRoomByType: [],
      listTypeRoom: [],
      listBooking:[],
      array:[],
      dateTime: [],
      idRoom: "",
      idTypeRoom: "",
      typeRoom: "",
      priceRoom: "",
      valueForm: React.createRef(),
    };
  }

  handleOnChangeDateTime = (value) => {
    const dateIn = moment(value[0]).format("YYYY-MM-DD hh:mm");
    const dateOut = moment(value[1]).format("YYYY-MM-DD hh:mm");
    this.setState({
      dateTime: [dateIn, dateOut],
    });
  };
  handleOnClose = () => {
    this.setState({ visible: false });
  };
  handleOnChangePrice=(value)=>{
    this.setState({
      priceRoom:value
    });
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
  handleOnChangeSelectTypeRoom = (value) => {
    this.setState(
      {
        idTypeRoom: value,
      },
      () => {
        this.getListRoomByType();
      }
    );
  };
  getListRoomByType = () => {
    axios({
      method: "POST",
      url: `${URL}/room/listRoomByType`,
      data: {
        id: this.state.idTypeRoom,
        dateIn: this.state.dateTime[0],
        dateOut: this.state.dateTime[1],
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
  handleOnChangeSelectCusType = (value) => {
    this.setState({
      idTypeRoom: value,
    });
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
  showListBooking = () => {
    console.log("aaa", "1" + this.state.array[0] + "1", this.state.array[1]);
    if (this.state.array[0]) {
      const dateFrom = moment(this.state.array[0]).format("YYYY-MM-DD");
      const dateTo = moment(this.state.array[1]).format("YYYY-MM-DD");
      axios({
        method: "POST",
        url: `${URL}/booking/listBookingFilter`,
        data: {
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
      })
        .then((result) => {
          const { listBooking } = result.data;
          console.log("data", listBooking);
          for (let i=0;i<listBooking.length;i++){
            listBooking[i].key=listBooking[i].id;
            listBooking[i].dateIn=moment(listBooking[i].dateIn).format("YYYY-MM-DD HH:mm");
            listBooking[i].dateOut=moment(listBooking[i].dateOut).format("YYYY-MM-DD HH:mm");
           }
          this.setState({
            listBooking: listBooking,
          });
        })
        .catch((err) => {
          if (err && err.response) {
          }
        });
    }
    else{
      this.getListBooking();
    }
  };
  getListBooking = () => {
    axios
      .get(`${URL}/booking/listBooking`)
      .then((res) => {
        if (res.data) {
           let listBooking  = res.data;
           for (let i=0;i<listBooking.length;i++){
            listBooking[i].key=listBooking[i].id;
            listBooking[i].dateIn=moment(listBooking[i].dateIn).format("YYYY-MM-DD HH:mm");
            listBooking[i].dateOut=moment(listBooking[i].dateOut).format("YYYY-MM-DD HH:mm");
           }
          this.setState({
            listBooking: listBooking,
            array: []
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
  getNameTypeAndPrice = () => {
    axios({
      method: "POST",
      url: `${URL}/room/roomCurrent`,
      data: {
        id: this.state.idRoom,
      },
    })
      .then((result) => {
        let data = result.data;
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
    this.getListTypeRoom();
    this.getListBooking();
  }
  deleteBooking = (record) => {
    return ()=>{
      axios({
        method: "POST",
        url: `${URL}/booking/deleteBooking`,
        data: {
          data: record,
          currentUser:this.props.currentUser,
        }
      }).then((result) => {
        const { message } = result.data;
        showNotification(STATUS.SUCCESS, message);
        this.getListBooking();
      }).catch((err) => {
        if (err && err.response) {
          showNotification(STATUS.ERROR, message);
          this.getListBooking();
        }
      });
    }
  };
  checkInRoomBooked = (record) => {
    return ()=>{
      let dateBook = moment(record.dateIn,'YYYY-MM-DD');
    let dateCurrent = moment(moment(),'YYYY-MM-DD');
    if (dateBook.diff(dateCurrent,'days')==0){
      axios({
        method: "POST",
        url: `${URL}/booking/checkinbooked`,
        data: {
          data: record,
          currentUser:this.props.currentUser,
        }
      }).then((result) => {
        const { message } = result.data;
        showNotification(STATUS.SUCCESS, message);
        this.getListBooking();
      }).catch((err) => {
        if (err && err.response) {
          showNotification(STATUS.ERROR, message);
          this.getListBooking();
        }
      });
    }
    else{
      showNotification(STATUS.ERROR, "Today isn't date to check-in");
    }
      
    }
  };
  handleOnChangeDateTimeFilter = (value) => {
    try {
      this.setState({
        array: [value[0], value[1]],
      });
    } catch (err) {}
  };
  submitBooking = () => {
    var data = this.state.valueForm.current.getFieldsValue();
    let customerBook = {
      idNumber: data.idNumber,
      name: data.cusName,
      idType: data.idCusType,
      phone: data.phone,
    };
    let roomBook = {
      idRoom: this.state.idRoom,
      idTypeRoom: this.state.idTypeRoom,
      price: this.state.priceRoom,
      date: data.dateTime,
    };
    let dataSend = {
      bookCustomer: customerBook,
      bookRoom: roomBook,
    };
    axios({
      method: "POST",
      url: `${URL}/booking/bookRoom`,
      data: dataSend,
    }).then((result) => {
      this.state.valueForm.current.resetFields();
      this.setState({
        priceRoom:'',
      });
      const { message } = result.data;
      showNotification(STATUS.SUCCESS, message);
      this.handleOnClose();
      this.getListBooking();
    }).catch((err) => {
      if (err && err.response) {
        showNotification(STATUS.ERROR, err.response.data.message);
        this.handleOnClose();
        this.getListBooking();
      }
    });
  };
  render() {
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
            Add New Booking
          </Button>
          <BookDrawer
            dataForm={this.state}
            handleOnChangeSelectCusType={this.handleOnChangeSelectCusType}
            handleOnClose={this.handleOnClose}
            submitBooking={this.submitBooking}
            handleOnChangePrice={this.handleOnChangePrice}
            handleOnChangeSelectTypeRoom={this.handleOnChangeSelectTypeRoom}
            handleOnChangeDateTime={this.handleOnChangeDateTime}
            handleOnChangeSelectRoom={this.handleOnChangeSelectRoom}
          ></BookDrawer>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <DatePicker.RangePicker
              style={{ width: "100%" }}
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              showTime
              value={this.state.array}
              allowClear={false}
              format="YYYY/MM/DD "
              onChange={this.handleOnChangeDateTimeFilter}
            />
          </Col>
          <Col span={16}>
            <Button onClick={this.getListBooking} type="primary">
              Clear
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
               onClick={this.showListBooking}
              type="primary"
            >
              Filter
            </Button>
          </Col>
        </Row>
        <TableBooking visibleAccept={this.state.visibleAccept} listBooking={this.state.listBooking} checkInRoomBooked={this.checkInRoomBooked} deleteBooking={this.deleteBooking}></TableBooking>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.global.currentUser,
  };
};

const BookingConnectRedux=connect(mapStateToProps,null)(Booking)

const BookingPage = createPage(BookingConnectRedux, BOOKING_PAGE);
export default BookingPage;
