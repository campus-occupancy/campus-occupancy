import React from 'react';
import { Container, Grid, Header, Button, Segment } from 'semantic-ui-react';
import Papa from 'papaparse';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { Datas } from '../../api/dataDensity/Datas';


/** Renders a color-blocked static landing page. */
class EditDataPage extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0],
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true,
    });
    if (this.state) {
      swal('File was Succesfully Imported.');
    }
    if (this.state === null) {
      swal('Err.');

    }

  };

  updateData(result) {
    const data = result.data;
    data.map(nums => Datas.insert(nums));

  }

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
                <Segment><input type="file" id="file" ref={input => {
                  this.filesInput = input;
                }}style={{ display: 'hidden' }} onChange={this.handleChange} />
                <Button color='black' onClick={this.importCSV}>Import Now!</Button>
                </Segment>
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
