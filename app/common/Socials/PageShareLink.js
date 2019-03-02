import React, { Fragment } from 'react';
import Head from 'next/head'

const pageShareLink = (props) => {
  const info = props.info ? props.info : {
    url: '',
    title: '',
    desc: '',
    img: '',
  }
  return (
    <Fragment>
      <Head>
        <meta property="og:url" content={info.url}/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={info.title}/>
        <meta property="og:description" content={info.desc}/>
        <meta property="og:image" content={info.img}/>
      </Head>
    </Fragment>
  );
};

export default pageShareLink;
