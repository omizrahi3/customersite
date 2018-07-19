import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Icon, Segment, Pagination, Input, Grid, Button, Header, Card, Image, Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';

const marginFix = {
  margin: "0"
};

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

class CategorySearch extends Component {
  state = {
    loading: '',
    searchQuery: '',
    resultsPerPage: 15,
    ResultNumberBegin: 0,
    keys: [],
    talents: {},
    totalCount: 0,
    searchResults: {},
    activePage: 1,
    totalPages: 0
  };

  componentDidMount() {
    console.log('CategorySearch did mount');
    this.setState({ loading: 'true' });
    const instance = axios.create({timeout: 3000});
    const requestBody = {
      CategoryId: this.props.CategoryId,
      ResultNumberBegin: 0,
      ResultNumberEnd: 15
    }
    instance.post('http://www.qa.getchatwith.com/home/GetAppTalentByCategoryWeb', requestBody)
    .then(res => res.data.Response)
    .then(results => {
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      const totalPages = Math.ceil(results.TotalCount / this.state.resultsPerPage);
      this.setState({ keys, talents: talentsHash, totalPages, activePage: 1, loading: 'false' });
    });
  }

  onChange = (e, data) => {
    this.setState({searchQuery: data.value})
  }

  calcResultNumberBegin = (resultsPerPage, activePage) => {
    return resultsPerPage * (activePage - 1);
  }

  onSubmit = (e, data) => {
    console.log('onSubmit');
    this.setState({ loading: 'true' });

    let apiUrl;
    let requestBody;

    if (!!this.state.searchQuery) {
      // has query - GetAppTalentBySearch
      const name = this.state.searchQuery.split(' ');
      apiUrl = 'http://www.qa.getchatwith.com/home/GetAppTalentBySearch';
      requestBody = {
        CategoryId: this.props.CategoryId,
        FirstName: name[0],
        LastName: name[1],
        ResultNumberBegin: 0,
        ResultNumberEnd: this.state.resultsPerPage
      }
    } else {
      // has no query - GetAppTalentByCategoryWeb
    }
    
    const instance = axios.create({timeout: 3000});
    instance.post(apiUrl, requestBody)
    .then(res => res.data.Response)
    .then(results => {
      console.log(results);
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      if (!!this.state.searchQuery) {
        // has query - GetAppTalentBySearch
        const searchResults = {
          query: this.state.searchQuery,
          totalCount: results.TotalCount
        }
        const totalPages = Math.ceil(results.TotalCount / this.state.resultsPerPage);
        this.setState({ searchResults, keys, talents: talentsHash, totalPages, activePage: 1, loading: 'false' });
      } else {
        // has no query - GetAppTalentByCategoryWeb
      }
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ loading: 'true', activePage })
    let apiUrl;
    let requestBody;
    const resultNumberBegin = this.calcResultNumberBegin(this.state.resultsPerPage, activePage);
    if (!!this.state.searchQuery) {
      // has query - GetAppTalentBySearch
      const name = this.state.searchQuery.split(' ');
      apiUrl = 'http://www.qa.getchatwith.com/home/GetAppTalentBySearch';
      requestBody = {
        CategoryId: this.props.CategoryId,
        FirstName: name[0],
        LastName: name[1],
        ResultNumberBegin: resultNumberBegin,
        ResultNumberEnd: this.state.resultsPerPage
      }
    } else {
      // has no query - GetAppTalentByCategoryWeb
      apiUrl = 'http://www.qa.getchatwith.com/home/GetAppTalentByCategoryWeb';
      requestBody = {
        CategoryId: this.props.CategoryId,
        ResultNumberBegin: resultNumberBegin,
        ResultNumberEnd: this.state.resultsPerPage
      }
    }

    console.log(apiUrl);
    console.log(requestBody);
    const instance = axios.create({timeout: 3000});
    instance.post(apiUrl, requestBody)
    .then(res => res.data.Response)
    .then(results => {
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });

      if (!!this.state.searchQuery) {
        // has query - GetAppTalentBySearch
        this.setState({ keys, talents: talentsHash, activePage, loading: 'false' });
      } else {
        // has no query - GetAppTalentByCategoryWeb
        this.setState({ keys, talents: talentsHash, activePage, loading: 'false' });
      }
    });
  }

  renderTalents = keys => keys.map(key => {
    const hashedTalent = this.state.talents[key];
    if (hashedTalent.KnownFor === 0) {
      hashedTalent.KnownFor = "The Walking Dead";
    }
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
    const { loading, keys, searchResults, totalPages, activePage, searchQuery } = this.state;
    return (
      <div>
        {loading === 'true' && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Login In Progress</Message.Header>
          </Message>
        )}
        <Segment basic secondary>
        <Grid columns='equal'>
          <Grid.Column style={{display: "flex", paddingRight: "0"}} width={2}>
            <div style={{color: "grey", display: "flex", alignItems: "center"}}>
              Search By Name
            </div>
          </Grid.Column>
          <Grid.Column style={{paddingLeft: "0"}} width={7}>
          <Input
            icon='search'
            iconPosition='left'
            action={<Button style={{color: "#f3f4f5"}} color="yellow" onClick={this.onSubmit}>SEARCH</Button>}
            placeholder=''
            onChange={this.onChange}
          />
          </Grid.Column>
          <Grid.Column width={7}>
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
        </Segment>
        {!!searchQuery && (
        <Segment basic>
          <Header size='huge' color="grey">
            RESULTS
            {keys.length > 0 && (
              <Header.Subheader>{searchResults.totalCount} Results Found For "{searchResults.query}"</Header.Subheader>
            )}
          </Header>
          {keys.length === 0 && (
            <Header size='medium'>
              No Search Results Found
              <Header.Subheader>Try Searching Again</Header.Subheader>
            </Header>
          )}
        </Segment>
        )}
        {keys.length > 0 && (
          <Card.Group itemsPerRow={5}>
            {this.renderTalents(keys)}
          </Card.Group>
        )}
      </div>
    )
  }
}

CategorySearch.propTypes = {
  CategoryId: PropTypes.string.isRequired,
};

export default CategorySearch
