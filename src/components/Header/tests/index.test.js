import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from '../index';
import {
  NavItem,
} from 'react-bootstrap';

const props = {
  pathname: `${process.env.PUBLIC_URL}/`,
};

const renderedComponent = shallow(<Header {...props} />);

describe('<Header> component', () => {
  it('renders two links', () => {
    expect(renderedComponent.find(NavItem).length).toBe(2);
  });

  it('renders a 🤖 emoji logo', () => {
    expect(renderedComponent.find('#logo').text()).toBe('🤖');
  });

  it('adds the active class on the correct page', () => {
    expect(renderedComponent.find(NavItem).first().props().active).toBe(true);
  });
});
