import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Breadcrumb, Header, Button, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class TalentLandingPage extends Component {
  componentDidMount = () => this.onInit();

  onInit = () => {
    console.log('MusicSearchPage did mount');
  }

  render() {
    return (
      <div>
        <Segment basic>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to="/dashboard">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Talent</Breadcrumb.Section>
          </Breadcrumb>
          <Header color="blue">CATEGORIES</Header>
        </Segment>
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
      </div>
    )
  }
}

export default connect(null)(TalentLandingPage);