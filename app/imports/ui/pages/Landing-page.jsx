import React from 'react';
import { Grid, Image, Container, Header } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class LandingPage extends React.Component {
  render() {
    return (
        <div id="landing-page">
          <div className='landing-green-background'>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
                University of Hawaii Visualizing Campus Occupancy
              </Header>
              <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
                Start by making your profile....
              </Header>
            </Container>
          </div>
          <div className={['background-landing-page']}>
              <Header style={{ color: '#376551' }} as='h2' textAlign='center'></Header>
            <Grid container stackable columns='equal' textAlign='center'>
              <Grid.Column>
                <Image src="/images/home-page.png"/>
              </Grid.Column>
              <Grid.Column>
                <Image src="/images/profiles-page.png"/>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

export default LandingPage;
