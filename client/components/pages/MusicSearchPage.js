import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Breadcrumb, Header, Button, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import TalentSearch from '../search/TalentSearch';
/*
This should probably be changed.

Instead of returning a talent from the search form, the search form should make the call to the 
api like on login and return the array of talents which will then be stored in this.state.talents instead
of having this.state.talent. Then have a conditional where if this.state.talents is > 0 you list
cards for all of the talents with links to talent pages like talent/234klj3k4j2kj4 which will then
make a call to the api on component did mount to fetch product details for talent.
*/
class MusicSearchPage extends Component {
  state = {
    endpoint: '/api/api/GetAppTalentByCategoryWeb',
    CategoryId: '021D71E9EE9E4C849111A438C1322DBD',
    talent: null
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log('MusicSearchPage did mount');

  onTalentSelect = talent => this.setState({ talent });

  addTalent = () => console.log('testing');

  render() {
    const { endpoint, CategoryId } = this.state;
    return (
      <div>
        <Segment basic>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to="/dashboard">Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Talent</Breadcrumb.Section>
          </Breadcrumb>
          <Header color="blue">MUSIC</Header>
        </Segment>
        <Segment basic>
          <Header as='h5' color="grey">Additional Categories</Header>
          <Label basic color='green' size='big' as={Link} to="/dashboard">
            SPORTS
          </Label>
          <Label basic color='purple' size='big' as={Link} to="/dashboard">
            BRANDS
          </Label>
        </Segment>
        <Segment basic>
          <TalentSearch onTalentSelect={this.onTalentSelect} endpoint={endpoint} CategoryId={CategoryId}/>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(MusicSearchPage);
