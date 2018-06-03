import React from "react";
import PropTypes from "prop-types";
import { Grid, Image, Segment, Label } from 'semantic-ui-react'
import { connect } from "react-redux";
import { allTalentsSelector } from "../../reducers/talents";
import AddFildAndTvCard from '../cards/AddFilmAndTvCard';
import AddTalentCard from '../cards/AddTalentCard';

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => console.log('dashboard did mount');

  render() {
    const { talents } = this.props;
    return (
      <div>
        <Segment>
          <Label size='big'>
            Subscriptions
          </Label>
        </Segment>
        <Segment>
          <Label size='big'>
            Categories
          </Label>
          <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <AddTalentCard title={'Film and Television'} endpoint={'/talent/film-and-tv'} />
            </Grid.Column>
            <Grid.Column>
              <AddTalentCard title={'Music'} endpoint={'/search/music'} />
            </Grid.Column>
            <Grid.Column>
              <AddTalentCard title={'Sports'} endpoint={'/search/sports'} />
            </Grid.Column>
          </Grid.Row>
          </Grid>
        </Segment>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <AddTalentCard title={'Film and Television'} endpoint={'/talent/film-and-tv'} />
            </Grid.Column>
            <Grid.Column>
              <AddTalentCard title={'Music'} endpoint={'/search/music'} />
            </Grid.Column>
            <Grid.Column>
              <AddTalentCard title={'Sports'} endpoint={'/search/sports'} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={5}>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/images/man.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  talents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    talents: allTalentsSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);