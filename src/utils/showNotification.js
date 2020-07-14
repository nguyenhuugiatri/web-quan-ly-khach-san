import { STATUS } from './constants';
import { notification } from 'antd';

const showNotification = (
  type = STATUS.SUCCESS,
  message,
  description,
  placement
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

export default showNotification;
