import React, { Component } from 'react';
import FormCheckIn from './FormCheckIn';
import FormCheckOut from './FormCheckOut';
import CheckOutConfirm from './CheckOutConfirm';
import { Drawer, Button, Result } from 'antd';
import { STATUS } from './constants';
import { connect } from 'react-redux';
import { SmileOutlined, CalendarOutlined } from '@ant-design/icons';
import {
  updateCheckInCustomer,
  updateCheckInRoom,
  checkInAPI,
  getListCustomerTypeAPI,
  confirmCleaningAPI,
  createBillAPI,
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
    deleteCheckInCustomer();
    deleteCheckInRoom();
    onClose();
  };

  handleConfirmCleaning = async () => {
    const { checkInRoom } = this.props;
    await confirmCleaningAPI(checkInRoom.id);
    this.handleClose();
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

  handleConfirmCheckOut = async (checkInRoom) => {
    const { currentUser } = this.props;
    await createBillAPI(checkInRoom, currentUser);
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

  checkEmpty = (input) => {
    if (input) return input.length === 0;
    return true;
  };

  checkAllowCheckIn = (input) => {
    return input.some((e) => this.checkEmpty(e));
  };

  render() {
    const { visible, checkInRoom, checkInCustomer, currentUser } = this.props;
    const { name, idNumber, idType, phone } = checkInCustomer;
    const { date, price } = checkInRoom;
    const allowCheckIn = this.checkAllowCheckIn([
      name,
      idNumber,
      idType,
      phone,
      date,
      price,
    ]);
    const { status } = checkInRoom;
    return (
      <Drawer
        title={
          status === RENT
            ? 'CHECK OUT'
            : status === CLEANING
            ? 'CONFIRM CLEANING'
            : status === AVAILABLE
            ? 'CHECK IN'
            : 'RESERVED'
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
              <Button
                onClick={this.handleCheckInClicked}
                type='primary'
                disabled={allowCheckIn}
              >
                Check in
              </Button>
            ) : status === RESERVED ? (
              <>,</>
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
              <Button onClick={this.handleConfirmCleaning} type='primary'>
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
                currentUser={currentUser}
                checkInRoom={checkInRoom}
                modalData={this.state}
                handleConfirmCheckOut={this.handleConfirmCheckOut}
                handleCancel={this.handleCancel}
              />
            </>
          )) ||
          (status === RESERVED && (
            <Result
              icon={<CalendarOutlined />}
              title='Room has been reserved !'
              extra={
                <Button onClick={this.handleClose} type='primary'>
                  Confirm
                </Button>
              }
            />
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
    // createBill: (checkOutRoom, currentUser) => {
    //   dispatch(createBillAPI(checkOutRoom, currentUser));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDrawer);
