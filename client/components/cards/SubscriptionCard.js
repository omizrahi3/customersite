import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SubscriptionCard = ({ ProductId, TalentFirstName, TalentLastName, Description, ProfilePictureReference }) => (
  <Card as={Link} to={{
    pathname: `/subscriptions/${ProductId}`,
    state: {
      TalentFirstName,
      TalentLastName,
      Description,
      ProfilePictureReference
    }
  }} raised image={ProfilePictureReference}>
  </Card>
);  

SubscriptionCard.propTypes = {
  TalentFirstName: PropTypes.string.isRequired,
  TalentLastName: PropTypes.string.isRequired,
  ProfilePictureReference: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ProductId: PropTypes.string.isRequired
};

export default SubscriptionCard;