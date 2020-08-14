import React, { Component } from 'react';
import { ROOM_LIST_PAGE } from '../../components/Sidebar/constants';
import createPage from '../../components/createPage';
import { Button, Space, Pagination, } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { getListRoomAPI, updateVisible } from './actions';
import { connect } from 'react-redux';
import TableRoom from '../../components/TableRoom';
import './style.scss';
import ModalAddRoom from './ModalAddRoom';
class RoomListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      isediting: '',
    };
  }
  componentDidMount() {
    this.props.getListRoom();
  }
  render() {
    return (
      <div>
        <div className="header-table">
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => {
                this.props.updateVisible();
              }}
            >
              Add room
            </Button>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={11}
              current={this.state.currentPage}
              total={this.props.total || this.props.tableListRoom.length}
              onChange={(pageNumber) => {
                this.setState({
                  currentPage: pageNumber,
                });
              }}
            />
          </Space>
        </div>

        <div>
          {this.props.visible?<ModalAddRoom />:''}
        </div>
        <div>
          <TableRoom
            dataSource={this.props.tableListRoom}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tableListRoom: state.roomTableList.listRoom,
  total: state.roomTableList.total,
  visible: state.roomTableList.visible
});
const mapDispatchToProps = (dispatch) => {
  return {
    getListRoom: () => {
      dispatch(getListRoomAPI());
    },
    updateVisible: () => {
      dispatch(updateVisible());
    },
  };
};
const RoomListPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomListPage);
const roomListPage = createPage(RoomListPageConnect, ROOM_LIST_PAGE);
export default roomListPage;
