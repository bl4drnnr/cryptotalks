import React from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { PostProps } from '@components/PostPreview/PostPreview.interface';
import {
  PostContainer,
  PostTextPreview,
  PostSearchTags,
  PostTag,
  PostTitle,
  PostCreatedAt, EditButtonsWrapper, EditButtonWrapper
} from '@styles/PostPreview.style';

const PostPreview = (
  {
    slug,
    title,
    preview,
    searchTags,
    createdAt,
    isAdmin
  }: PostProps
) => {
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  return (
    <PostContainer
      onClick={() => handleRedirect(`/posts/edit/${slug}`)}
    >
      <PostTitle>{title}</PostTitle>
      <PostTextPreview>{preview}</PostTextPreview>
      <PostSearchTags>
        {searchTags.map((searchTag, key) => (
          <PostTag key={key}>{searchTag}</PostTag>
        ))}
      </PostSearchTags>
      {createdAt && (
        <PostCreatedAt>
          Post created at: {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </PostCreatedAt>
      )}
      {isAdmin ? (
        <EditButtonsWrapper>
          <EditButtonWrapper className={'first'}>
            <Button
              text={'Edit'}
              onClick={() => handleRedirect(`/posts/edit/${slug}`)}
            />
          </EditButtonWrapper>
          <EditButtonWrapper className={'second'}>
            <Button text={'Delete'} danger={true} />
          </EditButtonWrapper>
        </EditButtonsWrapper>
      ) : (<></>)}
    </PostContainer>
  );
};

export default PostPreview;
