import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Datas } from '../../api/dataDensity/Datas';
import DataItem from '../components/DataItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListData extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Stuff</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>dateTime</Table.HeaderCell>
                <Table.HeaderCell>Unique</Table.HeaderCell>
                <Table.HeaderCell>Building</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.datas.map((data) => <DataItem key={data._id} data={data}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListData.propTypes = {
  datas: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Data');
  return {
    datas: Datas.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListData);
