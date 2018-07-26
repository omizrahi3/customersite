import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Header, Grid } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import TalentSearch from '../search/TalentSearch';

class SearchPage extends Component {
  componentDidMount = () => this.onInit();

  onInit = () => {
    console.log('SearchPage did mount');
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row style={{paddingBottom: "0em"}}>
            <Grid.Column mobile={16} tablet={8} computer={8}></Grid.Column>
            <Grid.Column style={{color: "grey"}} mobile={16} tablet={8} computer={8}>
              Additional Categories
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{paddingTop: "0em"}}>
            <Grid.Column mobile={16} tablet={8} computer={8}></Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/music' size='large' color="blue">MUSIC</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/sports' size='large' color="green">SPORTS</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/brand' size='large' color="purple">BRANDS</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/film-tv' size='large' color="red">FILM & TV</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TalentSearch />
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

export default connect(null)(SearchPage);