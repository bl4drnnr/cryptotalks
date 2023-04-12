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
import { useRefreshTokenService } from '@services/refresh-tokens/refresh-tokens.service';
import { ButtonWrapper, Container, CreatePostTitle } from '@styles/create-post.style';

const CreatePost = () => {
  const router = useRouter();

  const fetchTokenChecking = React.useRef(true);

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
  const { loading: l2, refreshToken } = useRefreshTokenService();

  const setPostContent = (contentString: string) => {
    setContent(contentString.split('\n'));
  };

  const setPostSearchTags = (searchTagsString: string) => {
    setSearchTags(searchTagsString.split(' '));
  };

  React.useEffect(() => {
    if (fetchTokenChecking.current) {
      fetchTokenChecking.current = false;

      const token = sessionStorage.getItem('_at');

      if (!token) handleRedirect('').then();
      else {
        fetchCheckUser(token).then((res) => {
          if (res) {
            sessionStorage.setItem('_at', res._at);

            fetchUserLatestPosts(res.user.username).then((posts) => {
              setUserLatestPosts(posts);
            });
          }
        });
      }
    }
  }, []);

  const fetchUserLatestPosts = async (username: string) => {
    try {
      return await listPosts({
        page: 0,
        pageSize: 3,
        order: 'DESC',
        orderBy: 'createdAt',
        username
      });
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

  const fetchCheckUser = async (token: string) => {
    try {
      return await refreshToken({ token });
    } catch (e) {
      handleException(e);
      sessionStorage.removeItem('_at');
      await handleRedirect('');
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
      <DefaultLayout loading={l0 || l1 || l2}>
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
              {userLatestPosts.rows.map((post) => (
                <>
                </>
              ))}
            </>
          ) : (
            <CreatePostTitle
              className={'subtitle center'}
            >No posts yet. Go create one!</CreatePostTitle>
          )}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default CreatePost;
