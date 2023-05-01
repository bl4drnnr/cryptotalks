import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { Textarea } from '@components/Textarea/Textarea.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useGetPostBySlug } from '@services/posts/get-post-by-slug/get-post-by-slug.service';
import { useUpdatePostService } from '@services/posts/update-post/update-post.service';
import {
  ButtonWrapper,
  Container,
  CreatePostTitle,
  InputKeyWrapper,
  SearchTagItem,
  SearchTagsWrapper
} from '@styles/create-post.style';

const EditPost = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getPostBySlug } = useGetPostBySlug();
  const { loading: l1, updatePost } = useUpdatePostService();

  const [postNotFound, setPostNotFound] = React.useState<boolean>(false);
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
  const [tokenPresent, setTokenPresent] = React.useState();

  React.useEffect(() => {
    const { postSlug } = router.query;
    if (postSlug) fetchSetPost(postSlug);
  }, [router.query]);

  React.useEffect(() => {
    setTitleError(title !== '' && title.length < 2);
  }, [title]);

  React.useEffect(() => {
    setPreviewError(preview !== '' && preview.length < 2);
  }, [preview]);

  React.useEffect(() => {
    setContentError(contentString !== '' && contentString.length < 2);
  }, [contentString]);

  React.useEffect(() => {
    setSearchTagsError(searchTags.length === 6);
    searchTags.forEach((tag) => {
      setSearchTagsError(tag.length === 0 || tag.length > 20);
    });
  }, [searchTags.length]);

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

  const setPostContent = (contentString: string) => {
    setContentString(contentString);
    setContent(contentString.split('\n'));
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

  const fetchSetPost = (postSlug: string | Array<string> | undefined) => {
    fetchGetPost(postSlug as string).then((res) => {
      // @ts-ignore
      setTitle(res.title);
      // @ts-ignore
      setPreview(res.preview);
      // @ts-ignore
      setContent(res.content);
      // @ts-ignore
      setSearchTags(res.searchTags);
    });
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
        <Container>
          <CreatePostTitle>Update post</CreatePostTitle>
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
              text={'Update post'}
              onClick={() => fetchUpdatePost()}
              disabled={titleError || previewError || contentError || searchTagsError}
            />
          </ButtonWrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default EditPost;
