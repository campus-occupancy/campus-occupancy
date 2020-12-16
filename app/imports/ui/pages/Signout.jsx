import React from 'react';
// import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
// import { Container, Header, Button, Divider } from 'semantic-ui-react';
// import Landing from './Landing';
import LandingPage from './Landing-page';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
          <LandingPage id='signout-page'/>
    );
  }
}
