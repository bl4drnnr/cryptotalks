import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { GetPostBySlugResponse } from '@services/posts/get-post-by-slug/get-post-by-slug.interface';
import { useGetPostBySlug } from '@services/posts/get-post-by-slug/get-post-by-slug.service';
import { useUpdatePostService } from '@services/posts/update-post/update-post.service';

const EditPost = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getPostBySlug } = useGetPostBySlug();
  const { loading: l1, updatePost } = useUpdatePostService();

  const [post, setPost] = React.useState<GetPostBySlugResponse>();
  const [postNotFound, setPostNotFound] = React.useState<boolean>(false);
  const [tokenPresent, setTokenPresent] = React.useState<boolean>(false);
  const [titleError, setTitleError] = React.useState<boolean>(false);
  const [previewError, setPreviewError] = React.useState<boolean>(false);
  const [contentError, setContentError] = React.useState<boolean>(false);
  const [searchTagsError, setSearchTagsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { postSlug } = router.query;
    if (postSlug) fetchSetPost(postSlug);
  }, [router.query]);
  //
  // React.useEffect(() => {
  //   setTitleError(post?.title !== '' && title.length < 2);
  // }, [title]);
  //
  // React.useEffect(() => {
  //   setPreviewError(preview !== '' && preview.length < 2);
  // }, [preview]);
  //
  // React.useEffect(() => {
  //   setContentError(contentString !== '' && contentString.length < 2);
  // }, [contentString]);
  //
  // React.useEffect(() => {
  //   setSearchTagsError(searchTags.length === 6);
  //   searchTags.forEach((tag) => {
  //     setSearchTagsError(tag.length === 0 || tag.length > 20);
  //   });
  // }, [searchTags.length]);

  const fetchSetPost = (postSlug: string | Array<string> | undefined) => {
    fetchGetPost(postSlug as string).then((res) => {
      setPost(res as GetPostBySlugResponse);
    });
  };

  const fetchGetPost = async (slug: string) => {
    try {
      const token = localStorage.getItem('_at');
      return await getPostBySlug({ slug, token });
    } catch (e) {
      await handleException(e);
      setPostNotFound(true);
    }
  };

  const fetchUpdatePost = async () => {
    try {
      //
    } catch (e) {
      await handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    return await router.push(path);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks</title>
      </Head>
      <DefaultLayout loading={l0 || l1}>
        <></>
      </DefaultLayout>
    </>
  );
};

export default EditPost;
