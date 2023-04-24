import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { GetPostBySlugResponse } from '@services/posts/get-post-by-slug/get-post-by-slug.interface';
import { useGetPostBySlug } from '@services/posts/get-post-by-slug/get-post-by-slug.service';
import {
  Container,
  LinkWrapper,
  OpacitySpan,
  Paragraph,
  PostInfoBlog,
  PostTitle,
  Tag
} from '@styles/post.style';

const PostSlug = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getPostBySlug } = useGetPostBySlug();

  const [post, setPost] = React.useState<GetPostBySlugResponse>();
  const [postNotFound, setPostNotFound] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { postSlug } = router.query;
    if (postSlug) fetchGetPost(postSlug as string).then((res) => setPost(res));
  }, [router.query]);

  const fetchGetPost = async (slug: string) => {
    try {
      return await getPostBySlug({ slug });
    } catch (e) {
      await handleException(e);
      setPostNotFound(true);
    }
  };

  const handleRedirect = async (path: string) => {
    return router.push(`${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | {post?.title ?? 'Not found'}</title>
      </Head>
      <DefaultLayout loading={l0}>
        <Container>
          {postNotFound ? (
            <>
              <PostTitle>Post not found</PostTitle>
              <PostTitle className={'subtitle'}>
                Eh... It seems like post you are looking for just doesn&apos;t exist, maybe, you should just go and check the name
              </PostTitle>
              <PostTitle
                className={'subtitle link'}
                onClick={() => handleRedirect('/posts')}
              >
                Here is all posts
              </PostTitle>
            </>
          ) : (
            <>
              <PostTitle>{post?.title}</PostTitle>
              <PostTitle className={'subtitle'}>{post?.preview}</PostTitle>

              <PostInfoBlog>
                <OpacitySpan>Written by: </OpacitySpan> <LinkWrapper
                onClick={() => handleRedirect(`/account/user/${post?.username}`)}
              >{post?.username}</LinkWrapper>&nbsp;| <OpacitySpan>Written at: </OpacitySpan> {dayjs(post?.createdAt).format('YYYY-MM-DD')} | <OpacitySpan>Updated at: </OpacitySpan> {dayjs(post?.updatedAt).format('YYYY-MM-DD')}
              </PostInfoBlog>
              <PostInfoBlog>
                <OpacitySpan>Search tags: </OpacitySpan>
                {post?.searchTags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </PostInfoBlog>

              {post?.content.map((item, index) => (
                <Paragraph key={index}>{item}</Paragraph>
              ))}

              <PostTitle className={'subtitle'}>
                Discussions
              </PostTitle>
            </>
          )}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default PostSlug;
