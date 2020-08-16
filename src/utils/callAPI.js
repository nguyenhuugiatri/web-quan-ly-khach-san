import axios from 'axios';
const token = JSON.parse(localStorage.getItem('loggedInUser')).token;
axios.defaults.headers.common = { Authorization: `bearer ${token}` };
export default axios;
