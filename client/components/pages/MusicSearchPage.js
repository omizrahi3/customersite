import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment } from 'semantic-ui-react';
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
      <Segment>
        <h1>Search for Music Talent</h1>
        <TalentSearch onTalentSelect={this.onTalentSelect} endpoint={endpoint} CategoryId={CategoryId}/>
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(MusicSearchPage);
