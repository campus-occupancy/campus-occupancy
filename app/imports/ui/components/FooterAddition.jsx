import React from 'react';
import 'semantic-ui-css/semantic.css';

import 'semantic-ui-css/semantic.min.css';
import { Container, Icon } from 'semantic-ui-react';

/** The FooterAddition appears at the bottom of every page. Rendered by the App Layout component. */

class FooterAddition extends React.Component {

  render() {
    const header = { fontSize: '12px', color: 'white' };
    const footercolor = {
      backgroundColor: '#376551',
      paddingLeft: '50px',
      paddingTop: '20px',
      paddingBottom: '20px',
      width: 'auto',
    };
    const marginFix = { marginRight: '1px' };
    return (
        <Container textAlign="left" style={footercolor}>
          <div style={header}>The University of Hawaiʻi is an equal opportunity/affirmative action institution</div>
          <div style={header}><Icon name='copyright outline' size='small' style={marginFix}/>2020 University of Hawaiʻi
            at Mānoa • 2500 Campus Road • Honolulu, HI 96822 • (808) 956-8111
          </div>
        </Container>
    );
  }
}

export default FooterAddition;
