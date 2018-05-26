import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment } from 'semantic-ui-react';
import SearchTalentForm from '../forms/SearchTalentForm';
import TalentForm from "../forms/TalentForm";
/*
This should probably be changed.

Instead of returning a talent from the search form, the search form should make the call to the 
api like on login and return the array of talents which will then be stored in this.state.talents instead
of having this.state.talent. Then have a conditional where if this.state.talents is > 0 you list
cards for all of the talents with links to talent pages like talent/234klj3k4j2kj4 which will then
make a call to the api on component did mount to fetch product details for talent.
*/
class FilmAndTvPage extends Component {
  state = {
    talent: null
  }

  onTalentSelect = talent => this.setState({ talent });

  addTalent = () => console.log('testing');

  render() {
    return (
      <Segment>
        <h1>Search for Film and Television Talent</h1>
        <SearchTalentForm onTalentSelect={this.onTalentSelect}/>
        {this.state.talent && (
          <TalentForm submit={this.addTalent} talent={this.state.talent} />
        )}
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(FilmAndTvPage);
