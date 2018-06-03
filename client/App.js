import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from "prop-types";
import HomePage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import FilmAndTvPage from './components/pages/FilmAndTvPage';
import MusicSearchPage from './components/pages/MusicSearchPage';
import TalentPage from './components/pages/TalentPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import GuestRoute from './components/routes/GuestRoute';
import UserRoute from './components/routes/UserRoute';
import TopNavigation from './components/navigation/TopNavigation';

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    {isAuthenticated && <TopNavigation />}
    <GuestRoute
      location={location}
      path='/'
      exact
      component={HomePage}
    />
    <GuestRoute
      location={location}
      path='/login'
      exact
      component={LoginPage}
    />
    <GuestRoute
      location={location}
      path='/signup'
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path='/forgot_password'
      exact
      component={ForgotPasswordPage}
    />
    <UserRoute
      location={location}
      path='/dashboard'
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path='/search/film-and-tv'
      exact
      component={FilmAndTvPage}
    />
    <UserRoute
      location={location}
      path='/search/music'
      exact
      component={MusicSearchPage}
    />
    <UserRoute
      location={location}
      path='/talent/:talentid'
      exact
      component={TalentPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.AppUserId
  }
}

export default connect(mapStateToProps)(App);
