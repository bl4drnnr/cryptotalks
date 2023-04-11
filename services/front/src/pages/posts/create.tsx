import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useCreatePostService } from '@services/posts/create-post/create-post.service';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';

const CreatePost = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, listPosts } = useListPostsService();
  const { loading: l1, createPost } = useCreatePostService();

  React.useEffect(() => {
    const token = sessionStorage.getItem('_at');

    if (!token) handleRedirect('').then();


  }, []);

  const fetchCreatePost = async () => {
    try {
      const token = sessionStorage.getItem('_at');
      // return await createPost({  });
    } catch (e) {
      await handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Create post</title>
      </Head>
      <DefaultLayout loading={l0 || l1}>
        <></>
      </DefaultLayout>
    </>
  );
};

export default CreatePost;
