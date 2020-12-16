import React from 'react';
import 'semantic-ui-css/semantic.css';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

/** The NavbarAddition appears at the bottom of every page. Rendered by the App Layout component. */

class NavbarAddition extends React.Component {

  render() {
    const header = { fontSize: '15px', color: 'white' };
    const navColor = { backgroundColor: '#b11b29', paddingLeft: '50px', paddingTop: '20px', paddingBottom: '20px' };
    // eslint-disable-next-line no-unused-vars
    const marginFix = { marginRight: '1px' };
    return (
        <Container textAlign="center" style={navColor}>
          <div style={header}><a style={{ color: 'white' }} href="https://manoa.hawaii.edu/covid19/">COVID-19 – UH Mānoa
            updates</a> and <a style={{ color: 'white' }} href="https://manoa.hawaii.edu/moving-forward/">COVID-19
            FAQs</a></div>
        </Container>
    );
  }
}

export default NavbarAddition;
