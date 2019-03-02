import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import { LocalizationContext } from '../../../context'

const Breadcrumbs = ({ page, path, className, isWhite }) => {
  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <div className={classNames('breadcrumbs', {
          [className]: !!className,
          'breadcrumbs-white': isWhite
        })}>
          <ul className="clearlist">
            <li><Link href="/"><a>{localization.pubBreadcrumbHome}</a></Link></li>
            <li>
              {
                path ? <Link href={path}><a>{page}</a></Link> : page
              }

            </li>
          </ul>
        </div>
      )}
    </LocalizationContext.Consumer>
  );
};

Breadcrumbs.propTypes = {
  page: string
};

export default Breadcrumbs;
