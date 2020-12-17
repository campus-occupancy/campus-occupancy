import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class LogIn extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/data' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <div style={{
          height: '550px',
          backgroundColor: 'beige',
          paddingTop: '10vh',
          paddingBottom: '10vh',
        }}>
          <Container id="signin-page">
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Form onSubmit={this.submit}>
                  <Segment raised style={{ padding: '0px', border: 'none' }}>
                    <Container text fluid textAlign='center'
                               style={{
                                 paddingTop: '20px',
                                 paddingBottom: '20px',
                                 backgroundColor: '#376551',
                                 marginBottom: '40px',
                               }}>
                      <Header inverted as='h1' style={{ letterSpacing: '2px' }}>LOGIN</Header>
                    </Container>
                    <Form.Input
                        className='form-small'
                        size='large'
                        id="signin-form-email"
                        icon={<Icon name='user'/>}
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="UH Username"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        className='form-small'
                        size='large'
                        id="signin-form-password"
                        icon={<Icon name='lock'/>}
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Button size='large' fluid className='form-small' id="signin-form-submit" content="Submit"/>
                    <Message style={{ backgroundColor: '#363636', border: 'none' }}>
                      <Container textAlign='center' id='signup-page'>
                        <Link to="/signup" style={{ color: 'white' }}>Don&apos;t have a Login? Click here to Register</Link></Container>
                    </Message>
                  </Segment>
                </Form>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Login was not successful"
                        content={this.state.error}
                    />
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
LogIn.propTypes = {
  location: PropTypes.object,
};
