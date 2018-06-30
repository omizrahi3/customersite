import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Image, Header, Button, Modal } from "semantic-ui-react";

const VideoMessageGrid = ({ item, handleRemoveClick }) => (
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
        <Modal trigger={<Button>EDIT</Button>} closeIcon>
          <Modal.Content>
            <p>
              Your inbox is getting full, would you like us to enable automatic archiving of old messages?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green'>Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Button>IS THIS A GIFT?</Button>
      </div>
    </Grid.Column>
  </Grid.Row>
);

VideoMessageGrid.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
};

export default VideoMessageGrid;