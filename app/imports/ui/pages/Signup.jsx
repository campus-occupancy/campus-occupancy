import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profiles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Profiles.insert({ email }, (err2) => {
          if (err2) {
            this.setState({ error: err2.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div
            style={{
              height: '550px',
              'background-color': 'beige',
              'padding-top': '10vh',
              'padding-bottom': '10vh',
            }}>
          <Container id="signup-page">
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column padded>
                <Form onSubmit={this.submit}>
                  <Segment raised style={{ padding: '0px', border: '4px solid black' }}>
                    <Container text fluid textAlign='center'
                               style={{
                                 'padding-top': '20px',
                                 'padding-bottom': '20px',
                                 'background-color': '#376551',
                                 'margin-bottom': '40px',
                               }}>
                      <Header inverted as='h1' textAlign="center">
                        Sign up for a new account
                      </Header>
                    </Container>
                    <Form.Input
                        className='form-small'
                        size='large'
                        id="signup-form-email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="Enter E-mail Address"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        className='form-small'
                        size='large'
                        id="signup-form-password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Enter A Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Button size='large' fluid className='form-small' id="signup-form-submit" content="Submit"/>
                    <Message>
                      Already have an account? Login <Link to="/signin">here</Link>
                    </Message>
                  </Segment>
                </Form>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Registration was not successful"
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
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
