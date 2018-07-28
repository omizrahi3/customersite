import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu, Header, List, Divider, Table } from "semantic-ui-react";
import api from "../../api";

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

class OrderHistoryFullGrid extends Component {
  state = {
    ordersFetched: true,
    orders: []
  }

  componentDidMount() {
    // console.log('OrderHistoryFullGrid did mount');
    const credentials = {
      Token: this.props.user.Token,
      data: {
        "UserId": this.props.user.AppUserId,
        "Month":0,
        "Year":0
      }
    }
    // console.log(credentials);
    api.orderHistory.fetchOrders(credentials)
    .then(res => {
      // console.log('api.orderHistory.fetchOrders');
      // console.log(res);
      const { FeedTotal, LiveChatTotal, VideoMessageTotal } = res;
      const orders = FeedTotal.concat(LiveChatTotal).concat(VideoMessageTotal);
      orders.sort(function(a,b){
        var c = new Date(a.RequestedDate);
        var d = new Date(b.RequestedDate);
        return c-d;
      });
      this.setState({orders});
    })
  }

  cancelSub = (e, data) => {
    // console.log(data);
    const credentials = {
      Token: this.props.user.Token,
      data: {
        "ProductId": data.value
      }
    }
    api.orderHistory.deleteSub(credentials)
    .then(res => {
      // console.log(res);
      const { orders } = this.state;
      const newOrders = orders.filter(order => order.ProductId !== data.value);
      this.setState({ orders: newOrders});
    })
    .catch(err => {
      // console.log('whoops');
    })
  }

  renderOrders = orders => orders.map(order => {
    // console.log(order);
    const dateObj = new Date(order.RequestedDate);
    return (
      <Table.Row key={order.ProductId}>
        <Table.Cell style={greyColor}>{`${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()}`}</Table.Cell>
        <Table.Cell style={greyColor}>Active</Table.Cell>
        <Table.Cell style={greyColor}>{order.ProductId.slice(-4)}</Table.Cell>
        <Table.Cell style={greyColor}>{`${order.TalentFirstName} ${order.TalentLastName} ${order.Description}`}</Table.Cell>
        <Table.Cell style={greyColor}>
        {order.Description === "Feed" && (
          <List>
            <List.Item value={order.ProductId} style={{ color: "red", textDecoration: 'underline' }} as='a' onClick={this.cancelSub}>CANCEL</List.Item>
          </List>
        )}
        {order.Description !== "Feed" && (
          <div>N/A</div>
        )}
        </Table.Cell>
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
                  <Table.HeaderCell style={tableColumnStyle}>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {orders.length > 0 && (
                <Table.Body>
                  {this.renderOrders(orders)}
                </Table.Body>  
              )}             
            </Table>
        )}
        <p style={italicized}>Have a question about an order? Reach out to our support team at <List.Item style={{"textDecoration": "underline"}} as='a' href="mailto:support@chatwith.com">support@chatwith.com</List.Item></p>
      </div>
    )
  }
}

OrderHistoryFullGrid.propTypes = {
  user: PropTypes.object.isRequired
};

export default OrderHistoryFullGrid