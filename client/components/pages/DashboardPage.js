import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allTalentSelector } from "../../reducers/talent";
import AddFildAndTvCard from '../cards/AddFilmAndTvCard';

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log(props);

  render() {
    const { talent } = this.props;
    return (
      <div>
        <AddFildAndTvCard />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  talent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    talent: allTalentSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);