import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { HomePage, mapStateToProps } from '../index';
import { Alert, Modal } from 'react-bootstrap';
import { fromJS } from 'immutable';

const addUserSpy = jest.fn();
const loadDataSpy = jest.fn();
const removeUserSpy = jest.fn();
const updateUserSpy = jest.fn();

const props = {
  addUser: addUserSpy,
  isLoading: false,
  loadData: loadDataSpy,
  loadingError: '',
  removeUser: removeUserSpy,
  updateUser: updateUserSpy,
  userData: [{
    id: '123-abc',
    first: 'First name',
    last: 'Last name',
    address: 'The moon',
  }],
};


describe('<HomePage> component', () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = shallow(<HomePage {...props} />);
  });

  it('renders our Add User button', () => {
    expect(renderedComponent.find('#add').length).toBe(1);
  });

  it('shows a spinner when loading data', () => {
    expect(renderedComponent.find('.fa-spinner').length).toBe(0);
    renderedComponent.setProps({ isLoading: true });
    expect(renderedComponent.find('.fa-spinner').length).toBe(1);
  });

  it('shows an Alert when there was an error data', () => {
    expect(renderedComponent.find(Alert).length).toBe(0);
    renderedComponent.setProps({ loadingError: 'Womp womp. Sad trombone.' });
    expect(renderedComponent.find(Alert).length).toBe(1);
  });

  it('shows our add user modal when the Add User button is clicked', () => {
    renderedComponent.find('#add').simulate('click');

    expect(renderedComponent.find('#modal-add').props().show).toBe(true);
    expect(renderedComponent.find('#modal-delete').props().show).toBe(false);
  });

  it('dispatches the addUser action when the save handler is called', () => {
    renderedComponent.instance().handleSave();
    expect(addUserSpy).toHaveBeenCalled();
  });

  it('dispatches the updateUser action when the save handler is called', () => {
    renderedComponent.setState({ currentUser: { id: '123' } });
    renderedComponent.instance().handleSave();

    expect(updateUserSpy).toHaveBeenCalled();
  });

  it('sets the `show` component state true when the edit handler is called', () => {
    renderedComponent.instance().handleEdit('123-abc');
    expect(renderedComponent.state('show')).toEqual(true);
  });

  it('dispatches the removeUser action when the delete handler is called', () => {
    renderedComponent.instance().handleRemove();
    expect(removeUserSpy).toHaveBeenCalled();
  });

  it('sets local state properly when you edit a user', () => {
    const value = 'New First Name';
    const mockEvent = {
      currentTarget: {
        name: 'first',
        value,
      },
    };

    // renderedComponent.instance().updateCurrentUser();
    renderedComponent.instance().handleEdit('123-abc');
    renderedComponent.find('#first').simulate('blur', mockEvent);

    expect(renderedComponent.state('currentUser').first).toBe(value);
  });

  it('shows our delete user confirmation modal when the delete handler function is called', () => {
    const id = '123-abc';
    renderedComponent.instance().handleShowConfirmModal(id);
    expect(renderedComponent.find('#modal-delete').props().show).toBe(false);
  });

  it('resets local state when the modal is closed', () => {
    renderedComponent.instance().handleCloseModal();
    const defaultState = {
      confirmId: '',
      currentUser: {},
      show: false,
      showConfirm: false,
    };
    expect(renderedComponent.state()).toEqual(defaultState);
  });

  it('mapStateToProps maps the proper state', () => {
    const userData = {
      userData: [],
    };

    const state = fromJS({
      global: userData,
    });

    expect(mapStateToProps(state)).toEqual(userData);
  });
});
