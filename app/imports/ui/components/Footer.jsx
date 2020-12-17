import React from 'react';
import { Container, Grid, Image, Segment } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const header = { fontSize: '14px', color: 'white', paddingBottom: '5px', letterspacing: '3px' };
    const footercolor = {
      backgroundColor: '#363636',
      paddingLeft: '50px',
      paddingTop: '50px',
      paddingBottom: '50px',
      width: 'auto',
    };
    const footercolor2 = { backgroundColor: '#363636', border: 'none', boxShadow: 'none' };
    const columnpicAdjust = { paddingLeft: '70px' };
    return (
        <div>
          <Container textAlign="left" style={footercolor}>
            <Segment style={footercolor2}>
              <Grid columns={3} relaxed='very'>
                <Grid.Column style={columnpicAdjust}>
                  <p>
                    <Image size='medium' src="/images/uhm-white-seal-nameplate.png"/>
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <div style={header}>
                    < a href='https://manoa.hawaii.edu/a-z/'> A-Z Index </a>
                  </div>
                  <div style={header}>
                    < a href='https://manoa.hawaii.edu/registrar/academic-calendar/'> Academic Calendar </a>
                  </div>
                  <div style={header}>
                    < a href='https://www.hawaii.edu/access/'> Accessibility at UH </a>
                  </div>
                  <div style={header}>
                    < a href='https://www.hawaii.edu/access/'> Campus Directory </a>
                  </div>
                  <div style={header}>
                    < a href='https://manoa.hawaii.edu/directory/'> Campus Maps </a>
                  </div>
                  <div style={header}>
                    <a href='https://manoa.hawaii.edu/commuter/'> Parking & Transportation </a>
                  </div>
                  <div style={header}>
                    <a href='https://manoa.hawaii.edu/about/visit/'> Visiting the Campus </a>
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
