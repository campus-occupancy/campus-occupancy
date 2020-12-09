import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class DataItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.data.dateTime}</Table.Cell>
          <Table.Cell>{this.props.data.Unique}</Table.Cell>
          <Table.Cell>{this.props.data.Building}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
DataItem.propTypes = {
  data: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DataItem);
