import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCart } from '../../actions/cartActions';
import { Grid, Segment, Image, Breadcrumb, Header, Modal, Button, Icon, Label, Form, TextArea } from "semantic-ui-react";

class VideoMessage2 extends Component {
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
    console.log(this.state);
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
      <Grid.Row key={item.ProductOptionId} stretched>
        <Grid.Column width={4}>
          <Image src={item.ProfilePictureReference} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment basic vertical>
            <Header as='h3'>
              <Header.Content>
                {item.TalentFirstName} {item.TalentLastName}
                <Header.Subheader>{item.ProductDescription}</Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>
          <Segment basic vertical>
            <Header as='h4'>
              {item.VideoMessage}
            </Header>
          </Segment>
          <Segment basic vertical textAlign='right'>
            <Header as='h4' color='green'>
              ${item.WebPrice}
            </Header>
          </Segment>
          <div>
            <Button value={item.ProductOptionId} onClick={handleRemoveClick}>REMOVE</Button>
            {this.atcVideo()}
          </div>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

VideoMessage2.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  editCart: PropTypes.func.isRequired
};

export default connect(null, { editCart })(VideoMessage2);
