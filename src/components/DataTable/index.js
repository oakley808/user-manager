import React from 'react';
import PropTypes from 'prop-types';

import { Button, Glyphicon, Table } from 'react-bootstrap';

export default function DataTable({ data, handleEdit, handleShowConfirmModal }) {
  const emptyMessage = (
    <tr><td colSpan="4" id="noData">No users yet. Add some!</td></tr>
  );

  const renderRows = (dataList) => {
    return data.map((user, idx) => (
      <tr key={user.id}>
        <td>{user.first}</td>
        <td>{user.last}</td>
        <td>{user.address}</td>
        <td className="text-right">
          <Button id={`btn-edit-${user.id}`} bsStyle="default" bsSize="xsmall" onClick={e => handleEdit(user.id)}>
            <Glyphicon glyph="pencil" /> Edit
          </Button>

          <Button id={`btn-delete-${user.id}`} bsStyle="danger" bsSize="xsmall" onClick={e => handleShowConfirmModal(user.id)}>
            <Glyphicon glyph="remove" /> Delete
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <Table responsive striped hover className="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? renderRows() : emptyMessage}
      </tbody>
    </Table>
  );
}

/**
 * Prop type validation
 */
DataTable.propTypes = {
  data: PropTypes.array,
  handleEdit: PropTypes.func,
  handleShowConfirmModal: PropTypes.func,
};
