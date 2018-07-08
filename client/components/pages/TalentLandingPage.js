import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header, Button, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import KnownForSearch from '../search/KnownForSearch';

class TalentLandingPage extends Component {
  componentDidMount = () => this.onInit();

  onInit = () => {
    console.log('MusicSearchPage did mount');
  }

  render() {
    return (
      <div>
        <Menu secondary>
          <Menu.Menu position="left">
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to ='/categories/music'>
              <Header size='huge' color="red">FILM & TV</Header>
            </Menu.Item>
            <Menu.Item as={Link} to ='/categories/music'>
              <Header size='huge' color="blue">MUSIC</Header>
            </Menu.Item>
            <Menu.Item as={Link} to ='/categories/music'>
              <Header size='huge' color="green">SPORTS</Header>
            </Menu.Item>
            <Menu.Item as={Link} to ='/categories/music'>
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

export default connect(null)(TalentLandingPage);