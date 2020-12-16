import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Covid19Map from '../components/Covid19Map';
import { Datas } from '../../api/dataDensity/Datas';
/** Renders a color-blocked static landing page. */

class LandingPage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const landingColor = { backgroundColor: 'white', paddingLeft: '50px', paddingTop: '20px', paddingBottom: '20px' };
    return (
        <div id='landing-page'>
          <div style={landingColor}>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '15px', color: '#376551', fontSize: '30pt', letterSpacing: '2px' }}
                      as='h1'><Image src="images/manoaseal_transparent.png" style={{ width: '75px' }}/>
                University of Hawaii Campus Occupancy
              </Header>
              <div style={{ paddingBottom: '10px', color: '#376551', fontWeight: '500', letterSpacing: '2px' }}>
                Log in to Access Data Visualization
              </div>
            </Container>
          </div>
          <div><Covid19Map
              datas = {this.props.datas}
          /></div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
LandingPage.propTypes = {
  datas: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Data documents.
  const subscription = Meteor.subscribe('Datas');
  return {
    datas: Datas.find({}).fetch(),
    ready: subscription.ready(),
  };
})(LandingPage);
