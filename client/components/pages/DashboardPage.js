import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allTalentSelector } from "../../reducers/talent";
import AddFildAndTvCard from '../cards/AddFilmAndTvCard';

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log(props);

  render() {
    
    return (
      <div>
        <AddFildAndTvCard />
      </div>
    );
  }
}

DashboardPage.propTypes = {

};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DashboardPage);