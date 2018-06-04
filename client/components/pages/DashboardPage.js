import React from "react";
import PropTypes from "prop-types";
import { Grid, Image, Segment, Label, List, Button, Divider, Icon, Card } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { allTalentsSelector } from "../../reducers/talents";
import AddFildAndTvCard from '../cards/AddFilmAndTvCard';
import AddTalentCard from '../cards/AddTalentCard';
import SubscriptionCard from '../cards/SubscriptionCard';

class DashboardPage extends React.Component {
  state = {
    keys: [],
    subscriptions: {}
  }

  componentDidMount = () => {
    console.log(this.props.user);
    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post('/api/api/GetProductByUser', { UserId: 'A0F12D9534D2406BB04AFD7DBC462526' })
    .then(res => res.data.Response)
    .then(subs => {
      console.log(subs);
      const keys = [];
      const subscriptionsHash = {};
      subs.forEach(sub => {
        sub.ProfilePictureReference = "/images/man.png";
        subscriptionsHash[sub.ProductId] = sub;
        keys.push(sub.ProductId);
      });
      window.subscriptionsHash = subscriptionsHash;
      this.setState({ keys, subscriptions: subscriptionsHash });
    });
  }

  componentDidMount2 = () => this.onInit(this.props);

  onInit = props => {
    console.log(this.props);
    return console.log('dashboard did mount');
  }

  renderSubscriptions = keys => keys.map(key => {
    const hashedSub = this.state.subscriptions[key];
    return  (
      <Grid.Column key={key}>
        <SubscriptionCard
          ProductId={hashedSub.TalentId}
          TalentFirstName={hashedSub.TalentFirstName}
          TalentLastName={hashedSub.TalentLastName}
          Description={hashedSub.Description}
          ProfilePictureReference={hashedSub.ProfilePictureReference}
        />
      </Grid.Column>
      )
  })

  render() {
    const { talents } = this.props;
    return (
      <div>
        <Segment>
          <Label size='massive'>
            Subscriptions
          </Label>
          <Divider hidden />
          {this.state.keys.length > 0 && (
            <Grid>
              <Grid.Row columns={2}>
                {this.renderSubscriptions(this.state.keys)}
              </Grid.Row>
            </Grid>
          )}
          <Divider hidden />
          {this.state.keys.length > 0 && (
            <Card.Group itemsPerRow={6}>
            <Card raised image='/images/man.png' />
            <Card raised image='/images/man.png' />
            <Card raised image='/images/man.png' />
            <Card raised image='/images/man.png' />
          </Card.Group>
          )}
        </Segment>
        <Segment>
          <Label size='massive'>
            Categories
          </Label>
          <Divider hidden />
          <Button color='red' fluid icon labelPosition='right'>
            FILM & TELEVISION CELEBRITIES
            <Icon name='right angle' />
          </Button>
          <Divider fitted hidden />
          <Button as={Link} to='/search/music' color='blue' fluid icon labelPosition='right'>
            MUSIC CELEBRITIES
            <Icon name='right angle' />
          </Button>
          <Divider fitted hidden />
          <Button color='green' fluid icon labelPosition='right'>
            SPORTS CELEBRITIES
            <Icon name='right angle' />
          </Button>
        </Segment>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <AddTalentCard title={'Film and Television'} endpoint={'/talent/film-and-tv'} />
            </Grid.Column>
            <Grid.Column>
              <AddTalentCard title={'Music'} endpoint={'/search/music'} />
            </Grid.Column>
            <Grid.Column>
              <AddTalentCard title={'Sports'} endpoint={'/search/sports'} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  talents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    talents: allTalentsSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);