import React from 'react';

import dayjs from 'dayjs';

import { PostProps } from '@components/PostPreview/PostPreview';
import {
  PostContainer,
  PostTextPreview,
  PostSearchTags,
  PostTag,
  PostTitle,
  PostCreatedAt
} from '@styles/PostPreview.style';

const PostPreview = (
  { title, preview, searchTags, createdAt }: PostProps
) => {
  return (
    <PostContainer>
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
