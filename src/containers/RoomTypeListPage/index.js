import React, { Component } from 'react';
import { connect } from 'react-redux';
import createPage from '../../components/createPage';
import { ROOM_TYPE_LIST_PAGE } from '../../components/Sidebar/constants';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableType from './TableType'
import ModalType from './ModalType';
import {updateVisible} from './actions'
class RoomType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultPageSize:10,
      currentPage:1
    };
  }

  render() {
    return (
      <div>
        <div className="header-table">
          <Button icon={<PlusOutlined />} type="primary" onClick={this.props.updateVisible}>
            Add type
          </Button>
          <Pagination defaultCurrent={1} defaultPageSize={this.state.defaultPageSize} total={this.props.total} pageSizeOptions={[5,10]} onChange={(pageNumber,pageSize)=>{
            this.setState({defaultPageSize:pageSize,currentPage:pageNumber})
          }}/> 
        </div>
        <div>
          <ModalType/>
        </div>
        <div>
            <TableType pageSize={this.state.defaultPageSize} currentPage={this.state.currentPage}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total:state.roomType.total,
  visible:state.roomType.visible
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateVisible:()=>{
      dispatch(updateVisible())
    }
  };
};

const RoomListTypePageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomType);
const RoomTypePage = createPage(RoomListTypePageConnect, ROOM_TYPE_LIST_PAGE);
export default RoomTypePage;
