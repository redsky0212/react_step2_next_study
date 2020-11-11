import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  return (
    <>
    <Head>
      <title>내 프로필 : NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <AppLayout>
      <div>프로필!</div>
    </AppLayout>
    </>
  );
};

export default Profile;