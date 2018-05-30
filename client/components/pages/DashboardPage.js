import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allTalentsSelector } from "../../reducers/talents";
import AddFildAndTvCard from '../cards/AddFilmAndTvCard';
import AddTalentCard from '../cards/AddTalentCard';

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log('dashboard did mount');

  render() {
    const { talents } = this.props;
    return (
      <div>
        <AddTalentCard title={'Film and Television'} endpoint={'/talent/film-and-tv'} />
        <AddTalentCard title={'Music'} endpoint={'/search/music'} />
        <AddTalentCard title={'Sports'} endpoint={'/search/sports'} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  talents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    talents: allTalentsSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);