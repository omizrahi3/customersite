import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Image, Header, Button } from "semantic-ui-react";

const VideoMessageGrid = ({ item, handleRemoveClick }) => (
  <Grid.Row key={item.ProductOptionId} stretched>
    <Grid.Column width={4}>
      <Image src={item.ProfilePictureReference} />
    </Grid.Column>
    <Grid.Column width={12}>
      <Segment basic vertical>
        <Header as='h3'>
          {item.TalentFirstName} {item.TalentLastName}
        </Header>
      </Segment>
      <Segment basic vertical>
        <Header as='h4'>
          {item.ProductDescription}
        </Header>
      </Segment>
      <Segment basic vertical textAlign='right'>
        <Header as='h4' color='green'>
          ${item.WebPrice}
        </Header>
      </Segment>
      <div>
        <Button value={item.ProductOptionId} onClick={handleRemoveClick}>REMOVE</Button>
        <Button>EDIT</Button>
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