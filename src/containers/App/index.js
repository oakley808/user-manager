import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import HomePage from 'containers/HomePage';
import AboutPage from 'containers/AboutPage';
import Header from 'components/Header';
import Footer from 'components/Footer';

// Selectors
import {
  selectUserData,
  selectLocation,
  selectLoading,
} from 'containers/HomePage/selectors';

export function App({ isLoading, location, userData }) {
  return (
    <div>
      <Header pathname={location.pathname} />

      <Grid>
        <Row>
          <Col md={10} mdPush={1}>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={HomePage} />
              <Route exact path={`${process.env.PUBLIC_URL}/about`} component={AboutPage} />
            </Switch>
          </Col>
        </Row>
      </Grid>

      <Footer count={userData.length} showCount={location.pathname === `${process.env.PUBLIC_URL}/`} isLoading={isLoading} />
    </div>
  );
}

/**
 * Prop type validation
 */
App.propTypes = {
  isLoading: PropTypes.bool,
  location: PropTypes.object,
  userData: PropTypes.array,
};

/**
 * mapStateToProps
 */
export const mapStateToProps = (state, ownState) => ({
  location: selectLocation()(state),
  userData: selectUserData()(state),
  isLoading: selectLoading()(state),
});

/**
 * Default export is the connected component
 * (use the named export for isolated unit testing)
 */
export default connect(mapStateToProps, null)(App);
