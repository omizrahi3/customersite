import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Dropdown, List, Image, Input, Grid, Button, Icon, Card } from "semantic-ui-react";
import Pagination from 'semantic-ui-react-button-pagination';
import TalentLinkCard from '../cards/TalentLinkCard';

class TalentSearch extends React.Component {
  state = {
    keys: [],
    talents: {},
    resultsPerPage: 15,
    TotalCount: 0,
    offset: 0,
    searchQuery: ''
  };

  componentDidMount() {
    console.log('TalentSearch did mount');
    const apiUrl = 'http://www.qa.getchatwith.com/home/GetAppTalentByCategoryWeb';
    const requestBody = {
      CategoryId: this.props.CategoryId,
      ResultNumberBegin: 0,
      ResultNumberEnd: this.state.resultsPerPage
    }
    this.apiCall(apiUrl, requestBody, 0);
  }

  apiCall = (apiUrl, requestBody, offset) => {
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post(apiUrl, requestBody)
    .then(res => res.data.Response)
    .then(searchResults => {
      const { LandingData, TotalCount } = searchResults;
      const keys = [];
      const talentsHash = {};
      LandingData.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      this.setState({ keys, talents: talentsHash, TotalCount, offset });
    })
  }

  renderTalents = keys => keys.map(key => {
    const hashedTalent = this.state.talents[key];
    if (hashedTalent.KnownFor === 0) {
      hashedTalent.KnownFor = "";
    }
    return  (
        <TalentLinkCard
          key={key}
          previousPage={this.props.currentPage}
          TalentId={hashedTalent.TalentId}
          FirstName={hashedTalent.FirstName}
          LastName={hashedTalent.LastName}
          KnownFor={hashedTalent.KnownFor}
          ProfilePictureReference={hashedTalent.ProfilePictureReference}
        />
      )
  })

  handleClick = offset => {
    let apiUrl;
    let requestBody;
    if (this.state.searchQuery) {
      console.log('GetAppTalentBySearch');
      const name = this.state.searchQuery.split(' ');
      apiUrl = 'http://www.qa.getchatwith.com/api/GetAppTalentBySearch';
      requestBody = {
        CategoryId: this.props.CategoryId,
        FirstName: name[0],
        LastName: name[1],
        ResultNumberBegin: offset,
        ResultNumberEnd: this.state.resultsPerPage
      }
    } else {
      console.log('GetAppTalentByCategoryWeb');
      apiUrl = 'http://www.qa.getchatwith.com/home/GetAppTalentByCategoryWeb';
      requestBody = {
        CategoryId: this.props.CategoryId,
        ResultNumberBegin: offset,
        ResultNumberEnd: this.state.resultsPerPage
      }
    }
    this.apiCall(apiUrl, requestBody, offset);
  }
  
  onChange = (e, data) => {
    this.setState({searchQuery: data.value})
  }

  onSubmit = (e, data) => {
    let apiUrl;
    let requestBody;
    if (this.state.searchQuery) {
      console.log('GetAppTalentBySearch');
      const name = this.state.searchQuery.split(' ');
      apiUrl = 'http://www.qa.getchatwith.com/api/GetAppTalentBySearch';
      requestBody = {
        CategoryId: this.props.CategoryId,
        FirstName: name[0],
        LastName: name[1],
        ResultNumberBegin: 0,
        ResultNumberEnd: this.state.resultsPerPage
      }
    } else {
      console.log('GetAppTalentByCategoryWeb');
      apiUrl = 'http://www.qa.getchatwith.com/api/GetAppTalentByCategoryWeb';
      requestBody = {
        CategoryId: this.props.CategoryId,
        ResultNumberBegin: 0,
        ResultNumberEnd: this.state.resultsPerPage
      }
    }
    this.apiCall(apiUrl, requestBody, 0);
  }

  render() {
    const { CategoryId } = this.props;
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Column width={4}>
          <Input
            action={<Button icon='search' onClick={this.onSubmit} />}
            placeholder='Search...'
            onChange={this.onChange}
          />
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={5}>
            <Pagination
              offset={this.state.offset}
              limit={this.state.resultsPerPage}
              total={this.state.TotalCount}
              onClick={(e, props, offset) => this.handleClick(offset)}
            />
          </Grid.Column>
        </Grid>
        {this.state.keys.length > 0 && (
          <Card.Group itemsPerRow={5}>
            {this.renderTalents(this.state.keys)}
          </Card.Group>
        )}
      </div>
    );
  }
}

TalentSearch.propTypes = {
  currentPage: PropTypes.string.isRequired,
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
