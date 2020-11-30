import React from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Button, Divider } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <div
            style={{
              height: '550px',
              'background-color': 'beige',
              'padding-top': '10vh',
              'padding-bottom': '10vh',
            }}>
          <Container
              textAlign='center'
              className='landing-green-background'
              style={{ width: '500px' }}>
            <Header inverted id="signout-page" as="h1" textAlign="center">
              Log Out
            </Header>
            <Header inverted as='h3' textAlign='center'>
              You have Successfully Logged Out of the Application
            </Header>
            <div style={ { marginTop: '20px' } }>
              <Button id='home-button' inverted style={{ marginBottom: '20px' }} size='huge' as={NavLink} exact to='/'>Home</Button>
              <Divider>Or</Divider>
              <Button id='login-button' inverted
                      style={{
                        marginBottom: '20px',
                        marginTop: '20px' }}
                      size='huge'
                      as={NavLink} exact to='/signin'>
                Log In
              </Button>
            </div>
          </Container>
        </div>
    );
  }
}
