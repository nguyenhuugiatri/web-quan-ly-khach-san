import React, { Component } from "react";
import { Button, message, Pagination } from "antd";
import moment from "moment";
import { UserAddOutlined } from "@ant-design/icons";
import createPage from "../../components/createPage";
import axios from "axios";
import "antd/dist/antd.css";
import { BILL_PAGE } from "../../components/Sidebar/constants";


const URL = process.env.SERV_HOST || "http://localhost:8000";
class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listCustomer:[],
        };
      };
    render() {
        return (
            <div>
                
            </div>
        )
    }
    
}
const BillPage = createPage(Bill, BILL_PAGE);
export default BillPage;
