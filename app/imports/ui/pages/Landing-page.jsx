import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Button, Icon } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class LandingPage extends React.Component {
  render() {
    return (
        <div id="landing-page">
          <div className='landing-green-background'>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
                University of Hawaii Campus Occupancy
              </Header>
              <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
                Log in to Access Data Visualization
              </Header>
              <Button inverted style={{ marginBottom: '20px' }} size='huge' as={NavLink} exact to="/signin" animated>
                <Button.Content visible>
                  Log In
                </Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right'/>
                </Button.Content>
              </Button>
            </Container>
          </div>
          <div className={['background-landing-page']}/>
        </div>
    );
  }
}

export default LandingPage;
