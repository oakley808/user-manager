import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'react-bootstrap';

export default function Footer({ count, isLoading, showCount }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="text-muted text-right">
          {showCount &&
            <span>User Count:&nbsp;
              {isLoading
                ? <i className="fas fa-spinner fa-spin"></i>
                : <Badge id="badge-count">{count}</Badge>
              }
            </span>
          }
        </div>
      </div>
    </footer>
  );
}

/**
 * Prop type validation
 */
Footer.propTypes = {
  count: PropTypes.number,
  isLoading: PropTypes.bool,
  showCount: PropTypes.bool,
};
