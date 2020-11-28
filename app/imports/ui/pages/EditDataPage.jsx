import React from 'react';
import { Container, Grid, Header, Button } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class EditDataPage extends React.Component {
  render() {
    return (
        <div id="editDatePage">
          <div className='landing-green-background'>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
                University of Hawaii Campus Occupancy
              </Header>
              <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
                Upload JSON or .csv file to Generate Map
              </Header>
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
