import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component.
 * Currently nav bar contains the the home logo, data, edit data and sign out at left side
 * The navbar logo will take user back to the data page. */
class CampusNavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px' };
    return (
        <Menu style={menuStyle} attached="top" borderless>
          {this.props.currentUser === '' ? (
              <Menu.Item as={NavLink} activeClassName="" exact to="/">
                <Image size='mini' src="/images/logo.png"/>
                <span className='bowfolio-green' style={{ fontWeight: 800, fontSize: '24px' }}>Campus Occupancy</span>
              </Menu.Item>
          ) : (
              <Menu.Item as={NavLink} activeClassName="" exact to="/data">
                <Image size='mini' src="/images/logo.png"/>
                <span className='bowfolio-green' style={{ fontWeight: 800, fontSize: '24px' }}>Campus Occupancy</span>
              </Menu.Item>
          )}
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} id="dataMenuPage" activeClassName="active" exact to="/data" key='dataPage'>Data Page</Menu.Item>,
                <Menu.Item as={NavLink} id="importDatapage" activeClassName="active" exact to="/import" key='editData'>Import Data</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser ? (
                <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
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
