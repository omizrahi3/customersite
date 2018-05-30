import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TalentLinkCard = ({ TalentId, FirstName, LastName, KnownFor, ProfilePictureReference }) => (
  <Card as={Link} to={{
    pathname: `/talent/${TalentId}`,
    state: {
      FirstName,
      LastName,
      KnownFor,
      ProfilePictureReference
    }
  }} centered>
    <Image src={ProfilePictureReference} />
    <Card.Content textAlign="center">
      <Card.Header>{`${FirstName} ${LastName}`}</Card.Header>
      {`${KnownFor.substring(0, 10)}`}
    </Card.Content>
  </Card>
);  

TalentLinkCard.propTypes = {
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  ProfilePictureReference: PropTypes.string.isRequired,
  KnownFor: PropTypes.string.isRequired,
  TalentId: PropTypes.string.isRequired
};

export default TalentLinkCard;
