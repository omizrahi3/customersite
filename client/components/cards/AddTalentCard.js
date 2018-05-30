import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddTalentCard = ({ title, endpoint }) => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>{title}</Card.Header>
      <Link to={endpoint}>
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

AddTalentCard.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
};

export default AddTalentCard;