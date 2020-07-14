import React, { Component } from "react";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./styles.scss";

export default class Square extends Component {
  stringStatus(status) {
    switch (status) {
      case 0:
        return "Vacant";
      case 1:
        return "Cleaning in progress";
      case 2:
        return "Hour";
      case 3:
        return "Day";
      case 4:
        return "Night";
      default:
        return "Unknown";
    }
  }
  render() {
    const { id, name, max_persons, status } = this.props;
    let type;
    if (max_persons % 2 >= 1) {
      type = "Twin";
    } else {
      type = "Single";
    }
    return (
      <div className="room-card" data-id={id}>
        <div className="status-line">
          <span></span>
          <p>{this.stringStatus(status)}</p>
          <div className="room-type">{type}</div>
        </div>
        <div className="room-number">{name}</div>
        <div className="room-card-footer">
          <SettingOutlined key="setting" />
          <EditOutlined key="edit" />
          <EllipsisOutlined key="ellipsis" />
        </div>
      </div>
    );
  }
}
