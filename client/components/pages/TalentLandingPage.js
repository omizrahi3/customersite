import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header, Button, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";

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
              <Header size='huge' color="red">
                FILM & TV
              </Header>
            </Menu.Item>
            <Menu.Item>
              <Header size='huge' color="blue">MUSIC</Header>
            </Menu.Item>
            <Menu.Item>
            <Header size='huge' color="green">SPORTS</Header>
            </Menu.Item>
            <Menu.Item>
              <Header size='huge' color="purple">BRANDS</Header>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment basic>
          <Header as='h5' color="grey">Categories</Header>
          <Label basic color='red' size='big' as={Link} to="/categories/music">
            MUSIC
          </Label>
          <Label basic color='green' size='big' as={Link} to="/categories/sports">
            SPORTS
          </Label>
          <Label basic color='purple' size='big' as={Link} to="/categories/music">
            BRANDS
          </Label>
        </Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

export default connect(null)(TalentLandingPage);