import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

const NodeBird = ({ Component }) => {
  return (
    <>
    <Head>
    <title>NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <Component />
    </>
  );
};

NodeBird.ProTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;