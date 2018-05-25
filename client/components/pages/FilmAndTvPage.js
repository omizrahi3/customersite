import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react';
import SearchTalentForm from '../forms/SearchTalentForm';

export class FilmAndTvPage extends Component {
  state = {
    talent: null
  }

  onTalentSelect = talent => this.setState({ talent });

  render() {
    return (
      <Segment>
        <h1>Search for Film and Television Talent</h1>
        <SearchTalentForm />
      </Segment>
    )
  }
}

export default FilmAndTvPage
