import React from 'react';
import Head from 'next/head';
import Navbar from './ui/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>The Shoppies</title>
        <meta name='description' content='The Shoppies' />
      </Head>
      <Navbar />

      <main>{children}</main>
    </>
  );
};

export default Layout;
