import React, { Component } from 'react';
import FormCheckIn from './FormCheckIn';
import FormCheckOut from './FormCheckOut';
import CheckOutConfirm from './CheckOutConfirm';
import { Drawer, Button, Result } from 'antd';
import { STATUS } from './constants';
import { connect } from 'react-redux';
import {
  updateCheckInCustomer,
  updateCheckInRoom,
  checkInAPI,
  getListCustomerTypeAPI,
} from './actions';
import './styles.scss';

const { AVAILABLE, RENT, CLEANING, RESERVED } = STATUS;

class RoomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleClose = () => {
    const { onClose, deleteCheckInCustomer, deleteCheckInRoom } = this.props;
    onClose();
    deleteCheckInCustomer();
    deleteCheckInRoom();
  };

  handleCheckInClicked = async () => {
    const { checkInCustomer, checkInRoom, currentUser } = this.props;
    await checkInAPI({
      checkInCustomer,
      checkInRoom,
      currentUser,
    });
    this.handleClose();
  };

  handleCheckOutClicked = () => {
    this.showModal();
  };

  componentDidMount = () => {
    this.props.getListCustomerType();
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState(
      {
        visible: false,
      },
      this.handleClose()
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, checkInRoom } = this.props;
    const { status } = checkInRoom;
    return (
      <Drawer
        title={
          status === RENT
            ? 'CHECK OUT'
            : status === CLEANING
            ? 'CONFIRM CLEANING'
            : 'CHECK IN'
        }
        width={720}
        onClose={this.handleClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={this.handleClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            {status === RENT ? (
              <Button onClick={this.handleCheckOutClicked} type='primary'>
                Check out
              </Button>
            ) : status === AVAILABLE ? (
              <Button onClick={this.handleCheckInClicked} type='primary'>
                Check in
              </Button>
            ) : status === RESERVED ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        }
      >
        {(status === CLEANING && (
          <Result
            status='404'
            title='Did you confirm the room been cleaned ?'
            subTitle='Click confirm to change room status'
            extra={
              <Button onClick={this.handleClose} type='primary'>
                Confirm
              </Button>
            }
          />
        )) ||
          (status === AVAILABLE && <FormCheckIn />) ||
          (status === RENT && (
            <>
              <FormCheckOut />
              <CheckOutConfirm
                modalData={this.state}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
              />
            </>
          ))}
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkInRoom: state.room.checkInRoom,
    checkInCustomer: state.room.checkInCustomer,
    currentUser: state.global.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCheckInCustomer: () => {
      dispatch(updateCheckInCustomer({}));
    },
    deleteCheckInRoom: () => {
      dispatch(updateCheckInRoom({}));
    },
    getListCustomerType: () => {
      dispatch(getListCustomerTypeAPI());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDrawer);
