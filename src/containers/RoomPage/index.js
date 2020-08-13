import React, { Component } from 'react';
import createPage from '../../components/createPage';
import { BOOKING_PAGE } from '../../components/Sidebar/constants';
import { connect } from 'react-redux';
import { getListRoomAPI, updateCheckInRoom } from './actions';  
import Square from '../../components/Square';
import { Col, Row, Radio, Typography } from 'antd';
import RoomDrawer from './RoomDrawer.js';
import { STATUS } from './constants';
import './styles.scss';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      visible: false,
    };
  }

  componentDidMount = () => {
    this.props.getListRoom();
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
      this.props.getListRoom()
    );
  };

  renderListRoom = (list, filter) => {
    if (!list) return { list: null, total: null };
    if (filter !== 0) list = list.filter((room) => room.status === filter);
    list = list.sort((a, b) => a.id - b.id);

    const rows = list.map((room) => (
      <Col key={room.id} style={{ padding: '15px' }} span={4}>
        <Square
          {...room}
          key={room.id}
          name={room.name.replace('Room ', '')}
          handleOnClick={() => {
            this.props.updateCheckInRoom(room);
            this.showDrawer();
          }}
        />
      </Col>
    ));
    return {
      list: <Row align='middle'>{rows}</Row>,
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
    const { filter, visible } = this.state;
    const { listRoom } = this.props;
    const { list, total } = this.renderListRoom(listRoom, filter);
    return (
      <>
        <div className='list-container'>
          <Row className='filter-room' justify='space-between' align='middle'>
            <Radio.Group
              onChange={this.handleOnChangeRadio}
              defaultValue={0}
              buttonStyle='solid'
            >
              <Radio.Button value={0}>All</Radio.Button>
              <Radio.Button value={STATUS.AVAILABLE}>Available</Radio.Button>
              <Radio.Button value={STATUS.RENT}>Rent</Radio.Button>
              <Radio.Button value={STATUS.RESERVED}>Reserved</Radio.Button>
              <Radio.Button value={STATUS.CLEANING}>Cleaning</Radio.Button>
            </Radio.Group>
            <Col style={{ minWidth: '60px' }}>
              <Typography.Text>Total: {total}</Typography.Text>
            </Col>
          </Row>

          <div className='list-room'>{list}</div>
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

const RoomPage = createPage(RoomListConnect, BOOKING_PAGE);

export default RoomPage;
