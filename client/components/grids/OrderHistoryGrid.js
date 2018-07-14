import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu, Header, List, Divider, Segment, Table } from "semantic-ui-react";
import api from "../../api";

const linkStyle = {
  textDecoration: 'underline'
};

const greyColor = {
  color: "grey"
}

const marginFix = {
  margin: "0"
};

const listStyle = {
  color: 'grey'
};

const italicized = {
  color: 'grey',
  fontStyle: 'italic'
}

const tableStyle = {
  background: '#f3f4f5',
  border: 'none'
};

const tableColumnStyle = {
  color: 'grey'
};

class OrderHistoryGrid extends Component {
  state = {
    ordersFetched: true,
    orders: []
  }

  componentDidMount() {
    console.log('OrderHistoryGrid did mount');
    const credentials = {
      Token: this.props.user.Token,
      data: {
        "UserId": this.props.user.AppUserId,
        "Month":0,
        "Year":0
      }
    }
    api.orderHistory.fetchOrders(credentials)
    .then(res => {
      console.log('api.orderHistory.fetchOrders');
      console.log(res);
      const { FeedTotal, LiveChatTotal, VideoMessageTotal } = res;
      const orders = FeedTotal.concat(LiveChatTotal).concat(VideoMessageTotal);
      orders.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        var c = new Date(a.RequestedDate);
        var d = new Date(b.RequestedDate);
        return c-d;
      });
      this.setState({orders});
    })
  }

  renderOrders = orders => orders.slice(0, 4).map(order => {
    const dateObj = new Date(order.RequestedDate);
    return (
      <Table.Row key={order.ProductId}>
        <Table.Cell style={greyColor}>{`${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()}`}</Table.Cell>
        <Table.Cell style={greyColor}>Active</Table.Cell>
        <Table.Cell style={greyColor}>{order.ProductId.slice(-4)}</Table.Cell>
        <Table.Cell style={greyColor}>{order.ProductName}</Table.Cell>
      </Table.Row>
    )
  })

  render() {
    const { orders } = this.state;
    return (
      <div>
        <Menu style={marginFix} secondary>
          <Menu.Menu style={marginFix} position="left">
            <Header color='grey'>ORDER HISTORY</Header>
          </Menu.Menu>
          <Menu.Menu style={marginFix} position="right">
          <List>
            <List.Item style={linkStyle} as='a'>View Full Order History</List.Item>
          </List>
          </Menu.Menu>
        </Menu>
        <Divider style={marginFix} />
        {this.state.ordersFetched && (
            <Table style={tableStyle} basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={tableColumnStyle}>Date Ordered</Table.HeaderCell>
                  <Table.HeaderCell style={tableColumnStyle}>Status</Table.HeaderCell>
                  <Table.HeaderCell style={tableColumnStyle}>Order #</Table.HeaderCell>
                  <Table.HeaderCell style={tableColumnStyle}>Items Ordered</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {orders.length > 0 && (
                <Table.Body>
                  {this.renderOrders(orders)}
                </Table.Body>  
              )}             
            </Table>
        )}
        <p style={italicized}>Need to make a change to an order? You can do so by viewing the <Link to="/orders">Full Order History</Link></p>
      </div>
    )
  }
}

OrderHistoryGrid.propTypes = {
  user: PropTypes.object.isRequired
};

export default OrderHistoryGrid