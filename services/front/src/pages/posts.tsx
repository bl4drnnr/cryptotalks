import React from 'react';

import { useRouter } from 'next/router';

import DefaultLayout from '@layouts/Default.layout';

const Posts = () => {
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  return (
    <DefaultLayout>
      <></>
    </DefaultLayout>
  );
};

export default Posts;
