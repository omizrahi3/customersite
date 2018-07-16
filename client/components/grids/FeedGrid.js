import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Card, Image, Header, Button, List } from "semantic-ui-react";

const FeedGrid = ({ item, handleRemoveClick }) => (
  <Grid key={item.ProductOptionId}>
    <Grid.Column width={3}>
      <Image style={{maxWidth: "132px", maxHeight: "175px"}} src={item.ProfilePictureReference} />
    </Grid.Column>
    <Grid.Column width={9}>
      <Header style={{ color: 'grey' }} as='h3' textAlign='left'>{item.TalentFirstName} {item.TalentLastName}
        <Header.Subheader style={{"fontStyle": 'italic'}}>{item.ProductDescription}</Header.Subheader>
      </Header>
      <Segment basic></Segment>
      <Segment basic></Segment>
      <div>
        <Button value={item.ProductOptionId} onClick={handleRemoveClick}>REMOVE</Button>
      </div>
    </Grid.Column>
    <Grid.Column width={4}>
      <Segment basic></Segment>
      <Segment basic>
        <Header as='h4' style={{color: "#b5cc18"}}>${item.WebPrice}/mo</Header>
      </Segment>
      <Segment basic></Segment>
    </Grid.Column>
  </Grid>
);

FeedGrid.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
};

export default FeedGrid;