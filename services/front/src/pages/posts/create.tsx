import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import PostPreview from '@components/PostPreview/PostPreview.component';
import { Textarea } from '@components/Textarea/Textarea.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useCreatePostService } from '@services/posts/create-post/create-post.service';
import { ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import { useRefreshTokenService } from '@services/refresh-tokens/refresh-tokens.service';
import {
  ButtonWrapper,
  Container,
  CreatePostTitle,
  InputKeyWrapper,
  SearchTagItem,
  SearchTagsWrapper
} from '@styles/create-post.style';

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
    setContentString(contentString);
    setContent(contentString.split('\n'));
  };

  const setPostSearchTags = (searchTagsString: string) => {
    setSearchTagsString(searchTagsString);
  };

  const clearPostSearchTags = (e?: any) => {
    if (e && e.key === ' ') {
      const tags = searchTags;
      if (
        searchTagsString.length > 1 &&
        !searchTags.includes(searchTagsString.replace(' ', ''))
      ) {
        tags.push(searchTagsString.replace(' ', ''));
      }
      setSearchTags(tags);
      setSearchTagsString('');
    }
  };

  const removeSearchTag = (searchTag: string) => {
    setSearchTags(searchTags.filter(tag => tag !== searchTag));
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
          <InputKeyWrapper
            onKeyDown={(e) => clearPostSearchTags(e)}
          >
            <Input
              value={searchTagsString}
              placeholder={'Search tags'}
              onChange={(e) => setPostSearchTags(e.target.value)}
            />
          </InputKeyWrapper>

          {searchTags.length > 1 ? (
            <SearchTagsWrapper>
              {searchTags.map((tag, key) => (
                <div key={key}>
                  {tag !== '' ? (
                    <SearchTagItem
                      onClick={() => removeSearchTag(tag)}
                    >{tag}</SearchTagItem>
                  ) : (<></>)}
                </div>
              ))}
            </SearchTagsWrapper>
          ): (<></>)}

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
              {userLatestPosts.rows.map((post, key) => (
                <PostPreview
                  title={post.title}
                  preview={post.preview}
                  searchTags={post.searchTags}
                  createdAt={post.createdAt}
                  key={key}
                />
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
