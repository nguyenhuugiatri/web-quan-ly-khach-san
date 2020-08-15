import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import UserListPage from '../UserListPage';
import BookingPage from '../BookingPage';
import RoomPage from '../RoomPage';
import CustomerPage from '../CustomerPage';
import RoomListPage from '../RoomListPage';
import RoomTypeListPage from '../RoomTypeListPage';
import NotFoundPage from './../../components/NotFound';
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
    console.log('currentUser', currentUser);
    if (currentUser && currentUser.permission === 1)
      return (
        <Router>
          <RoomPage path='/' />
          <BookingPage path='/booking' />
          <UserListPage path='/users' />
          <CustomerPage path='/customer' />
          <RoomListPage path='/room' />
          <RoomTypeListPage path='/roomtype' />
          <NotFoundPage default />
        </Router>
      );
    else if (currentUser && currentUser.permission === 0) {
      return (
        <Router>
          <RoomPage path='/' />
          <BookingPage path='/booking' />
          <NotFoundPage default />
        </Router>
      );
    } else {
      return (
        <Router>
          <LoginPage default />
        </Router>
      );
    }
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
