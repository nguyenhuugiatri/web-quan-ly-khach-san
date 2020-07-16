import React, { Component } from 'react';
import FormCheckIn from './FormCheckIn';
import { Drawer, Button, Result } from 'antd';
import { STATUS } from './constants';
import { connect } from 'react-redux';
import {
  updateCheckInCustomer,
  updateCheckInRoom,
  checkInAPI,
} from './actions';
import './styles.scss';

const { AVAILABLE, RENT, CLEANING } = STATUS;

class RoomDrawer extends Component {
  handleOnCheckIn = (values) => {
    console.log(values);
  };

  handleClose = () => {
    const { onClose, deleteCheckInCustomer, deleteCheckInRoom } = this.props;
    onClose();
    deleteCheckInCustomer();
    deleteCheckInRoom();
  };

  render() {
    const { visible, checkInRoom, checkInCustomer,currentUser } = this.props;
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
            {status !== CLEANING && (
              <Button
                onClick={checkInAPI({ checkInCustomer, checkInRoom,currentUser })}
                type='primary'
              >
                {status === RENT ? 'Check out' : 'Check in'}
              </Button>
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
          (status === AVAILABLE && <FormCheckIn />) || <div>cc</div>}
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkInRoom: state.room.checkInRoom,
    checkInCustomer: state.room.checkInCustomer,
    currentUser:state.global.currentUser,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDrawer);
