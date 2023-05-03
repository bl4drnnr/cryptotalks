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

  const [username, setUsername] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [titleError, setTitleError] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string>('');
  const [previewError, setPreviewError] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<Array<string>>(['']);
  const [contentString, setContentString] = React.useState<string>('');
  const [contentError, setContentError] = React.useState<boolean>(false);
  const [searchTags, setSearchTags] = React.useState<Array<string>>(['']);
  const [searchTagsString, setSearchTagsString] = React.useState<string>('');
  const [searchTagsError, setSearchTagsError] = React.useState<boolean>(false);

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
        !searchTags.includes(searchTagsString.replace(' ', '')) &&
        searchTags.length <= 5
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

      const token = localStorage.getItem('_at');

      if (!token) handleRedirect('').then();
      else {
        fetchCheckUser(token).then((res) => {
          if (res) {
            localStorage.setItem('_at', res._at);

            fetchUserLatestPosts(res.user.username).then((posts) => {
              setUsername(res.user.username);
              setUserLatestPosts(posts);
            });
          }
        });
      }
    }
  }, []);

  React.useEffect(() => {
    setSearchTagsError(searchTags.length === 6);
    searchTags.forEach((tag) => {
      setSearchTagsError(tag.length === 0 || tag.length > 20);
    });
  }, [searchTags.length]);

  React.useEffect(() => {
    setTitleError(title !== '' && title.length < 2);
  }, [title]);

  React.useEffect(() => {
    setPreviewError(preview !== '' && preview.length < 2);
  }, [preview]);

  React.useEffect(() => {
    setContentError(contentString !== '' && contentString.length < 2);
  }, [contentString]);

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
      const titleErr = title.length < 2;
      const previewErr = preview.length < 2;
      const contentErr = contentString.length < 2;
      const searchTagsErr = (searchTags.length === 1 && searchTags[0] === '') || searchTags.length >= 6;
      setTitleError(titleErr);
      setPreviewError(previewErr);
      setContentError(contentErr);
      setSearchTagsError(searchTagsErr);

      if (titleErr || previewErr || contentErr || searchTagsErr) return;

      const token = localStorage.getItem('_at');
      await createPost({
        token,
        title,
        content,
        preview,
        username,
        searchTags: searchTags.filter((tag) => tag.length !== 0 && tag.length <= 20)
      });
      return await handleRedirect(`posts/post/${getPostSlug(title)}`);
    } catch (e) {
      await handleException(e);
    }
  };

  const fetchCheckUser = async (token: string) => {
    try {
      return await refreshToken({ token });
    } catch (e) {
      handleException(e);
      localStorage.removeItem('_at');
      await handleRedirect('');
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const getPostSlug = (postName: string) => {
    return postName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[-]+/g, '-')
      .replace(/[^\w-]+/g, '');
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
            onError={titleError}
            onErrorMessage={'Title is required. Min length is 2 symbols.'}
            value={title}
            placeholder={'Title of a post'}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            onError={previewError}
            onErrorMessage={'Preview is required. Min length is 2 symbols.'}
            value={preview}
            placeholder={'Preview of a post'}
            onChange={(e) => setPreview(e.target.value)}
          />
          <Textarea
            onError={contentError}
            onErrorMessage={'Content is required.'}
            value={contentString}
            placeholder={'Content'}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <InputKeyWrapper
            onKeyDown={(e) => clearPostSearchTags(e)}
          >
            <Input
              onError={searchTagsError}
              onErrorMessage={'Max quantity of search tags is 5. Min quantity of search tags is 1. Max length of tag is 20. Min length of tag is 1'}
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
              text={'Create post'}
              onClick={() => fetchCreatePost()}
              disabled={titleError || previewError || contentError || searchTagsError}
            />
          </ButtonWrapper>

          {userLatestPosts?.rows.length ? (
            <>
              <CreatePostTitle className={'subtitle'}>
                Your latest posts
              </CreatePostTitle>
              {userLatestPosts.rows.map((post, key) => (
                <PostPreview
                  rates={post.rates}
                  slug={post.slug}
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
