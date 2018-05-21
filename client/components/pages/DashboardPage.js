import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
  render() {
    return (
      <h1>
        Welcome to the dashboard
      </h1>
    );
  }
}

DashboardPage.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(DashboardPage);