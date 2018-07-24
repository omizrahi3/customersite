import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Card, Image, Header, Button, Responsive } from "semantic-ui-react";

const FeedGrid = ({ item, handleRemoveClick }) => (
  <Grid key={item.ProductOptionId}>
    <Grid.Row>
      <Grid.Column mobile={16} tablet={3} computer={3}>
        <Image style={{maxWidth: "132px", maxHeight: "175px"}} src={item.ProfilePictureReference} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={9} computer={9}>
        <Header style={{ color: 'grey' }} as='h3' textAlign='left'>{item.TalentFirstName} {item.TalentLastName}
          <Header.Subheader style={{"fontStyle": 'italic'}}>{item.ProductDescription}</Header.Subheader>
        </Header>
        <div style={{color:"grey"}}></div>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={4} computer={4}>
        <Responsive {...Responsive.onlyComputer}>
          <Segment basic></Segment>
          <Segment basic></Segment>
        </Responsive>
        <Header as='h4' style={{color: "#b5cc18"}}>${item.WebPrice}/mo</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column only='computer tablet' tablet={3} computer={3}></Grid.Column>
      <Grid.Column mobile={16} tablet={13} computer={13}>
        <div>
          <Button value={item.ProductOptionId} onClick={handleRemoveClick}>REMOVE</Button>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

FeedGrid.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
};

export default FeedGrid;