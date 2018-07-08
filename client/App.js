import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from "prop-types";
import HomePage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ProfilePage from './components/pages/ProfilePage';
import TalentLandingPage from './components/pages/TalentLandingPage';
import MusicSearchPage from './components/pages/MusicSearchPage';
import SportsSearchPage from './components/pages/SportsSearchPage';
import BrandSearchPage from './components/pages/BrandSearchPage';
import TalentPage from './components/pages/TalentPage';
import CartPage from './components/pages/CartPage';
import BillingPage from './components/pages/BillingPage';
import SubscriptionPage from './components/pages/SubscriptionPage';
import CheckoutPage from './components/pages/CheckoutPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import GuestRoute from './components/routes/GuestRoute';
import UserRoute from './components/routes/UserRoute';
import NavigationBar from './components/navigation/NavigationBar';

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    <NavigationBar />
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
    <GuestRoute
      location={location}
      path='/reset_password'
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path='/dashboard'
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path='/profile'
      exact
      component={ProfilePage}
    />
    <Route
      location={location}
      path='/talent'
      exact
      component={TalentLandingPage}
    />
    <Route
      location={location}
      path='/categories/music'
      exact
      component={MusicSearchPage}
    />
    <Route
      location={location}
      path='/categories/brand'
      exact
      component={BrandSearchPage}
    />
    <Route
      location={location}
      path='/categories/sports'
      exact
      component={SportsSearchPage}
    />
    <Route
      location={location}
      path='/talent/:talentid'
      exact
      component={TalentPage}
    />
    <UserRoute
      location={location}
      path='/subscriptions/:subscriptionid'
      exact
      component={SubscriptionPage}
    />
    <Route
      location={location}
      path='/cart'
      exact
      component={CartPage}
    />
    <UserRoute
      location={location}
      path='/checkout/:productid'
      exact
      component={CheckoutPage}
    />
    <Route
      location={location}
      path='/billing'
      exact
      component={BillingPage}
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
