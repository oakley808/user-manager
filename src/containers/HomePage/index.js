import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import uuidv1 from 'uuid/v1';

import injectSaga from 'utils/injectSaga';

import saga from './saga';

// UI
import { Alert, Button, Glyphicon, Modal } from 'react-bootstrap';
import DataTable from 'components/DataTable';

// Actions
import { loadData, addUser, removeUser, updateUser } from 'containers/HomePage/actions';

// Selectors
import {
  selectUserData,
  selectLoading,
  selectLoadingError,
} from 'containers/HomePage/selectors';

export class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      showConfirm: false,
      confirmId: '',
      currentUser: {},
    };
  }

  /**
   * componentDidMount - kick off an action that triggers a saga to load our data
   */
  componentDidMount() {
    this.props.loadData();
  }

  getUserById = (id) => this.props.userData.find(user => user.id === id);

  getUserNameById = (id) => {
    const user = this.getUserById(id);
    return `${user.first} ${user.last}`;
  }

  /**
   * handleCloseModal - reset the local component state
   * (hide the modal, clear the current user)
   */
  handleCloseModal = () => {
    this.setState((prevState, props) => ({
      show: false,
      showConfirm: false,
      confirmId: '',
      currentUser: {},
    }));
  }

  /**
   * handleShowConfirmModal
   * TODO: DRY these show/hide functions up
   */
  handleShowConfirmModal = (id) => {
    this.setState((prevState, props) => ({
      showConfirm: true,
      confirmId: id,
    }));
  }

  /**
   * handleEdit - load the user data into the form and show the modal
   * @param  {string} id user id
   */
  handleEdit = (id) => {
    const currentUser = this.getUserById(id);
    this.setState((prevState, props) => ({ currentUser }));
    this.handleShowModal();
  };

  handleShowModal = () => {
    this.setState((prevState, props) => ({ show: true }));
  }

  handleRemove = () => {
    this.props.removeUser(this.state.confirmId);
    this.handleCloseModal();
  }

  handleSave = (e) => {
    e.preventDefault(); // block submit event

    const { currentUser } = this.state;

    if (currentUser.id) {
      this.props.updateUser(currentUser);
    } else {
      currentUser.id = uuidv1(); // add a unique id for new users
      this.props.addUser(currentUser);
    }

    this.handleCloseModal();
  };

  updateCurrentUser = (e) => {
    const { name, value } = e.currentTarget;
    const currentUser = {
      ...this.state.currentUser,
      [name]: value, // update value for derived property
    };

    this.setState((prevState, props) => ({ currentUser }));
  }


  render() {
    const { isLoading, loadingError, userData } = this.props;

    return (
      <div>
        {loadingError &&
          <Alert bsStyle="danger">
            There was a problem loading user data: {loadingError}
          </Alert>
        }

        <Button
          id="add"
          bsStyle="primary"
          disabled={isLoading}
          onClick={this.handleShowModal}
        >
          {isLoading
            ? <span><i className="fas fa-spinner fa-spin"></i> Loading...</span>
            : <span><Glyphicon glyph="plus" /> Add New User</span>
          }
        </Button>


        <DataTable
          data={userData}
          handleEdit={this.handleEdit}
          handleShowConfirmModal={this.handleShowConfirmModal}
        />


        <Modal id="modal-delete" show={this.state.showConfirm} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              This is permanent. Are you sure you want to delete {this.state.confirmId && this.getUserNameById(this.state.confirmId)}?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="link" onClick={this.handleCloseModal}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.handleRemove}><Glyphicon glyph="remove" /> Delete</Button>
          </Modal.Footer>
        </Modal>


        <Modal id="modal-add" show={this.state.show} onHide={this.handleCloseModal} bsSize="small">
          <form onSubmit={this.handleSave}>
            <Modal.Header closeButton>
              <Modal.Title>Add/Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <input
                  disabled
                  type="hidden"
                  className="form-control"
                  id="id"
                  name="id"
                  defaultValue={this.state.currentUser.id}
                />

                <label htmlFor="first">First Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="first"
                  name="first"
                  onBlur={this.updateCurrentUser}
                  defaultValue={this.state.currentUser.first}
                />

              </div>
              <div className="form-group">
                <label htmlFor="last">Last Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="last"
                  name="last"
                  onBlur={this.updateCurrentUser}
                  defaultValue={this.state.currentUser.last}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  onBlur={this.updateCurrentUser}
                  defaultValue={this.state.currentUser.address}
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="link" onClick={this.handleCloseModal}>Cancel</Button>
              <Button bsStyle="primary" type="submit"><Glyphicon glyph="floppy-disk" /> Save</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

/**
 * Prop type validation
 */
HomePage.propTypes = {
  addUser: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  loadingError: PropTypes.string,
  removeUser: PropTypes.func,
  updateUser: PropTypes.func,
  userData: PropTypes.array,
};

/**
 * mapStateToProps
 */
export const mapStateToProps = (state, ownState) => ({
  isLoading: selectLoading()(state),
  loadingError: selectLoadingError()(state),
  userData: selectUserData()(state),
});

/**
 * mapDispatchtoProps
 * (shorthand object notation of mapDispatchToProps)
 */
const mapDispatchToProps = {
  loadData,
  addUser,
  removeUser,
  updateUser,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withSaga, withConnect)(HomePage);
