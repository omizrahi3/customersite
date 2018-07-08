import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import CategorySearch from '../search/CategorySearch';

class SportsSearchPage extends Component {
  state = {
    CategoryId: '8B172F9BE0A6415F89E0B7EA547515B1'
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log('SportsSearchPage did mount');

  onTalentSelect = talent => this.setState({ talent });

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
            <Menu.Item as={Link} to ='/categories/music'>
              <Header size='huge' color="blue">MUSIC</Header>
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

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(SportsSearchPage);
