import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import CategorySearch from '../search/CategorySearch';

class MusicSearchPage extends Component {
  state = {
    CategoryId: '021D71E9EE9E4C849111A438C1322DBD'
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => {
    console.log('MusicSearchPage did mount');
  }

  onTalentSelect = talent => this.setState({ talent });

  addTalent = () => console.log('testing');

  render() {
    const { CategoryId } = this.state;
    return (
      <div>
        <Menu secondary>
          <Menu.Menu position="left">
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to ='/categories/film-tv'>
              <Header size='huge' color="red">FILM & TV</Header>
            </Menu.Item>
            <Menu.Item as={Link} to ='/categories/sports'>
              <Header size='huge' color="green">SPORTS</Header>
            </Menu.Item>
            <Menu.Item as={Link} to ='/categories/brand'>
              <Header size='huge' color="purple">BRANDS</Header>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <CategorySearch CategoryId={CategoryId}/>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

export default connect(null)(MusicSearchPage);
