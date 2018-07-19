import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header, Grid } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import CategorySearch from '../search/CategorySearch';

class FilmSearchPage extends Component {
  state = {
    CategoryId: '021D71E9EE9E4C849111A438C1322DBD'
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => {
    console.log('FilmSearchPage did mount');
  }

  onTalentSelect = talent => this.setState({ talent });

  addTalent = () => console.log('testing');

  render() {
    const { CategoryId } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Column style={{paddingRight: "0"}} width={10}></Grid.Column>
          <Grid.Column style={{color: "grey"}} width={6}>
            Additional Categories
          </Grid.Column>
        </Grid>
        <Menu secondary style={{margin: "0"}}>
          <Menu.Menu position="left">
          </Menu.Menu>
          <Menu.Menu position="right">
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
        <CategorySearch CategoryId={CategoryId}/>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

export default connect(null)(FilmSearchPage);
