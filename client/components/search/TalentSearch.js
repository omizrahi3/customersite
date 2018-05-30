import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Dropdown, List, Image } from "semantic-ui-react";
import TalentLinkCard from '../cards/TalentLinkCard';

class TalentSearch extends React.Component {
  state = {
    keys: [],
    talents: {},
    paginationIndex: 0,
    paginationTotal: 10,
    resultsCount: 0
  };

  componentDidMount() {
    console.log('TalentSearch did mount');
    console.log(this.props);

    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post(this.props.endpoint, 
      {
        CategoryId: this.props.CategoryId,
        ResultNumberBegin: this.state.paginationIndex,
        paginationTotal: this.state.paginationTotal
      }
    )
    .then(res => res.data.Response)
    .then(res => {
      const { LandingData } = res;
      this.setState({ numResults: res.resultsCount });
      return LandingData;
    })
    .then(talents => {
      const keys = [];
      const talentsHash = {};
      talents.forEach(talent => {
        talent.ProfilePictureReference = "/images/man.png";
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      window.keys = keys;
      window.talentsHash = talentsHash;
      this.setState({ keys, talents: talentsHash });
    })
  }

  renderTalents(keys) {
    return keys.map(key => {
      const hashedTalent = this.state.talents[key];
      return <TalentLinkCard key={key}
                TalentId={hashedTalent.TalentId}
                FirstName={hashedTalent.FirstName}
                LastName={hashedTalent.LastName}
                KnownFor={hashedTalent.KnownFor}
                ProfilePictureReference={hashedTalent.ProfilePictureReference} />
    });
  }

  renderTalents2(options) {
    return options.map(talent => {
      const { key } = talent;
      const hashedTalent = this.state.talents[key];
      return <List.Item key={key}>
        <Image avatar src={hashedTalent.ProfilePictureReference} />
        <List.Content>
          <List.Header>{`${hashedTalent.FirstName} ${hashedTalent.LastName}`}</List.Header>
          {`${hashedTalent.KnownFor}`}
        </List.Content>
      </List.Item>
    });
  }

  render() {
    const { CategoryId } = this.props;
    return (
      <div>
        {this.state.keys.length > 0 && (
          <div>
            <h1>{CategoryId}</h1>
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
