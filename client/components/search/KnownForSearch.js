import React, { Component } from 'react'
import { connect } from "react-redux";
import { Message, Icon, Segment, Pagination, Input, Grid, Button, Header, Card, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';

class KnownForSearch extends Component {
  state = {
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

  calcResultNumberBegin = (resultsPerPage, activePage) => {
    return resultsPerPage * (activePage - 1);
  }

  onSubmit = (e, data) => {
    console.log('button click');
    this.setState({ loading: 'true' });
    const instance = axios.create({timeout: 3000});
    const dataObj =
    {
      "KnownFor": this.state.searchQuery,
      "ResultNumberBegin": 0,
      "ResultNumberEnd": 15
    };
    // const testObj = {
    //   "FirstName":"",
    //   "LastName":"A",
    //   "ResultNumberBegin": 0,
    //   "ResultNumberEnd": 15
    // }
    instance.post('http://www.qa.getchatwith.com/home/GetAppTalentBySearch', dataObj)
    .then(res => res.data.Response)
    .then(results => {
      console.log(results.TotalCount);
      window.talentsHash = results.LandingData;
      const searchResults = {
        query: this.state.searchQuery,
        totalCount: results.TotalCount
      }
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talent.ProfilePictureReference = "https://chatwith-dev-talent-profile-pictures.s3.amazonaws.com/055A41E9710840BCBA5E2931D4F8AD1F/ProfilePicture?AWSAccessKeyId=AKIAIBVDUTSBPSGIOLQQ&Expires=1530857230&Signature=QM%2F97s5UmcTCiF9iEk9%2Bh3zU9wA%3D";
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      const totalPages = searchResults.totalCount / this.state.resultsPerPage;
      this.setState({ searchResults, keys, talents: talentsHash, totalPages, activePage: 1, loading: 'false' });
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    const resultNumberBegin = this.calcResultNumberBegin(this.state.resultsPerPage, activePage);
    this.setState({ loading: 'true' })
    console.log(resultNumberBegin);
    this.setState({ activePage });
    const instance = axios.create({timeout: 3000});
    const dataObj =
    {
      "KnownFor": this.state.searchResults.query,
      "ResultNumberBegin": resultNumberBegin,
      "ResultNumberEnd": 15
    };
    // const testObj = {
    //   "FirstName":"",
    //   "LastName":"A",
    //   "ResultNumberBegin": resultNumberBegin,
    //   "ResultNumberEnd": 15
    // }
    instance.post('http://www.qa.getchatwith.com/home/GetAppTalentBySearch', dataObj)
    .then(res => res.data.Response)
    .then(results => {
      console.log(results.TotalCount);
      window.talentsHash = results.LandingData;
      const keys = [];
      const talentsHash = {};
      results.LandingData.forEach(talent => {
        talent.ProfilePictureReference = "https://chatwith-dev-talent-profile-pictures.s3.amazonaws.com/055A41E9710840BCBA5E2931D4F8AD1F/ProfilePicture?AWSAccessKeyId=AKIAIBVDUTSBPSGIOLQQ&Expires=1530857230&Signature=QM%2F97s5UmcTCiF9iEk9%2Bh3zU9wA%3D";
        talentsHash[talent.TalentId] = talent;
        keys.push(talent.TalentId);
      });
      this.setState({ keys, talents: talentsHash, loading: 'false' });
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
    return (
      <Card key={hashedTalent.TalentId} as={Link} to={{
        pathname: `/talent/${hashedTalent.TalentId}`,
        state: {
          FirstName,
          LastName,
          KnownFor,
          ProfilePictureReference
        }
      }}>
        <Image src={hashedTalent.ProfilePictureReference} />
        <Card.Content>
          <Card.Header textAlign="center">
            {hashedTalent.FirstName} {hashedTalent.LastName}
          </Card.Header>
          <Card.Meta textAlign="center">
            {hashedTalent.KnownFor}
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  })

  render() {
    const { loading, keys, searchResults, totalPages, activePage } = this.state;
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
          <Grid.Column width={2}>
            Search by Known For
          </Grid.Column>
          <Grid.Column width={7}>
          <Input
            icon='search'
            iconPosition='left'
            action={<Button color="yellow" onClick={this.onSubmit}>Search</Button>}
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
        {keys.length > 0 && (
          <Card.Group itemsPerRow={5}>
            {this.renderTalents(keys)}
          </Card.Group>
        )}
      </div>
    )
  }
}

export default KnownForSearch
