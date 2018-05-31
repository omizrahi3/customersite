import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Dropdown, List, Image } from "semantic-ui-react";
import Pagination from 'semantic-ui-react-button-pagination';
import TalentLinkCard from '../cards/TalentLinkCard';

class TalentSearch extends React.Component {
  state = {
    keys: [],
    talents: {},
    resultsPerPage: 15,
    TotalCount: 0,
    offset: 0
  };

  GetAppTalentByCategoryWeb = (offset) => {
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post(this.props.endpoint, 
      {
        CategoryId: this.props.CategoryId,
        ResultNumberBegin: offset,
        ResultNumberEnd: this.state.resultsPerPage
      }
    )
    .then(res => res.data.Response)
    .then(searchResults => {
      const { LandingData, TotalCount } = searchResults;
      const keys = [];
      const talentsHash = {};
      LandingData.forEach(talent => {
        talent.ProfilePictureReference = "/images/man.png";
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      this.setState({ keys, talents: talentsHash, TotalCount, offset });
    })
  }

  componentDidMount() {
    console.log('TalentSearch did mount');
    console.log(this.props);

    this.GetAppTalentByCategoryWeb(0);
  }

  renderTalents = keys => keys.map(key => {
    const hashedTalent = this.state.talents[key];
    return  <TalentLinkCard
              key={key}
              TalentId={hashedTalent.TalentId}
              FirstName={hashedTalent.FirstName}
              LastName={hashedTalent.LastName}
              KnownFor={hashedTalent.KnownFor}
              ProfilePictureReference={hashedTalent.ProfilePictureReference}
            />
  })

  handleClick = offset => {
    this.GetAppTalentByCategoryWeb(offset);
  }

  render() {
    const { CategoryId } = this.props;
    return (
      <div>
        <Pagination
          offset={this.state.offset}
          limit={this.state.resultsPerPage}
          total={this.state.TotalCount}
          onClick={(e, props, offset) => this.handleClick(offset)}
        />
        {this.state.keys.length > 0 && (
          <div>
            <h1>{`CategoryId: ${CategoryId}`}</h1>
            {this.renderTalents(this.state.keys)}
          </div>
        )}
      </div>
    );
  }
}

TalentSearch.propTypes = {
  onTalentSelect: PropTypes.func.isRequired,
  CategoryId: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(TalentSearch);
