import React, { Component } from 'react';
import Square from '../../components/Square';
import createPage from '../../components/createPage';
import { BOOKING_PAGE } from '../../components/Sidebar/constants';
import { Row, Col, Radio, Typography } from 'antd';
import { connect } from 'react-redux';
import { gerListRoomAPI } from './actions';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
    };
  }

  componentDidMount = () => {
    this.props.getListRoom();
  };

  renderListRoom = (list, filter) => {
    if (!list) return { list: null, total: null };
    if (filter !== null) list = list.filter((room) => room.status === filter);
    const rows = list.map((room) => (
      <Col key={room.id} style={{ padding: '15px' }} span={4}>
        <Square
          {...room}
          key={room.id}
          name={room.name.replace('Phòng ', '')}
        />
      </Col>
    ));
    return { list: <Row align='middle'>{rows}</Row>, total: rows.length };
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
          justify='space-between'
          align='middle'
          style={{ marginBottom: '15px' }}
        >
          <Radio.Group
            onChange={this.handleOnChangeRadio}
            defaultValue={null}
            buttonStyle='solid'
          >
            <Radio.Button value={null}>All</Radio.Button>
            <Radio.Button value={0}>Available</Radio.Button>
            <Radio.Button value={1}>Rent</Radio.Button>
            <Radio.Button value={2}>Reserved</Radio.Button>
            <Radio.Button value={3}>Cleaning</Radio.Button>
          </Radio.Group>
          <Col style={{ minWidth: '60px' }}>
            <Typography.Text>Total: {total}</Typography.Text>
          </Col>
        </Row>
        {list}
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
