import React from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { PostProps } from '@components/PostPreview/PostPreview.interface';
import {
  PostContainer,
  PostTextPreview,
  PostSearchTags,
  PostTag,
  PostTitle,
  PostCreatedAt
} from '@styles/PostPreview.style';

const PostPreview = (
  { slug, title, preview, searchTags, createdAt }: PostProps
) => {
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  return (
    <PostContainer
      onClick={() => handleRedirect(`/posts/post/${slug}`)}
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
    </PostContainer>
  );
};

export default PostPreview;
