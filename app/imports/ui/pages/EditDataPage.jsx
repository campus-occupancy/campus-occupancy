import React from 'react';
import { Container, Grid, Header, Button, Segment, Input, Form } from 'semantic-ui-react';
import Papa from 'papaparse';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { Datas } from '../../api/dataDensity/Datas';

/** Renders a color-blocked static landing page. */
class EditDataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      file: event.target.files[0],
    });
  };

  importCSV = () => {
    const { file } = this.state;
    if (file !== undefined) {
      Papa.parse(file, {
        complete: this.updateData,
        header: true,
      });
    } else {
      swal({
        icon: 'warning',
        text: 'Warning No File Detected.',
        button: 'Ok',
      });
    }
  };

  updateData(result) {
    const data = result.data;
    // remove the extra item when uploading excel .cvs files
    for (let i = 0; i < data.length; i++) {
      if (data[i].Device === '') {
        data.pop();
      }
    }
    // look for undefined in data and empties
    const date = _.pluck(data, 'dateTime');
    const building = _.pluck(data, 'Building');
    const val = _.pluck(data, 'Unique');
    const checkDate = _.contains(date, '');
    const checkValue = _.contains(val, '');
    const checkBuilding = _.contains(building, '');
    const wrongDate = _.contains(date, undefined);
    const wrongVal = _.contains(val, undefined);
    const wrongBuilding = _.contains(building, undefined);
    // Check if the datas from the file is valid by looking for datetime, Unique and Building
    console.log(data.includes(undefined));
    if (checkDate === false &&
        wrongDate === false &&
        wrongVal === false &&
        wrongBuilding === false &&
        checkValue === false &&
        // eslint-disable-next-line no-restricted-globals
        isNaN(val.join('')) === false &&
        checkBuilding === false &&
        data.includes(undefined) === false) {
      data.map(nums => Datas.insert(nums));
      swal({
        icon: 'success',
        text: `The File containing ${data.length} was successfully added to the Database.`,
        button: 'Ok',
      });
    } else {
      swal({
        icon: 'error',
        text: 'Error The File Cannot be Read. ',
        button: 'Ok',
      });
    }
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
                <Segment>
                  <Container>
                    <Form widths='equal'>
                      <Input
                        size='large'
                        fluid type="file"
                        id="file"
                        ref={input => { this.filesInput = input; }}
                        style={{ display: 'hidden', marginBottom: '10px' }}
                        onChange={this.handleChange}/>
                      <Button color='black' onClick={this.importCSV}>
                        Upload File
                      </Button>
                    </Form>
                  </Container>
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
