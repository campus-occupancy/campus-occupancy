import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Segment, TransitionablePortal, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component.
 * Currently nav bar contains the the home logo, data, edit data and sign out at left side
 * The navbar logo will take user back to the data page. */
class CampusNavBar extends React.Component {
  state = { open: false }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  render() {
    const menuStyle = {
      backgroundColor: '#376551',
      marginBottom: '0px',
      marginTop: '-1px',
      border: 'none',
      paddingLeft: '30px',
      paddingBottom: '10px',
      paddingTop: '10px',
    };
    const { open } = this.state;

    return (
        <Menu style={menuStyle} attached="top" borderless>
          {this.props.currentUser === '' ? (
              <Menu.Item as={NavLink} activeClassName="" exact to="/signin">
                <span className='bowfolio-green'
                      style={{ color: 'white', fontWeight: 800, fontSize: '24px', letterSpacing: '2px' }}>Login</span>
              </Menu.Item>
          ) : (
              <Menu.Item as={NavLink} activeClassName="" exact to="/data">

                <span className='bowfolio-green' style={{
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '24px',
                  letterSpacing: '2px',
                }}>Hello, {this.props.currentUser}!</span>
              </Menu.Item>
          )}
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} id="dataMenuPage" activeClassName="active" exact to="/data" key='dataPage'
                          style={{ color: 'white', fontWeight: 500, fontSize: '15px', letterSpacing: '2px' }}>Data
                Page</Menu.Item>,
                <Menu.Item as={NavLink} id="importDatapage" activeClassName="active" exact to="/import" key='editData'
                           style={{ color: 'white', fontWeight: 500, fontSize: '15px', letterSpacing: '2px' }}>Import
                  Data</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin"
                         key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser ? (
                <TransitionablePortal
                    closeOnTriggerClick
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    openOnTriggerClick
                    trigger={
                      <Menu.Item id="navbar-sign-out" icon="sign out" as={NavLink} exact
                                 to="/signout" activeClassName="active"
                                 negative={open}
                                 positive={!open}
                                 style={{
                                   color: 'white',
                                   fontWeight: 500,
                                   fontSize: '15px',
                                   letterSpacing: '2px',
                                 }}> Log out
                      </Menu.Item>
                    }
                >
                  <Segment
                      style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}
                  >
                    <Header>You have logged out</Header>
                  </Segment>
                </TransitionablePortal>
            ) : ''
            }
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
CampusNavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(CampusNavBar);

/** Enable ReactRouter so that links work. */
export default withRouter(NavBarContainer);
