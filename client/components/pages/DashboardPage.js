import React from "react";
import PropTypes from "prop-types";
import { Grid, Image, Segment, Label, List, Button, Divider, Icon, Card, Header } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { allTalentsSelector } from "../../reducers/talents";
import AddTalentCard from '../cards/AddTalentCard';
import SubscriptionCard from '../cards/SubscriptionCard';

class DashboardPage extends React.Component {
  state = {
    keys: [],
    subscriptions: {}
  }

  componentDidMount = () => {
    console.log('Dashboard did mount')
    const { Token, AppUserId } = this.props.user;
    const instance = axios.create({timeout: 3000});
    const userId = 'A0F12D9534D2406BB04AFD7DBC462526'
    instance.defaults.headers.common['token'] = Token;
    instance.post('http://www.qa.getchatwith.com/api/GetProductByUser', { UserId: AppUserId })
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
    return console.log('dashboard did mount');
  }

  renderSubscriptions = keys => keys.map(key => {
    const hashedSub = this.state.subscriptions[key];
    return  (
        <SubscriptionCard
          key={key}
          ProductId={hashedSub.ProductId}
          TalentFirstName={hashedSub.TalentFirstName}
          TalentLastName={hashedSub.TalentLastName}
          Description={hashedSub.Description}
          ProfilePictureReference={hashedSub.ProfilePictureReference}
        />
      )
  })

  render() {
    const { talents } = this.props;
    const { keys } = this.state;
    return (
      <div>
        <Segment>
          <Label size='massive'>
            Subscriptions
          </Label>
          <Divider hidden />
          {keys.length > 0 ? (
            <Card.Group itemsPerRow={6}>
              {this.renderSubscriptions(keys)}
            </Card.Group>
          ) : <Header as='h3' textAlign='center'>You Have No Subscriptions</Header>}
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
          <Button as={Link} to='/categories/music' color='blue' fluid icon labelPosition='right'>
            MUSIC CELEBRITIES
            <Icon name='right angle' />
          </Button>
          <Divider fitted hidden />
          <Button as={Link} to='/categories/sports' color='green' fluid icon labelPosition='right'>
            SPORTS CELEBRITIES
            <Icon name='right angle' />
          </Button>
        </Segment>
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