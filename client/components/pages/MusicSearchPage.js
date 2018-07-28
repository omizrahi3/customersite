import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Header, Grid } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import CategorySearch from '../search/CategorySearch';

const qaCategoryId = '021D71E9EE9E4C849111A438C1322DBD';
const prodCategoryId = 'D4C54DC9580E4143B8F9CA0E87EB7996';

const cartStyle = {
  textDecoration: 'underline',
  color: '#12457b'
};

class MusicSearchPage extends Component {
  state = {
    CategoryId: prodCategoryId
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => {
    // console.log('MusicSearchPage did mount');
  }

  onTalentSelect = talent => this.setState({ talent });

  addTalent = () => console.log('testing');

  render() {
    const { cart } = this.props;
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
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <div>
                <Header style={cartStyle} size="tiny" as={Link} to="/cart">({cart.length}) Items in Cart</Header>
              </div>
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
    cart: state.cart
  };
}

export default connect(mapStateToProps)(MusicSearchPage);
