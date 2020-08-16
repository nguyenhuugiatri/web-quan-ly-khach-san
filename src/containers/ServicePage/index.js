import React, { Component } from 'react';
import { connect } from 'react-redux';
import createPage from '../../components/createPage';
import { SERVICE_PAGE } from '../../components/Sidebar/constants';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalAddService from './ModalAddService';
import TableService from './TableService';
import {
  addServiceAPI,
  getListAPI,
  deleteServiceAPI,
  editServiceAPI,
} from './actions';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.getList();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleAddClicked = (values) => {
    this.props.addService(values);
    this.setState({ visible: false });
  };

  handleDeleteClicked = (service) => {
    this.props.deleteService(service);
  };

  handleCancelClicked = () => {
    this.setState({ visible: false });
  };

  handleEditClicked = (values) => {
    this.props.editService(values);
  };

  render() {
    return (
      <div>
        <div className='header-table'>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={this.showModal}
          >
            Add New Service
          </Button>
        </div>
        <div>
          <ModalAddService
            {...this.state}
            handleAddClicked={this.handleAddClicked}
            handleCancelClicked={this.handleCancelClicked}
          />
        </div>
        <div>
          <TableService
            handleDeleteClicked={this.handleDeleteClicked}
            handleEditClicked={this.handleEditClicked}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addService: (service) => {
      dispatch(addServiceAPI(service));
    },
    deleteService: (service) => {
      dispatch(deleteServiceAPI(service));
    },
    editService: (service) => {
      dispatch(editServiceAPI(service));
    },
    getList: () => {
      dispatch(getListAPI());
    },
  };
};

const ServiceConnect = connect(mapStateToProps, mapDispatchToProps)(Service);
const ServicePage = createPage(ServiceConnect, SERVICE_PAGE);
export default ServicePage;
