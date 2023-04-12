import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { GetPostBySlugResponse } from '@services/posts/get-post-by-slug/get-post-by-slug.interface';
import { useGetPostBySlug } from '@services/posts/get-post-by-slug/get-post-by-slug.service';
import { Container } from '@styles/post.style';

const PostSlug = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getPostBySlug } = useGetPostBySlug();

  const [post, setPost] = React.useState<GetPostBySlugResponse>();

  React.useEffect(() => {
    const { postSlug } = router.query;
    if (postSlug) {
      fetchGetPost(postSlug as string).then((res) => setPost(res));
    }
  }, [router.query]);

  const fetchGetPost = async (slug: string) => {
    try {
      return await getPostBySlug({ slug });
    } catch (e) {
      await handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    return router.push(`/${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | {post?.title}</title>
      </Head>
      <DefaultLayout loading={l0}>
        <Container>
          {JSON.stringify(post)}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default PostSlug;
