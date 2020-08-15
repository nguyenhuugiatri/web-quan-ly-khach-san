import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import UserListPage from '../UserListPage';
import BookingPage from '../BookingPage';
import RoomPage from '../RoomPage';
import CustomerPage from '../CustomerPage';
import RoomListPage from '../RoomListPage'
import RoomTypeListPage from '../RoomTypeListPage'
import BillPage from '../BillPage'
import { Router } from '@reach/router';
import { connect } from 'react-redux';
import { updateCurrentUser } from './actions';

class App extends Component {
  componentDidMount = () => {
    const { updateCurrentUser } = this.props;
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) updateCurrentUser(user.user);
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser)
      return (
        <Router>
          <RoomPage path='/' />
          <UserListPage path='/users' />
          <BookingPage  path='/booking' />
          <CustomerPage path='/customer' />
          <RoomListPage path='/room' />
          <RoomTypeListPage path='/roomtype' />
          <BillPage path='/listbill' />
        </Router>
      );
    else
      return (
        <Router>
          <LoginPage default />
        </Router>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.global.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (user) => {
      dispatch(updateCurrentUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
