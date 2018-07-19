import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header, Grid, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import KnownForSearch from '../search/KnownForSearch';

class SearchPage extends Component {
  componentDidMount = () => this.onInit();

  onInit = () => {
    console.log('SearchPage did mount');
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={8}></Grid.Column>
          <Grid.Column style={{paddingLeft: "0", color: "grey"}} width={8}>
            Additional Categories
          </Grid.Column>
        </Grid>
        <Menu secondary style={{margin: "0"}}>
          <Menu.Menu position="left">
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item style={{paddingTop: "0em", paddingBottom: "0.5em"}} as={Link} to ='/categories/film-tv'>
              <Header size='huge' color="red">FILM & TV</Header>
            </Menu.Item>
            <Menu.Item style={{paddingTop: "0em", paddingBottom: "0.5em"}} as={Link} to ='/categories/music'>
              <Header size='huge' color="blue">MUSIC</Header>
            </Menu.Item>
            <Menu.Item style={{paddingTop: "0em", paddingBottom: "0.5em"}} as={Link} to ='/categories/sports'>
              <Header size='huge' color="green">SPORTS</Header>
            </Menu.Item>
            <Menu.Item style={{paddingTop: "0em", paddingBottom: "0.5em"}} as={Link} to ='/categories/brand'>
              <Header size='huge' color="purple">BRANDS</Header>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <KnownForSearch />
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

export default connect(null)(SearchPage);