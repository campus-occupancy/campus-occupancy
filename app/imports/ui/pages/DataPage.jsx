import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class DataPage extends React.Component {
  render() {
    return (
        <div id="landing-page">
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
          <div className={['background-landing-page']}>
            <Grid container stackable columns={2} textAlign='center'>
              <Grid.Column>
                <Header as='h3'>Json File in Imported Form</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3'>Json File Data in Table Form</Header>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

export default DataPage;
