<<<<<<< HEAD
import React, { Component } from 'react';
import Square from '../../components/Square';
import axios from 'axios';
import createPage from '../../components/createPage';
import { BOOKING_PAGE } from '../../components/Sidebar/constants';
const host = process.env.PUBLIC_URL + '/room';
class RoomList extends Component {
=======
import React, { Component } from "react";
import Square from "../../components/Square";
import { Row, Result } from "antd";
import axios from "axios";
const host = "http://localhost:8000/room";
export default class RoomPage extends Component {
>>>>>>> de0862d... fix room page
  constructor(props) {
    super(props);

    this.state = {
      listRoom: [],
    };
  }
  updateRoom() {
    axios.get(host).then((res) => {
      if (res) {
        this.setState({
          listRoom: res.data,
        });
      }
    });
  }
  renderListRoom = (list) => {
    const rows = list.map((room) =>
      React.createElement(Square, {
        ...room,
        key: room.id,
        name: room.name.replace("Phòng ", ""),
      })
    );
    return React.createElement(
      Row,
      { justify: "space-between", align: "middle" },
      rows
    );
  };
  componentDidMount() {
    this.updateRoom();
  }
  render() {
    const {listRoom}=this.state;
    return <div>{this.renderListRoom(listRoom)}</div>;
  }
}

const RoomPage = createPage(RoomList, BOOKING_PAGE);
export default RoomPage;
