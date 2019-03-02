import React from 'react';
import { bool, string } from 'prop-types';
import classNames from 'classnames';

const MainSection = ({ isWide, children, isOverflow, className }) => {
  return (
    <section className={classNames('content-section', {
      overflow: isOverflow,
      [className]: !!className
    })}>
      {
        isWide ? children : (
          <div className="container">
            {children}
          </div>
        )
      }

    </section>
  );
};

MainSection.propTypes = {
  isWide: bool,
  isOverflow: bool,
  className: string
};

export default MainSection;
