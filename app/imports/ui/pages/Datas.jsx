import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Label, Menu, Table, Container, Loader, Card, Image, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Datas } from '../../api/dataDensity/Datas';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import Covid19 from '../../api/Covid19/Covid19';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getProfileData(dateTime) {
  const data = Datas.collection.findOne({ dateTime });
  // const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  // const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
  // const projectPictures = projects.map(project => Projects.collection.findOne({ name: project }).picture);
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return data;
  // return _.extend({ }, data, { interests, projects: projectPictures });
}

/** Component for layout out a Data table. */
const DataTable = (props) => (
    <Table compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date and Time</Table.HeaderCell>
          <Table.HeaderCell>Building</Table.HeaderCell>
          <Table.HeaderCell>Occupancy</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
        {_.map(props.data.dateTime,
            (dateTime, index) => <Table.Cell> {dateTime} </Table.Cell>)}
        </Table.Row>

        <Table.Row>
          {_.map(props.data.building,
              (dateTime, index) => <Table.Cell> {building} </Table.Cell>)}
        </Table.Row>

        <Table.Row>
          {_.map(props.data.occupancy,
              (dateTime, index) => <Table.Cell> {occupancy} </Table.Cell>)}
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='chevron left' />
              </Menu.Item>
              <Menu.Item as='a'>1</Menu.Item>
              <Menu.Item as='a'>2</Menu.Item>
              <Menu.Item as='a'>3</Menu.Item>
              <Menu.Item as='a'>4</Menu.Item>
              <Menu.Item as='a' icon>
                <Icon name='chevron right' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
);

DataTable.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Data Collection as a Table. */
class DatasPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const times = _.pluck(Datas.collection.find().fetch(), 'dateTime');
    const profileData = times.map(dateTime => getProfileData(dateTime));
    return (
      <Container id="profiles-page">
        <Card.Group>
          {_.map(profileData, (data, index) => <DataTable key={index} data={data}/>)}
        </Card.Group>
      </Container>
    );
  }
}

DatasPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Datas.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Projects.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(DatasPage);