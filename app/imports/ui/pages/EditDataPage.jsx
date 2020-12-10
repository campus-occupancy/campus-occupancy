import React from 'react';
import { Container, Grid, Header, Button, Image } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class EditDataPage extends React.Component {
  render() {
    const landingColor = { backgroundColor: 'white', paddingLeft: '50px', paddingTop: '20px', paddingBottom: '20px' };
    return (
        <div id="importDatapage">
          <div style={landingColor}>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '15px', color: '#376551', fontSize: '30pt', letterSpacing: '2px' }} as='h1'>
                <Image src="images/manoaseal_transparent.png" style={{ width: '75px' }}/>
                University of Hawaii Campus Occupancy
              </Header>
              <div style={{ paddingBottom: '20px', color: '#376551', fontWeight: '500', letterSpacing: '2px' }}>
                Upload JSON or .csv file to Generate Map
              </div>
            </Container>
          </div>
          <div className={['background-landing-page']}>
            <Grid container stackable columns={2} textAlign='center'>
              <Grid.Column>
                <Button color='black' as="label" htmlFor="file" type="button">
                  Upload
                </Button>
                <input type="file" id="file" style={{ display: 'hidden' }} onChange={this.onChange} />
              </Grid.Column>
              <Grid.Column>
                <Button color='black'>Generate Map</Button>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

export default EditDataPage;
