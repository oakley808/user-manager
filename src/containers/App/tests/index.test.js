import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from '../index';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { AboutPage } from 'containers/AboutPage';
import { Route } from 'react-router-dom';


const props = {
  userData: [],
  location: {
    pathname: '/about',
  },
};

const renderedComponent = shallow(<App {...props} />);

describe('<App> component', () => {
  it('should render the proper route', () => {
    expect(renderedComponent.find(Route).at(1).props().component).toBe(AboutPage);
  });

  it('should render a header and footer', () => {
    expect(renderedComponent.find(Header).length).toBe(1);
    expect(renderedComponent.find(Footer).length).toBe(1);
  });

  it('maps the correct state to props', () => {
    const data = {
      location: { pathname: '/' },
      userData: [],
    };

    const state = fromJS({
      global: { userData: data.userData },
      route: { location: data.location },
    });

    const newProps = mapStateToProps(state);

    expect(newProps).toEqual(data);
  });
});
