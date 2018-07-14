import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Menu, Header, Divider, Card, Image, Segment, List } from "semantic-ui-react";
import api from "../../api";

const marginFix = {
  margin: "0"
};

const cardStyles = {
  boxShadow: "none"
}

const imgStyles = {
  boxShadow: "none"
}

const contentStyles = {
  paddingRight: '0',
  paddingLeft: '0'
}

class ActiveSubsGrid extends Component {
  state = {
    keys: [],
    subscriptions: {},
    finished: false
  }

  componentDidMount() {
    console.log('ActiveSubsGrid did mount')
    const credentials = {
      Token: this.props.user.Token,
      data: {
        UserId: this.props.user.AppUserId
      }
    }
    api.orderHistory.activeSubs(credentials)
    .then(res => {
      console.log('api.orderHistory.activeSubs');
      const keys = [];
      const subscriptionsHash = {};
      res.forEach(sub => {
        console.log(sub);
        subscriptionsHash[sub.ProductId] = sub;
        keys.push(sub.ProductId);
      });
      this.setState({ keys, subscriptions: subscriptionsHash });
      const credentials2 = {
        Token: this.props.user.Token,
        data: {
          "UserId": this.props.user.AppUserId,
          "Month":0,
          "Year":0
        }
      }
      return api.orderHistory.fetchOrders(credentials2)
    })
    .then(res => {
      console.log('api.orderHistory.fetchOrders');
      console.log(res);
      const { FeedTotal, LiveChatTotal, VideoMessageTotal } = res;
      const orders = FeedTotal.concat(LiveChatTotal).concat(VideoMessageTotal);
      const subscriptionsHash = this.state.subscriptions;
      orders.forEach(sub => {
        subscriptionsHash[sub.ProductId].RequestedDate = sub.RequestedDate;
        subscriptionsHash[sub.ProductId].WebTotal = sub.WebTotal;
      });
      this.setState({ finished: true, subscriptions: subscriptionsHash });
    })
  }

  cancelSub = (e, data) => {
    console.log(data);
    const credentials = {
      Token: this.props.user.Token,
      data: {
        "ProductId": data.value
      }
    }
    api.orderHistory.deleteSub(credentials)
    .then(res => {
      console.log(res);
      const { keys, subscriptions } = this.state;
      const newKeys = keys.filter(key => key !== data.value);
      delete subscriptions[data.value];
      this.setState({ keys: newKeys, subscriptions});
    })
    .catch(err => {
      console.log('whoops');
    })

    // const { keys, subscriptions } = this.state;
    // console.log(keys);
    // const newKeys = keys.filter(key => key !== data.value);
    
    // console.log(subscriptions);
    // delete subscriptions[data.value];
    // console.log(subscriptions);
    // this.setState({ keys: newKeys, subscriptions});
  }

  renderSubscriptions = keys => keys.map(key => {
    const hashedSub = this.state.subscriptions[key];
    if (hashedSub.Description === 'Feed') {
      const dateObj = new Date(hashedSub.RequestedDate);
      return  (
        <Card style={cardStyles} key={hashedSub.ProductId}>
          <Image style={imgStyles} src={hashedSub.ProfilePictureReference} />
          <Card.Content style={contentStyles}>
            <Header style={{ color: 'grey' }} as='h4' textAlign='left'>{hashedSub.TalentFirstName} {hashedSub.TalentLastName}
              <Header.Subheader>Start {`${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()}`}</Header.Subheader>
              <Header.Subheader>${hashedSub.WebTotal}</Header.Subheader>
            </Header>
              <List>
                <List.Item value={hashedSub.ProductId} style={{ color: "red", textDecoration: 'underline' }} as='a' onClick={this.cancelSub}>Cancel</List.Item>
              </List>
          </Card.Content>
        </Card>
        )
    }
  })

  render() {
    const { keys, finished } = this.state;
    return (
      <div>
        <Menu style={marginFix} secondary>
          <Menu.Menu style={marginFix} position="left">
            <Header color='grey'>ACTIVE SUBSCRIPTIONS</Header>
          </Menu.Menu>
        </Menu>
        <Divider style={marginFix} />
        <Segment basic></Segment>
        {finished && (keys.length > 0 ? (
            <Card.Group itemsPerRow={6}>
              {this.renderSubscriptions(keys)}
            </Card.Group>
          ) : <Header as='h3' textAlign='center'>You Have No Subscriptions</Header>
        )}
      </div>
    )
  }
}

ActiveSubsGrid.propTypes = {
  user: PropTypes.object.isRequired
};

export default ActiveSubsGrid