import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Image, Breadcrumb, Header, Modal, Button, Icon, Label, Form, TextArea } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { atc } from '../../actions/cartActions';
import axios from "axios";

class TalentPage extends Component {
  state = {
    previousPage: this.props.location.state.previousPage,
    FirstName: this.props.location.state.FirstName,
    LastName: this.props.location.state.LastName,
    KnownFor: this.props.location.state.KnownFor,
    ProfilePictureReference: this.props.location.state.ProfilePictureReference,
    keys: [],
    products: {},
    data: {
      VideoMessage: ""
    },
    modalOpen: false
  }

  componentDidMount() {
    console.log('TalentPage did mount')
    const { talentid } = this.props.match.params;

    const instance = axios.create({timeout: 3000});
    instance.defaults.headers.common['token'] = this.props.user.Token;
    instance.post('http://www.qa.getchatwith.com/home/GetProductOptionByTalent', { TalentId: talentid })
    .then(res => res.data.Response)
    .then(products => {
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

  atcFeedHandleClick = (e, data) => {
    const hashedProduct = this.state.products[data.value];
    hashedProduct.ProfilePictureReference = this.state.ProfilePictureReference;
    console.log(hashedProduct);
    this.props.atc(hashedProduct);
  }

  atcVideoMessageHandleClick = (e, data) => {
    this.setState({ modalOpen: false });
    const hashedProduct = this.state.products[data.value];
    hashedProduct.VideoMessage = this.state.data.VideoMessage;
    hashedProduct.ProfilePictureReference = this.state.ProfilePictureReference;
    console.log(hashedProduct);
    this.props.atc(hashedProduct);
  }

  onChange = e => {
    console.log(e);
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  atcFeed = (key, price) => (
    <Button value={key} onClick={this.atcFeedHandleClick}>
      <Button.Content>ADD TO CART</Button.Content>
    </Button>
  )

  atcVideo = (key, price) => (
    <Modal size="tiny" trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      >
      <Modal.Header>
        Notify When Available
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <TextArea 
            maxLength="140"
            placeholder='First name'
            name="VideoMessage" onChange={(e, { value }) => this.setState({
                ...this.state,
                data: { ...this.state.data, [e.target.name]: e.target.value }
              })
            } />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button value={key} color='green' onClick={this.atcVideoMessageHandleClick}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
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
    console.log('///////////////////////////////');
    console.log(hashedProduct);
    let product;
    if (hashedProduct.CurrentUnfulfilled === 0) {
      product = (this.notify());
    } else if (hashedProduct.ProductDescription === 'Feed') {
      product = (this.atcFeed(key, hashedProduct.WebPrice));
    } else if (hashedProduct.ProductDescription === 'Video Message') {
      product = (this.atcVideo(key, hashedProduct.WebPrice));
    }
    return  (
      <Segment.Group horizontal key={key}>
        <Segment>${hashedProduct.WebPrice}</Segment>
        <Segment>{hashedProduct.ProductDescription}</Segment>
        {product}
      </Segment.Group>
    )
  })

  render() {
    const { previousPage, FirstName, LastName, ProfilePictureReference, KnownFor } = this.state;
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
              <Breadcrumb.Section as={Link} to={previousPage}>Talent</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section active>{`${FirstName} ${LastName}`}</Breadcrumb.Section>
            </Breadcrumb>
            </Segment>
            <Segment basic><Header as='h1' color='blue'>{`${FirstName} ${LastName}`}</Header></Segment>
            <Segment basic><Header as='h3' color='grey'>{KnownFor}</Header></Segment>
            <Segment basic><Header as='h2' color='blue'>Products</Header></Segment>
            <Label as='a' color='blue' size='big'>
              <Label.Detail>Friend</Label.Detail>
              <Label.Detail>Friend</Label.Detail>
              Purchase Now
            </Label>
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
  }).isRequired,
  atc: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { atc })(TalentPage);
