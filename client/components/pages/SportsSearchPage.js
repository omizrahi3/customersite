import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Menu, Header, Grid } from 'semantic-ui-react';
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
        <Grid>
          <Grid.Row style={{paddingBottom: "0em"}}>
            <Grid.Column mobile={16} tablet={10} computer={10}></Grid.Column>
            <Grid.Column style={{color: "grey"}} mobile={16} tablet={6} computer={6}>
              Additional Categories
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{paddingTop: "0em"}}>
            <Grid.Column mobile={16} tablet={10} computer={10}></Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/music' size='large' color="blue">MUSIC</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/brand' size='large' color="purple">BRANDS</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Header as={Link} to ='/categories/film-tv' size='large' color="red">FILM & TV</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
