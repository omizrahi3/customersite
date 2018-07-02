import React from 'react'
import { Grid, List } from 'semantic-ui-react'

const Footer = () => {
  return (
    <div className="footer">
      <Grid columns='equal'>
        <Grid.Row >
          <Grid.Column>
          <List link>
            <List.Item active>Home</List.Item>
            <List.Item as='a'>About</List.Item>
            <List.Item as='a'>Jobs</List.Item>
            <List.Item as='a'>Team</List.Item>
          </List>
          </Grid.Column>
          <Grid.Column>
          <List link>
            <List.Item active>Home</List.Item>
            <List.Item as='a'>About</List.Item>
            <List.Item as='a'>Jobs</List.Item>
            <List.Item as='a'>Team</List.Item>
          </List>
          </Grid.Column>
          <Grid.Column>
          <List link>
            <List.Item active>Home</List.Item>
            <List.Item as='a'>About</List.Item>
            <List.Item as='a'>Jobs</List.Item>
            <List.Item as='a'>Team</List.Item>
          </List>
          </Grid.Column>
          <Grid.Column>
          <List link>
            <List.Item active>Home</List.Item>
            <List.Item as='a'>About</List.Item>
            <List.Item as='a'>Jobs</List.Item>
            <List.Item as='a'>Team</List.Item>
          </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Footer
