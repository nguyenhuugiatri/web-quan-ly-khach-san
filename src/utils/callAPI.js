import axios from 'axios';
const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (user && user.token)
  axios.defaults.headers.common = { Authorization: `bearer ${user.token}` };
export default axios;
