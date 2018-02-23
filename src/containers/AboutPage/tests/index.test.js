import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import About from '../index';

const renderedComponent = shallow(<About />);

describe('<About> component', () => {
  it('should have unit tests at some point when its useful 😜', () => {
    expect(true).toBe(true);
  });
});
