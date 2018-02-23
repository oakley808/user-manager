import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Footer from '../index';


const props = {
  count: 5,
  isLoading: false,
  showCount: true,
};

let renderedComponent = shallow(<Footer {...props} />);

describe('<Footer> component', () => {
  it('counts the users properly and shows them when required', () => {
    const foo = renderedComponent.find('#badge-count');
    expect(renderedComponent.find('#badge-count').dive().text()).toBe('5'); // dive() into the <Badge />
  });

  it('hides the count when required', () => {
    props.showCount = false;
    renderedComponent = shallow(<Footer {...props} />);

    expect(renderedComponent.find('#badge-count').length).toBe(0);
  });

  it('shows a spinner when loading', () => {
    props.isLoading = true;
    props.showCount = true;

    renderedComponent = shallow(<Footer {...props} />);

    expect(renderedComponent.find('.fa-spinner').length).toBe(1);
  });
});
