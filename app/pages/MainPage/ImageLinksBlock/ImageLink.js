import React from 'react';
import Link from 'next/link'
import {Routes} from '../../../../settings';
import { string, number } from 'prop-types';

const ImageLink = ({ imagePath, title, publicationId, lang }) => {
  return (
    <Link as={`${Routes.publications}/${lang}/${publicationId}/${title}`} href={`${Routes.publications}?lang=${lang}&slug=${publicationId}&title=${title}`}>
      <a
        className="image-link"
        style={{backgroundImage: `url(${imagePath})`}}>
        <b>{title}</b>
      </a>
    </Link>
  );
};

ImageLink.propTypes = {
  imagePath: string,
  title: string,
  publicationId: number
};

export default ImageLink;
