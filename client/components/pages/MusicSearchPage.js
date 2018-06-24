import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Breadcrumb, Header, Button, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import TalentSearch from '../search/TalentSearch';

class MusicSearchPage extends Component {
  state = {
    endpoint: 'http://www.qa.getchatwith.com/api/GetAppTalentByCategoryWeb',
    CategoryId: '021D71E9EE9E4C849111A438C1322DBD',
    talent: null
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => {
    console.log('MusicSearchPage did mount');
  }

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
          <Label basic color='green' size='big' as={Link} to="/categories/sports">
            SPORTS
          </Label>
          <Label basic color='purple' size='big' as={Link} to="/dashboard">
            BRANDS
          </Label>
        </Segment>
        <Segment basic>
          <TalentSearch currentPage={this.props.location.pathname} onTalentSelect={this.onTalentSelect} endpoint={endpoint} CategoryId={CategoryId}/>
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
