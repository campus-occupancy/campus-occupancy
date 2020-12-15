import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Button, Icon, Image } from 'semantic-ui-react';
import Covid19 from '../../api/Covid19/Covid19';
import Covid19Map from '../components/Covid19Map';

/** Renders a color-blocked static landing page. */

class LandingPage extends React.Component {
  render() {
    const landingColor = { backgroundColor: 'white', paddingLeft: '50px', paddingTop: '20px', paddingBottom: '20px' };
    return (
        <div id="landing-page">
          <div style={landingColor}>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '15px', color: '#376551', fontSize: '30pt', letterSpacing: '2px' }}
                      as='h1'><Image src="images/manoaseal_transparent.png" style={{ width: '75px' }}/>
                University of Hawaii Campus Occupancy
              </Header>
              <div style={{ paddingBottom: '10px', color: '#376551', fontWeight: '500', letterSpacing: '2px' }}>
                Log in to Access Data Visualization
              </div>
            </Container>
          </div>
          <div><Covid19Map/></div>
        </div>
    );
  }
}

export default LandingPage;
