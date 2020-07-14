import React, { Component } from "react";
import { Card } from "antd";
export default class Square extends Component {
  render() {
    const { id } = this.props;
    console.log(id);
    return (
      <Card
        title={id}
        style={{ width: 250 }}
        headStyle={{ textAlign: "center", fontSize: "1.3rem" }}
      ></Card>
    );
  }
}
