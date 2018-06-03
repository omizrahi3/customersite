import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Image, Breadcrumb, Header, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class TalentPage extends Component {
  state = {
    FirstName: this.props.location.state.FirstName,
    LastName: this.props.location.state.LastName,
    KnownFor: this.props.location.state.KnownFor,
    ProfilePictureReference: this.props.location.state.ProfilePictureReference,
    keys: [],
    products: {}
  }

  componentDidMount() {
    console.log('TalentPage did mount')
    const { talentid } = this.props.match.params;
    console.log(this.props.location.state);
    console.log(`talentid: ${talentid}`);

    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post('/api/api/GetProductOptionByTalent', { TalentId: '403E61E8A710460C8FCEE31F45260FCE' })
    .then(res => res.data.Response)
    .then(products => {
      console.log('this is a test');
      console.log(products);
      const keys = [];
      const productsHash = {};
      products.forEach(product => {
        productsHash[product.ProductOptionId] = product;
        keys.push(product.ProductOptionId);
      });
      window.productsHash = productsHash;
      this.setState({ keys, products: productsHash });
    });
  }

  atc = () => (
    <Modal size="tiny" trigger={<Button>Add To Card</Button>}>
      <Modal.Header>
        Purchase Product
      </Modal.Header>
    </Modal>
  )

  notify = () => (
    <Modal size="tiny" trigger={<Button>Notify Me When Available</Button>}>
      <Modal.Header>
        Notify When Available
      </Modal.Header>
    </Modal>
  )

  renderProducts = keys => keys.map(key => {
    const hashedProduct = this.state.products[key];
    const atc = hashedProduct.CurrentUnfulfilled !== 0 
    ? 
    (this.atc())
    :
    (this.notify());
    return  (
      <Segment.Group horizontal key={key}>
        <Segment>${hashedProduct.Price}</Segment>
        <Segment>{hashedProduct.ProductDescription}</Segment>
        {atc}
      </Segment.Group>
    )
  })

  render() {
    const { FirstName, LastName, ProfilePictureReference, KnownFor } = this.state;
    return (
      <Grid centered columns={3}>
          <Grid.Column>
            <Segment basic><Image src={ProfilePictureReference} /></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to="/dashboard">Home</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section as={Link} to="/search/music">Talent</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section active>{`${FirstName} ${LastName}`}</Breadcrumb.Section>
            </Breadcrumb>
            </Segment>
            <Segment basic><Header as='h1' color='blue'>{`${FirstName} ${LastName}`}</Header></Segment>
            <Segment basic><Header as='h3' color='grey'>{KnownFor}</Header></Segment>
            <Segment basic><Header as='h2' color='blue'>Products</Header></Segment>
            {this.state.keys.length > 0 && (this.renderProducts(this.state.keys))}
          </Grid.Column>
      </Grid>
    )
  }
}

TalentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      talentid: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(TalentPage);
