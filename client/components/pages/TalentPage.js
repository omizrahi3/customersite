import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment, Image, Card, Breadcrumb, Header, Modal, Button, Icon, Input, Form, TextArea, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { atc } from '../../actions/cartActions';
import isEmail from "validator/lib/isEmail";
import api from "../../api";

const linkStyle = {
  color: 'grey',
};

class TalentPage extends Component {
  state = {
    errors: {},
    previousPage: this.props.location.state.previousPage,
    FirstName: this.props.location.state.FirstName,
    LastName: this.props.location.state.LastName,
    KnownFor: this.props.location.state.KnownFor,
    ProfilePictureReference: this.props.location.state.ProfilePictureReference,
    keys: [],
    products: {},
    data: {
      VideoMessage: "",
      notifyEmail: ""
    },
    modalOpen: false,
    liveModalOpen: false,
    notifyModalOpen: false,
    productAdded: false,
    notificationSuccess: '',
    dates: [],
    DateMapperId: '',
    dateObj: {},
    loaded: false
  }

  componentDidMount() {
    console.log('TalentPage did mount')
    const { talentid } = this.props.match.params;

    api.product.optionsByTalent({ TalentId: talentid })
    .then(products => {
      const keys = [];
      const productsHash = {};
      let liveChat = '';
      products.forEach(product => {
        console.log(product);
        if (product.ProductDescription === 'Live Chat') {
          liveChat = product.ProductOptionId;
        }
        product.TalentId = talentid;
        productsHash[product.ProductOptionId] = product;
        keys.push(product.ProductOptionId);
      });
      this.setState({ keys, products: productsHash, loaded: true });
      if (!!liveChat) return api.product.getDateSlot({ ProductOptionId: liveChat });
      else throw 'no live chat';
    })
    .then(dates => {
      this.setState({ dates });
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  atcFeedHandleClick = (e, data) => {
    const hashedProduct = this.state.products[data.value];
    hashedProduct.ProfilePictureReference = this.state.ProfilePictureReference;
    this.setState({ productAdded: true });
    this.props.atc(hashedProduct);
  }

  notifyHandleClick = (e, data) => {
    console.log(data);
    console.log(this.state.data);

    const { notifyEmail } = this.state.data;
    this.setState({ notifyModalOpen: false });

    if (!isEmail(notifyEmail)) {
      const errors = { email: 'Please Enter Valid Email' }
      this.setState({ errors });
    } else {
      console.log('email is clean');
      this.setState({loading: 'true'});
      const notifyData = {
        EmailAddress: notifyEmail,
        ProductOptionId: data.value,
      };
      console.log(notifyData);
      // const instance = axios.create({timeout: 3000});
      // instance.post('http://www.qa.getchatwith.com/home/CreateNotificationGuest', notifyData)
      api.product.notification(notifyData)
        .then(() => this.setState({ notificationSuccess: 'true' }))
        .catch((err) => this.setState({ notificationSuccess: 'false' }));
    }
  }



  atcVideoMessageHandleClick = (e, data) => {
    this.setState({ modalOpen: false, productAdded: true });
    const hashedProduct = this.state.products[data.value];
    hashedProduct.VideoMessage = this.state.data.VideoMessage;
    hashedProduct.ProfilePictureReference = this.state.ProfilePictureReference;
    this.props.atc(hashedProduct);
  }

  atcLiveHandleClick = (e, data) => {
    this.setState({ liveModalOpen: false, productAdded: true });
    const hashedProduct = this.state.products[data.value];
    hashedProduct.DateMapperId = this.state.DateMapperId;
    hashedProduct.dateObj = this.state.dateObj;
    hashedProduct.dates = this.state.dates;
    this.props.atc(hashedProduct);
  }

  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleNotifyOpen = () => this.setState({ notifyModalOpen: true })
  handleNotifyClose = () => this.setState({ notifyModalOpen: false })

  dateSelect = (e, data) => {
    console.log(e);
    console.log(data);
    const dateObj = {
      date: data.date,
      duration: data.duration
    }
    this.setState({ DateMapperId: data.value, dateObj })
  }

  handleOpenLive = () => this.setState({ liveModalOpen: true })
  handleCloseLive = () => this.setState({ liveModalOpen: false })

  renderDates = dates => dates.map(date => {
    const dateObj = new Date(date.DateSlot);
    return (
      <Card date={dateObj} duration={date.Duration} value={date.DateMapperId} key={date.DateMapperId} onClick={this.dateSelect}>
          <Card.Content>
            {this.state.DateMapperId === date.DateMapperId && (
              <Card.Header textAlign="center">Selected</Card.Header>
              )}
            <Card.Description textAlign="center">{dateObj.toDateString()}</Card.Description>
            <Card.Description textAlign="center">{dateObj.toLocaleTimeString()}</Card.Description>
            <Card.Description textAlign="center">{`(${date.Duration}) Minute Call`}</Card.Description>
          </Card.Content>
        </Card>
    )
  })

  atcFeed = (key, price) => (
    <Button color="olive" value={key} onClick={this.atcFeedHandleClick}>
      <Button.Content>ADD TO CART</Button.Content>
    </Button>
  )

  atcLive = (key) => (
    <Modal 
      key={key}
      trigger={<Button color="olive" onClick={this.handleOpenLive}>ADD TO CART</Button>}
      open={this.state.liveModalOpen}
      closeIcon={<Icon name="window close" onClick={this.handleCloseLive}></Icon>}
    >
      <Modal.Header>
        <Header textAlign="center">
          Available Call Times For Live One-On-One Chat
          <Header.Subheader>These are the times below</Header.Subheader>
        </Header>
      </Modal.Header>
      <Modal.Content scrolling>
        <Segment basic secondary>
          {this.state.dates.length > 0 && (
            <Card.Group itemsPerRow={3}>
              {this.renderDates(this.state.dates)}
            </Card.Group>
          )}
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button value={key} color="green" fluid onClick={this.atcLiveHandleClick}>
          CHECKOUT AND SCHEDULE SESSION
        </Button>
      </Modal.Actions>
    </Modal>
  )

  atcVideo = (key, price) => (
    <Modal key={key} size="tiny" trigger={<Button color="olive" onClick={this.handleOpen}>ADD TO CART</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      closeIcon={<Icon name="window close" onClick={this.handleClose}></Icon>}
    >
      <Modal.Header>
        <Header color="blue" textAlign="center">
          Your Personalized Video Message Request
          <Header.Subheader>Please include a message below and let them know what you would like them to say in your Personalized Video Message.</Header.Subheader>
        </Header>
      </Modal.Header>
      <Modal.Content>
        <Segment basic secondary>
          <Form>
            <Form.Field>
              <TextArea 
                autoHeight
                rows={2}
                maxLength="140"
                placeholder="Enter your request here."
                name="VideoMessage"
                onChange={(e, { value }) => this.setState({
                  ...this.state,
                  data: { ...this.state.data, [e.target.name]: e.target.value }
                })
              } />
            </Form.Field>
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Segment basic floated='left'>You have {140 - this.state.data.VideoMessage.length}/140 chars remaining.</Segment>
        <Button value={key} color='olive' onClick={this.atcVideoMessageHandleClick}>
          <Icon name='checkmark' /> CHECKOUT AND SUBMIT
        </Button>
      </Modal.Actions>
    </Modal>
  )

  notify = (key) => {
    const { errors } = this.state;
    console.log('hello')
    console.log(key);
    return (
      <Modal 
        key={key}
        trigger={<Button color="grey" onClick={this.handleNotifyOpen}>NOTIFY ME WHEN AVILABLE</Button>}
        open={this.state.notifyModalOpen}
        closeIcon={<Icon name="window close" onClick={this.handleNotifyClose}></Icon>}
      >
        <Modal.Header>
          <Header color="blue" textAlign="center">
            Get Notified
            <Header.Subheader>Please enter a valid email address and we'll contact you when product is available.</Header.Subheader>
          </Header>
        </Modal.Header>
        <Modal.Content>
        <Segment basic secondary>
            <Form>
              <Form.Field
                error={!!errors.email}
                type="email"
                id='email'
                control={Input}
                label={`${errors.email !== undefined ? errors.email:'Email *'}`}
                placeholder=''
                name="notifyEmail"
                value={this.state.data.notifyEmail}
                onChange={this.onChange}
              />
            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button value={key} color="green" fluid onClick={this.notifyHandleClick}>
            SUBMIT AND GET NOTIFICATION
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  renderProducts2 = keys => keys.map(key => {
    const hashedProduct = this.state.products[key];
    let product;
    let message;
    let description;
    if (hashedProduct.ProductDescription === 'Feed') {
      description = `Subscription ${hashedProduct.ProductDescription}`;
      message = `Subscribe to receive exclusive video updates from ${hashedProduct.TalentFirstName} ${hashedProduct.TalentLastName}.`;
    } else if (hashedProduct.ProductDescription === 'Video Message') {
      description = hashedProduct.ProductDescription;
      message = `Purchase a personalized video message from ${hashedProduct.TalentFirstName} ${hashedProduct.TalentLastName}.`;
    } else if (hashedProduct.ProductDescription === 'Live Chat') {
      description = hashedProduct.ProductDescription;
      message = `Talk one-on-one with ${hashedProduct.TalentFirstName} ${hashedProduct.TalentLastName} in a video private chat.`;
    }
    if (hashedProduct.CurrentUnfulfilled === 0) {
      product = (this.notify(key));
    } else if (hashedProduct.ProductDescription === 'Feed') {
      product = (this.atcFeed(key, hashedProduct.WebPrice));
    } else if (hashedProduct.ProductDescription === 'Video Message') {
      product = (this.atcVideo(key, hashedProduct.WebPrice));
    } else if (hashedProduct.ProductDescription === 'Live Chat') {
      product = (this.atcLive(key));
    }
    return  (
      <Grid style={{paddingLeft: "1em", paddingRight: "1em"}} key={key}>
        <Grid.Row stretched>
          <Grid.Column style={{padding: "0"}} mobile={16} tablet={16} computer={3}>
            <Segment style={{background: "#e6e6e6"}} basic>
              <Header style={{paddingTop: "10px"}} textAlign='center' color="grey">${hashedProduct.WebPrice}</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column style={{padding: "0"}} mobile={16} tablet={16} computer={10}>
            <Segment secondary basic>
              <Header color="grey">
                {description}
                <Header.Subheader>{message}</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column style={{padding: "0"}} mobile={16} tablet={16} computer={3}>
          {product}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  })

  render() {
    const { FirstName, LastName, ProfilePictureReference, KnownFor, productAdded, notificationSuccess } = this.state;
    return (
      <div>
        {productAdded && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Product Added. Please </Message.Header>
              <Link to="/cart">Go To Cart.</Link>
            </Message.Content>
          </Message>
        )}
        {notificationSuccess === 'true' && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Notification Success. Check Email For Confirmation.</Message.Header>
            </Message.Content>
          </Message>
        )}
        {notificationSuccess === 'false' && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Notification Failed. Check Email And Try Again.</Message.Header>
            </Message.Content>
          </Message>
        )}
        <Grid>
          <Grid.Column only='computer' computer={2}>
            <Segment basic></Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={5} computer={4}>
            <Segment basic><Image style={{maxWidth: "220px", maxHeight: "285px"}} src={ProfilePictureReference} /></Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={10}>
            <Segment style={{paddingLeft: "0"}} basic>
              <Breadcrumb style={{marginBottom: "5px"}}>
                <Breadcrumb.Section style={linkStyle} as={Link} to="/dashboard">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} as={Link} to="/talent">Talent</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section style={linkStyle} active>{`${FirstName} ${LastName}`}</Breadcrumb.Section>
              </Breadcrumb>
              <Header style={{margin: "0", color: "#12457b"}} as='h1'>{`${FirstName.toUpperCase()} ${LastName.toUpperCase()}`}
                <Header.Subheader>{KnownFor}</Header.Subheader>
              </Header>
            </Segment>
            <Segment style={{padding: "0", margin: "0"}} basic><Header style={{color: "#12457b"}} as='h3'>PRODUCTS</Header></Segment>
            {this.state.keys.length > 0 && (this.renderProducts2(this.state.keys))}
            {this.state.keys.length === 0 && this.state.loaded && (
              <Header as='h3' color='red'>Page Under Construction. Check Back Soon.</Header>
            )}
          </Grid.Column>
        </Grid>
        <Segment basic></Segment>
        <Segment basic></Segment>
      </div>
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
