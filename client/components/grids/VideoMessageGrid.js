import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCart } from '../../actions/cartActions';
import { Grid, Segment, Image, Header, Modal, Button, Icon, Form, TextArea, Responsive } from "semantic-ui-react";

class VideoMessage extends Component {
  state = {
    data: {
      VideoMessage: ""
    },
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  hanldeSave = (e, data) => {
    this.setState({ modalOpen: false });
    const { item } = this.props;
    item.VideoMessage = this.state.data.VideoMessage;
    this.props.editCart(item);
  }

  atcVideo = () => (
    <Modal size="tiny" trigger={<Button color="olive"  onClick={this.handleOpen}>EDIT</Button>}
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
                placeholder={this.props.item.VideoMessage}
                name="VideoMessage" onChange={(e, { value }) => this.setState({
                  ...this.state,
                  data: { ...this.state.data, [e.target.name]: e.target.value }
                })
              } />
            </Form.Field>
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Segment basic floated='left'>You have {140 - this.state.data.VideoMessage.length}/140 characters remaining.</Segment>
        <Button value={this.props.item.ProductOptionId} color='green' onClick={this.hanldeSave}>
          <Icon name='checkmark' /> SAVE
        </Button>
      </Modal.Actions>
    </Modal>
  )

  render() {
    const { item, handleRemoveClick } = this.props;
    return (
      <Grid key={item.ProductOptionId} stretched>
      <Grid.Row>
          <Grid.Column mobile={16} tablet={3} computer={3}>
            <Image style={{maxWidth: "132px", maxHeight: "175px"}} src={item.ProfilePictureReference} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={9} computer={9}>
            <Header style={{ color: 'grey' }} as='h3' textAlign='left'>{item.TalentFirstName} {item.TalentLastName}
              <Header.Subheader style={{"fontStyle": 'italic'}}>{item.ProductDescription}</Header.Subheader>
            </Header>
            <p style={{color:"grey"}}>{item.VideoMessage}</p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Responsive {...Responsive.onlyComputer}>
              <Segment basic></Segment>
              <Segment basic></Segment>
            </Responsive>
            <Header as='h4' style={{ color: "#b5cc18" }}>${item.WebPrice}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{paddingTop: "0"}}>
          <Grid.Column only='computer tablet' tablet={3} computer={3}></Grid.Column>
          <Grid.Column mobile={16} tablet={13} computer={13}>
            <div>
              <Button value={item.ProductOptionId} onClick={handleRemoveClick}>REMOVE</Button>
              {this.atcVideo()}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

VideoMessage.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  editCart: PropTypes.func.isRequired
};

export default connect(null, { editCart })(VideoMessage);
