import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import Covid19 from '../../api/Covid19/Covid19';

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
              <Button id='login-button' inverted style={{ marginBottom: '20px' }} size='huge' as={NavLink} exact to="/signin" animated>
                <Button.Content visible>
                  Log In
                </Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right'/>
                </Button.Content>
              </Button>
            </Container>
          </div>
          <div><Covid19/></div>
        </div>
    );
  }
}

export default LandingPage;
