import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Grid, Segment, Message, Icon, Header, Card, Divider, Image } from "semantic-ui-react";
import axios from 'axios';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import { updatedProfile } from '../../actions/userActions';
import SubscriptionCard from '../cards/SubscriptionCard';

class ProfilePage extends Component {
  state = {
    loading: '',
    success: false,
    serverError: '',
    keys: [],
    subscriptions: {}
  }

  componentDidMount() {
    console.log('ProfilePage did mount')
    const { Token, AppUserId } = this.props.user;
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = Token;
    instance.post('http://www.qa.getchatwith.com/api/GetProductByUser', { UserId: AppUserId })
    .then(res => res.data.Response)
    .then(subs => {
      console.log(subs);
      const keys = [];
      const subscriptionsHash = {};
      subs.forEach(sub => {
        subscriptionsHash[sub.ProductId] = sub;
        keys.push(sub.ProductId);
      });
      this.setState({ keys, subscriptions: subscriptionsHash });
    });
  }

  submit = (data) => {
    console.log('submit');
    data.AppUserId = this.props.user.AppUserId;
    const user = {
      Token: this.props.user.Token,
      profile: data
    };
    this.props.updatedProfile(user)
      .then(() => this.setState({ loading: 'false', success: true }))
      .catch(() => this.setState({ loading: 'false', success: false }));
  }

  renderSubscriptions = keys => keys.map(key => {
    const hashedSub = this.state.subscriptions[key];
    return  (
      <Card key={hashedSub.ProductId}>
        <Image src={hashedSub.ProfilePictureReference} />
        <Card.Content>
          <Card.Header textAlign="center">
            {hashedSub.TalentFirstName} {hashedSub.TalentLastName}
          </Card.Header>
          <Card.Meta textAlign="center">
            {hashedSub.Description}
          </Card.Meta>
        </Card.Content>
      </Card>
      )
  })

  render() {
    const { loading, success, serverError, keys } = this.state;
    return (
      <div>
        {loading === 'true' && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Profile Update In Progress</Message.Header>
          </Message>
        )}
        {loading === 'false' &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Update Complete.
              </Message.Header>
            </Message.Content>
          </Message>
        )}
        {loading === 'false' &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Update Failed.</Message.Header>
            </Message.Content>
          </Message>
        )}
        <Grid padded>
          <Grid.Column width={10} color="blue"></Grid.Column>
          <Grid.Column width={6} color="teal">
            <Segment inverted color="teal">Have Questions? support@getchatwith.com</Segment>
          </Grid.Column>
        </Grid>
        <Segment basic secondary>
          <Header as='h3' color='grey'>
            <Header.Content>
              SUBSCRIPTIONS
            </Header.Content>
          </Header>
          <Divider hidden />
          {keys.length > 0 ? (
            <Card.Group itemsPerRow={6}>
              {this.renderSubscriptions(keys)}
            </Card.Group>
          ) : <Header as='h3' textAlign='center'>You Have No Subscriptions</Header>}
        </Segment>
        <Segment basic secondary>
          <Header as='h3' color='grey'>
            <Header.Content>
              PROFILE UPDATE FORM
            </Header.Content>
          </Header>
          <UpdateProfileForm submit={this.submit} />
        </Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
    )
  }
}

updatedProfile.propTypes = {
  updatedProfile: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { updatedProfile })(ProfilePage);