import React, { Component } from 'react';
import { ROOM_LIST_PAGE } from '../../components/Sidebar/constants';
import createPage from '../../components/createPage';
import { Button, Space, Pagination, } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { getListRoomAPI, updateVisible,cancelEdit } from './actions';
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
      pageSize:11
    };
  }
  componentDidMount() {
    this.props.getListRoom();
  }
  render() {
    return (
      <div>
        <div className="header-table">
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
              defaultPageSize={this.state.pageSize}
              pageSizeOptions={[10,11]}
              current={this.state.currentPage}
              total={this.props.total || this.props.tableListRoom.length}
              onChange={(pageNumber,pageSize) => {
                this.setState({
                  currentPage: pageNumber,
                  pageSize:pageSize
                });
                this.props.cancelEditing()
              }}
            />
        </div>

        <div>
          {this.props.visible?<ModalAddRoom />:''}
        </div>
        <div>
          <TableRoom
            dataSource={this.props.tableListRoom}
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
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
    cancelEditing:()=>{
      dispatch(cancelEdit())
    }
  };
};
const RoomListPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomListPage);
const roomListPage = createPage(RoomListPageConnect, ROOM_LIST_PAGE);
export default roomListPage;
