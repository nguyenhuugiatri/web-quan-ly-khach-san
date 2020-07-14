import React from 'react';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import Users from './containers/Users';
import CheckIn from './containers/CheckIn';
function App() {
  return (
    <>
      <LoginPage />
      <HomePage />
      <Users />
      <CheckIn />
    </>
  );
}

export default App;
