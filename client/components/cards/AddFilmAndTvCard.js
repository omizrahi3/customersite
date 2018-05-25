import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddFilmAndTvCard = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Film and Television</Card.Header>
      <Link to="/talent/film-and-tv">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddFilmAndTvCard;
