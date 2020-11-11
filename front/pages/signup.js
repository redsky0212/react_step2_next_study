import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Signup = () => {
  return (
    <>
    <Head>
      <title>회원가입 : NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <AppLayout>
      <div>회원가입 페이지!</div>
    </AppLayout>
    </>
  );
};

export default Signup;