import React from 'react';
import { Container, Grid, Image, Segment } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const header = { fontSize: '14px', color: 'white', paddingBottom: '5px', letterspacing: '3px' };
    const footercolor = { backgroundColor: '#363636', paddingLeft: '50px', paddingTop: '50px', paddingBottom: '50px' };
    const footercolor2 = { backgroundColor: '#363636', border: 'none', boxShadow: 'none' };
    const columnpicAdjust = { paddingLeft: '70px' };
    return (
        <div>
          <Container textAlign="left" style={footercolor}>
            <Segment style={footercolor2}>
              <Grid columns={3} relaxed='very'>
                <Grid.Column style={columnpicAdjust}>
                  <p>
                    <Image size='medium' src="/images/uhm-white-seal-nameplate.png" />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <div style={header}>
                    A-Z Index
                  </div>
                  <div style={header}>
                    Academic Calendar
                  </div>
                  <div style={header}>
                    Accessibility at UH
                  </div>
                  <div style={header}>
                    Campus Directory
                  </div>
                  <div style={header}>
                    Campus Maps
                  </div>
                  <div style={header}>
                    Parking & Transportation
                  </div>
                  <div style={header}>
                    Visiting the Campus
                  </div>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
              </Grid>
              </Segment>
          </Container>
        </div>
  );
}
}

export default Footer;
