import React, { Component } from 'react'
import { connect } from "react-redux";
import { Segment, Breadcrumb, Header, Button, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import TalentSearch from '../search/TalentSearch';

class SportsSearchPage extends Component {
  state = {
    endpoint: 'http://www.qa.getchatwith.com/api/GetAppTalentByCategoryWeb',
    CategoryId: '8B172F9BE0A6415F89E0B7EA547515B1'
  }

  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log('SportsSearchPage did mount');

  onTalentSelect = talent => this.setState({ talent });

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
          <Header color="green">SPORTS</Header>
        </Segment>
        <Segment basic>
          <Header as='h5' color="grey">Additional Categories</Header>
          <Label basic color='red' size='big' as={Link} to="/categories/music">
            MUSIC
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

export default connect(mapStateToProps)(SportsSearchPage);
