import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import DataTable from '../index';

// Fixtures and spies
const handleEditSpy = jest.fn();
const handleShowConfirmModalSpy = jest.fn();
const data = [
  {
    id: 'abc-123',
    first: 'Wilie',
    last: 'Coyote',
    address: '1 Acme Corp Lane, USA',
  },
  {
    id: 'def-456',
    first: 'Road',
    last: 'Runner',
    address: '1 Looney Tunes Way, USA',
  },
];

const props = {
  data,
  handleEdit: handleEditSpy,
  handleShowConfirmModal: handleShowConfirmModalSpy,
};

const propsNoUsers = {
  data: [],
  handleEdit: () => {},
  handleShowConfirmModal: () => {},
};

const renderedComponent = shallow(<DataTable {...props} />);

describe('<DataTable> component', () => {
  it('should renders the empty message if there is no data', () => {
    const renderedEmptyComponent = shallow(<DataTable {...propsNoUsers} />);

    expect(renderedEmptyComponent.find('#noData').length).toBe(1);
  });

  it('should renders two rows for our two users', () => {
    expect(renderedComponent.find('tbody > tr').length).toBe(2);
  });

  it('should calls the correct event handlers with the proper ids when actions are clicked', () => {
    renderedComponent.find(`#btn-edit-${props.data[0].id}`).simulate('click');
    expect(handleEditSpy).toHaveBeenCalledWith(props.data[0].id);

    renderedComponent.find(`#btn-delete-${props.data[1].id}`).simulate('click');
    expect(handleShowConfirmModalSpy).toHaveBeenCalledWith(props.data[1].id);
  });
});
