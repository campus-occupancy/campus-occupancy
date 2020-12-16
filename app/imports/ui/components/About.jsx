import React from 'react';
import 'semantic-ui-css/semantic.css';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Container } from 'semantic-ui-react';

export default class Content extends React.Component {

  render() {
    const color = {
      boxShadow: 'none',
      border: 'none', margin: '2rem 130px',
    };
    const text = { fontSize: '18.5px', letterSpacing: '2px' };
    const better = { padding: '30px' };
    return (
        <Container style={better}>
          <Segment textAlign="center" style={color}>
            <p style={text}>Campus Occupancy is an application that shows the visualization of density on the UH Manoa
              campus. This app allows you view the amount of people in each building on the campus, just simply click on
              the building to view the amount of people. It also allows you to import data to create a new visualization
              based on the date or time.
            </p>
            <p style={text}>Our goal is to provide information for Manoa students to help keep them safe while attending
              classes on campus. </p>
          </Segment>
        </Container>
    );
  }
}
