import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Icon, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Datas } from '../../api/dataDensity/Datas';
import DataItem from '../components/DataItem';
import Covid19 from '../../api/Covid19/Covid19';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListData extends React.Component {

  state = {
    currentSort: 'default',
  };

  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort,
    });
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const sortTypes = {
      up: {
        class: 'sort-up',
        fn: (a, b) => a.Unique - b.Unique,
      },
      down: {
        class: 'sort-down',
        fn: (a, b) => b.Unique - a.Unique,
      },
      default: {
        class: 'sort',
        fn: (a) => a,
      },
    };
    const { currentSort } = this.state;
    console.log(this.state);
    return (
        <Container>
          <div><Covid19/></div>
          <Header as="h2" textAlign="center">Occupancy Data</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date/Time</Table.HeaderCell>
                <Table.HeaderCell>
                  <Button icon labelPosition={'right'} onClick={this.onSortChange}>
                    <Icon name='sort'/>
                    Occupancy
                  </Button>
                </Table.HeaderCell>
                <Table.HeaderCell>Building</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {[...this.props.datas].sort(sortTypes[currentSort].fn).map(data => <DataItem key={data._id} data={data}/>)}
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
  const subscription = Meteor.subscribe('Datas');
  return {
    datas: Datas.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListData);
