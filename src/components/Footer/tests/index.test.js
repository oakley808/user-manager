import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Footer from '../index';
import { Badge } from 'react-bootstrap';

describe('<Footer> component', () => {
  let props;
  let renderedComponent;

  beforeEach(() => {
    props = {
      count: 5,
      isLoading: false,
      showCount: true,
    };
    renderedComponent = shallow(<Footer {...props} />);
  });

  it('counts the users properly and shows them when required', () => {
    expect(renderedComponent.find('#badge-count').dive().text()).toBe('5'); // dive() into the <Badge />
  });

  it('hides the count when required', () => {
    renderedComponent.setProps({ showCount: false });
    expect(renderedComponent.find('#badge-count').length).toBe(0);
  });

  it('shows a spinner when loading', () => {
    renderedComponent.setProps({ isLoading: true });
    expect(renderedComponent.find('.fa-spinner').length).toBe(1);
  });

  it('adds the bg-danger class when there are zero users', () => {
    renderedComponent.setProps({ count: 0 });
    expect(renderedComponent.find(Badge).prop('className')).toBe('bg-danger');
    renderedComponent.setProps({ count: 1 });
    expect(renderedComponent.find(Badge).prop('className')).toBe(false);
  });
});
