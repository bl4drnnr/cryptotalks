import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { Textarea } from '@components/Textarea/Textarea.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useCreatePostService } from '@services/posts/create-post/create-post.service';
import { ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import { ButtonWrapper, Container, CreatePostTitle } from '@styles/create-post.style';

const CreatePost = () => {
  const router = useRouter();

  const [title, setTitle] = React.useState<string>('');
  const [preview, setPreview] = React.useState<string>('');
  const [content, setContent] = React.useState<Array<string>>(['']);
  const [contentString, setContentString] = React.useState<string>('');
  const [searchTags, setSearchTags] = React.useState<Array<string>>(['']);
  const [searchTagsString, setSearchTagsString] = React.useState<string>('');
  const [userLatestPosts, setUserLatestPosts] = React.useState<ListPostsResponse>();

  const { handleException } = useHandleException();
  const { loading: l0, listPosts } = useListPostsService();
  const { loading: l1, createPost } = useCreatePostService();

  const setPostContent = (contentString: string) => {
    setContent(contentString.split('\n'));
  };

  const setPostSearchTags = (searchTagsString: string) => {
    setSearchTags(searchTagsString.split(' '));
  };

  // React.useEffect(() => {
  //   const token = sessionStorage.getItem('_at');
  //
  //   if (!token) handleRedirect('').then();
  //
  //
  // }, []);

  const fetchUserLatestPosts = async () => {
    try {
      // TODO get username from refresh token endpoint?
      const posts = await listPosts({
        page: 0,
        pageSize: 3,
        order: '',
        orderBy: ''
      });
      setUserLatestPosts(posts);
    } catch (e) {
      await handleException(e);
    }
  };

  const fetchCreatePost = async () => {
    try {
      const token = sessionStorage.getItem('_at');
      return await createPost({
        token,
        title,
        content,
        preview,
        searchTags
      });
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
        <Container>
          <CreatePostTitle>Create post</CreatePostTitle>
          <Input
            value={title}
            placeholder={'Title of a post'}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            value={preview}
            placeholder={'Preview of a post'}
            onChange={(e) => setPreview(e.target.value)}
          />
          <Textarea
            value={contentString}
            placeholder={'Content'}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <Input
            value={searchTagsString}
            placeholder={'Search tags'}
            onChange={(e) => setPostSearchTags(e.target.value)}
          />

          <ButtonWrapper>
            <Button
              text={'Create posts'}
              onClick={() => fetchCreatePost()}
            />
          </ButtonWrapper>

          {userLatestPosts?.rows.length ? (
            <>
              <CreatePostTitle className={'subtitle'}>
                Your latest posts
              </CreatePostTitle>
            </>
          ) : (
            <CreatePostTitle>No posts yet. Go create one!</CreatePostTitle>
          )}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default CreatePost;
