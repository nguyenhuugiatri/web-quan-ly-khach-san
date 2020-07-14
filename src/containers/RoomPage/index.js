import React, { Component } from 'react';
import Square from '../../components/Square';
import axios from 'axios';
import createPage from '../../components/createPage';
import { BOOKING_PAGE } from '../../components/Sidebar/constants';
const host = process.env.PUBLIC_URL + '/room';
class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listRoom: [],
    };
  }
  updateRoom() {
    axios.get(host).then((res) => {
      console.log(res);
    });
  }
  render() {
    return <Square id={1}></Square>;
  }
}

const RoomPage = createPage(RoomList, BOOKING_PAGE);
export default RoomPage;
