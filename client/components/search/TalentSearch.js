import React, { Component } from 'react'
import { connect } from "react-redux";
import { Message, Icon, Segment, Pagination, Input, Grid, Button, Header, Card, Image, Dropdown, Responsive } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import api from "../../api";

const options = [
  { key: 'n', text: 'Name', value: 'name' },
  { key: 'k', text: 'Known For', value: 'knownFor' }
]

const cardStyles = {
  boxShadow: "none"
}

const imgStyles = {
  boxShadow: "none",
  maxWidth: "200px",
  maxHeight: "265px"
}

const contentStyles = {
  borderTop: 'none',
  paddingRight: '0',
  paddingLeft: '0'
}

class TalentSearch extends Component {
  state = {
    searchType: 'name',
    loading: '',
    searchQuery: '',
    resultsPerPage: 15,
    ResultNumberBegin: 0,
    ResultNumberEnd: 15,
    keys: [],
    talents: {},
    totalCount: 0,
    searchResults: {},
    activePage: 1,
    totalPages: 0
  };

  onChange = (e, data) => {
    this.setState({searchQuery: data.value})
  }

  onChange2 = (e, data) => {
    const { searchType } = this.state;
    if (data.value !== searchType) {
      this.setState({searchType: data.value});
    }
  }

  calcResultNumberBegin = (resultsPerPage, activePage) => {
    return resultsPerPage * (activePage - 1);
  }

  onSubmit = (e, data) => {
    // console.log('onSubmit')
    this.setState({ loading: 'true' });
    const dataObj =
    {
      "ResultNumberBegin": 0,
      "ResultNumberEnd": 15
    };
    if (this.state.searchType === 'knownFor') {
      dataObj.KnownFor = this.state.searchQuery;
    } else {
      const name = this.state.searchQuery.split(' ');
      if (name.length > 1) {
        dataObj.FirstName = name[0];
        dataObj.LastName = name[1];
      } else if (name.length > 0) {
        dataObj.FirstName = name[0];
      }
    }
    api.search.appTalent(dataObj)
    .then(results => {
      const searchResults = {
        query: this.state.searchQuery,
        totalCount: results.TotalCount
      }
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        // console.log(talentsHash);
        keys.push(talent.TalentId);
      });
      const totalPages = searchResults.totalCount / this.state.resultsPerPage;
      this.setState({ searchResults, keys, talents: talentsHash, totalPages, activePage: 1, loading: 'false' });
    })
    .catch(err => {
      console.log('whoops');
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    const resultNumberBegin = this.calcResultNumberBegin(this.state.resultsPerPage, activePage);
    this.setState({ loading: 'true', activePage })
    const dataObj =
    {
      "ResultNumberBegin": resultNumberBegin,
      "ResultNumberEnd": 15
    };
    if (this.state.searchType === 'knownFor') {
      dataObj.KnownFor = this.state.searchResults.query;
    } else {
      const name = this.state.searchResults.query.split(' ');
      if (name.length > 1) {
        dataObj.FirstName = name[0];
        dataObj.LastName = name[1];
      } else if (name.length > 0) {
        dataObj.FirstName = name[0];
      }
    }
    api.search.appTalent(dataObj)
    .then(results => {
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      this.setState({ keys, talents: talentsHash, loading: 'false' });
    })
    .catch(err => {
      console.log('whoops');
    })
  }

  renderTalents = keys => keys.map(key => {
    const hashedTalent = this.state.talents[key];
    const FirstName = hashedTalent.FirstName;
    const LastName = hashedTalent.LastName;
    const KnownFor = hashedTalent.KnownFor;
    const ProfilePictureReference = hashedTalent.ProfilePictureReference;
    const firstUpper = FirstName.toUpperCase();
    const lastUpper = LastName.toUpperCase();
    return (
      <Card style={cardStyles} key={hashedTalent.TalentId} as={Link} to={{
        pathname: `/talent/${hashedTalent.TalentId}`,
        state: {
          FirstName,
          LastName,
          KnownFor,
          ProfilePictureReference
        }
      }}>
        <div style={{height:"265px",width:"200px"}}>
          <Image verticalAlign='middle' style={imgStyles} src={hashedTalent.ProfilePictureReference} />
        </div>
        <Card.Content style={contentStyles}>
          <Header style={{ color: 'grey', margin: "0" }} textAlign='center'>{firstUpper} {lastUpper}
            <Header.Subheader style={{ fontSize: '1.1rem', color: "grey" }}>{hashedTalent.KnownFor}</Header.Subheader>
          </Header>
        </Card.Content>
      </Card>
    )
  })

  render() {
    const { loading, keys, searchResults, totalPages, activePage } = this.state;
    return (
      <div>
        <Grid style={{margin: "0.1em", background: "#f3f4f5"}}>
          <Grid.Column style={{paddingRight: "0"}} mobile={16} tablet={2} computer={2}>
            <Dropdown
              placeholder='Search By'
              compact
              selection
              options={options}
              onChange={this.onChange2}
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <Input
              icon='search'
              iconPosition='left'
              action={<Button style={{color: "#f3f4f5"}} color="yellow" onClick={this.onSubmit}>SEARCH</Button>}
              placeholder=''
              onChange={this.onChange}
            />
          </Grid.Column>
          <Grid.Column floated='left' mobile={16} tablet={9} computer={9}>
            {keys.length > 0 && (
              <Pagination
                secondary
                firstItem={null}
                lastItem={null}
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={this.handlePaginationChange}
              />
            )}
          </Grid.Column>
        </Grid>
        <Segment basic>
          {loading === 'true' && (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Header>Search In Progress</Message.Header>
            </Message>
          )}
          {loading === 'false' && (
            <div>
              <Header size='huge' style={{color: "#C0C0C0"}}>
                RESULTS
                {keys.length > 0 && (
                  <Header.Subheader>{searchResults.totalCount} Results Found For "{searchResults.query}"</Header.Subheader>
                )}
              </Header>
              {keys.length === 0 && (
                <Header style={{margin: "0"}} color="grey" size='medium'>
                  No Search Results Found
                  <Header.Subheader style={{color: "grey"}}>Try Searching Again</Header.Subheader>
                </Header>
              )}
            </div>
          )}
        </Segment>
        {keys.length > 0 && (
          <div>
            <Responsive
              {...Responsive.onlyMobile}
            >
              <Card.Group itemsPerRow={1}>{this.renderTalents(keys)}</Card.Group>
            </Responsive>
            <Responsive
              {...Responsive.onlyTablet}
            >
              <Card.Group itemsPerRow={3}>{this.renderTalents(keys)}</Card.Group>
            </Responsive>
            <Responsive
              {...Responsive.onlyComputer}
            >
              <Card.Group itemsPerRow={5}>{this.renderTalents(keys)}</Card.Group>
            </Responsive>
          </div>
        )}
      </div>
    )
  }
}

export default TalentSearch
