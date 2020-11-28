import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import Covid19 from '../../api/Covid19/Covid19';

/** Renders a color-blocked static landing page. */
class Data extends React.Component {
  render() {
    return (
        <div id="data-page">
          <div className='landing-green-background'>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
                University of Hawaii Campus Occupancy
              </Header>
              <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
                Data Set to be Mapped.
              </Header>
            </Container>
          </div>
          <div>
            <Grid container stackable columns={2} textAlign='center'>
              <Grid.Column>
                <Header as='h3'>Json File in Imported Form</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3'>Json File Data in Table Form</Header>
              </Grid.Column>
            </Grid>
            <div><Covid19/></div>
          </div>
        </div>

    );
  }
}

export default Data;
