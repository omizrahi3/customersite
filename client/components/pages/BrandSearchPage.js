import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Header, Menu, Grid } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import CategorySearch from '../search/CategorySearch';

class BrandSearchPage extends Component {
  state = {
    CategoryId: '6BAF3D6162EB4D2B8D9D363C04BB0539'
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log('BrandSearchPage did mount');

  onTalentSelect = talent => this.setState({ talent });

  render() {
    const { CategoryId } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Column style={{paddingRight: "0"}} width={10}></Grid.Column>
          <Grid.Column style={{marginLeft: "-10px", color: "grey"}} width={6}>
            Additional Categories
          </Grid.Column>
        </Grid>
        <Menu secondary secondary style={{margin: "0"}}>
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

export default connect(mapStateToProps)(BrandSearchPage);