import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'react-bootstrap';

export default function Footer({ count, isLoading, showCount }) {
  const spinner = (<span><i className="fas fa-spinner fa-spin"></i></span>);
  return (
    <footer className="footer">
      <div className="container">
        <div className="text-muted text-right">
          {showCount &&
            <span>
              User Count:&nbsp;
              <Badge id="badge-count" className={count < 1 && 'bg-danger'}>
                {isLoading
                  ? <span>{spinner}</span>
                  : <span>{count}</span>
                }
              </Badge>
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
