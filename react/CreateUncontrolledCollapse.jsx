import React, { Component } from "react";
import { Collapse, Card } from "reactstrap";

const createUncontrolledCollapse = (Toggler) =>
  class UncontrolledCollapse extends Component {
    state = {
      isOpen: false,
    };

    toggle = () => {
      this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    };

    render() {
      return (
        <Card
          style={{ cursor: "pointer" }}
          className="mb-1 p-3 align-items-left card-box-hover-rise"
        >
          <Toggler onClick={this.toggle} />
          <div className="divider mb-1" />
          <Collapse isOpen={this.state.isOpen} {...this.props} />
        </Card>
      );
    }
  };

export default createUncontrolledCollapse;
