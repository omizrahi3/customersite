import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCart } from '../../actions/cartActions';
import { Grid, Segment, Image, Card, Header, Modal, Button, Icon, Responsive } from "semantic-ui-react";

class LiveChatGrid extends Component {
  state = {
    DateMapperId: '',
    liveModalOpen: false,
    dateObj: {}
  }

  componentDidMount() {
    console.log('LiveChatGrid did mount');
    console.log(this.props.item);
  }

  handleOpenLive = () => this.setState({ liveModalOpen: true })
  handleCloseLive = () => this.setState({ liveModalOpen: false })

  dateSelect = (e, data) => {
    console.log(data.value);
    const dateObj = {
      date: data.date,
      duration: data.duration
    }
    this.setState({ DateMapperId: data.value, dateObj })
  }

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

  atcLiveHandleClick = (e, data) => {
    this.setState({ liveModalOpen: false });
    const { item } = this.props;
    item.DateMapperId = this.state.DateMapperId;
    item.dateObj = this.state.dateObj;
    this.props.editCart(item);
  }

  hanldeSave = (e, data) => {
    this.setState({ modalOpen: false });
    console.log(this.state);
    const { item } = this.props;
    item.VideoMessage = this.state.data.VideoMessage;
    this.props.editCart(item);
  }

  atcLive = () => (
    <Modal 
      trigger={<Button color="olive" onClick={this.handleOpenLive}>EDIT</Button>}
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
          {this.props.item.dates.length > 0 && (
            <Card.Group itemsPerRow={3}>
              {this.renderDates(this.props.item.dates)}
            </Card.Group>
          )}
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button value={this.props.item.ProductOptionId} color="green" fluid onClick={this.atcLiveHandleClick}>
          CHECKOUT AND SCHEDULE SESSION
        </Button>
      </Modal.Actions>
    </Modal>
  )

  render() {
    const { item, handleRemoveClick } = this.props;
    const date = new Date(item.dateObj.date);
    const duration = item.dateObj.duration;
    return (
      <Grid key={item.ProductOptionId}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={3} computer={3}>
            <Image style={{maxWidth: "132px", maxHeight: "175px"}} src={item.ProfilePictureReference} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={9} computer={9}>
            <Header style={{ color: 'grey' }} as='h3' textAlign='left'>{item.TalentFirstName} {item.TalentLastName}
              <Header.Subheader style={{"fontStyle": 'italic'}}>{item.ProductDescription}</Header.Subheader>
            </Header>
            <div style={{color:"grey"}}>{date.toDateString()}</div>
            <div style={{color:"grey"}}>{date.toLocaleTimeString()}</div>
            <div style={{color:"grey"}}>{`(${duration}) Minute Call`}</div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Responsive {...Responsive.onlyComputer}>
              <Segment basic></Segment>
              <Segment basic></Segment>
            </Responsive>
            <Header as='h4' style={{ color: "#b5cc18" }}>${item.WebPrice}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column only='computer tablet' tablet={3} computer={3}></Grid.Column>
          <Grid.Column mobile={16} tablet={13} computer={13}>
            <div>
              <Button value={item.ProductOptionId} onClick={handleRemoveClick}>REMOVE</Button>
              {this.atcLive()}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

LiveChatGrid.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  editCart: PropTypes.func.isRequired
};

export default connect(null, { editCart })(LiveChatGrid);
