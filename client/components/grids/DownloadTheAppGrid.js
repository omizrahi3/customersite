import React, { Component } from 'react';
import { Menu, Header, Image, Divider } from "semantic-ui-react";

const marginFix = {
  margin: "0"
};

const divFix = {
  display: "block",
  float:"left"
};

const imageFix = {
  width: "125px"
}

class DownloadTheAppGrid extends Component {
  state = {}

  render() {
    return (
      <div>
        <Menu style={marginFix} secondary>
          <Menu.Menu style={marginFix} position="left">
            <Header color='grey'>DOWNLOAD THE APP</Header>
          </Menu.Menu>
        </Menu>
        <Divider style={marginFix} />
        <div>
        <Image.Group>
          <Image style={imageFix} src="https://getchatwith.com/wp-content/uploads/2018/04/apple-store.png" />
          <Image style={imageFix} src="https://getchatwith.com/wp-content/uploads/2018/04/google-play.png" />
        </Image.Group>
        </div>
      </div>
    )
  }
}

export default DownloadTheAppGrid