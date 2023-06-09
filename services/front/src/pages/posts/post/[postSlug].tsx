import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Textarea } from '@components/Textarea/Textarea.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { GetPostBySlugResponse } from '@services/posts/get-post-by-slug/get-post-by-slug.interface';
import { useGetPostBySlug } from '@services/posts/get-post-by-slug/get-post-by-slug.service';
import { useLeaveCommentService } from '@services/posts/leave-comment/leave-post.service';
import { useRateCommentService } from '@services/posts/rate-comment/rate-comment.service';
import { useRatePostService } from '@services/posts/rate-post/rate-post.service';
import {
  CommentContainer,
  CommentHeader,
  CommentOpacityPayload,
  CommentPayload,
  Container,
  JoinDiscussionTextWrapper,
  LinkWrapper,
  OpacitySpan,
  Paragraph,
  PostButtonWrapper,
  PostInfoBlog, PostRate,
  PostTitle,
  PostVoteButton,
  PostVoteButtonsWrapper,
  Tag,
  VoteButton,
  VoteButtonsWrapper
} from '@styles/post.style';

const Post = () => {
  const router = useRouter();

  const { handleException } = useHandleException();
  const { loading: l0, getPostBySlug } = useGetPostBySlug();
  const { loading: l1, leaveComment } = useLeaveCommentService();
  const { loading: l2, rateComment } = useRateCommentService();
  const { loading: l3, ratePost } = useRatePostService();

  const [post, setPost] = React.useState<GetPostBySlugResponse>();
  const [postNotFound, setPostNotFound] = React.useState<boolean>(false);
  const [tokenPresent, setTokenPresent] = React.useState<boolean>(false);
  const [postRated, setPostRated] = React.useState<'+' | '-' | null>(null);
  const [postRating, setPostRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>('');

  React.useEffect(() => {
    const token = localStorage.getItem('_at');
    setTokenPresent(!!token);
  }, []);

  React.useEffect(() => {
    const { postSlug } = router.query;
    if (postSlug) fetchSetPost(postSlug);
  }, [router.query]);

  const fetchRateComment = async ({ rate, commentId }: { rate: '+' | '-'; commentId: string }) => {
    try {
      const token = localStorage.getItem('_at');
      await rateComment({
        postId: post?.id,
        token,
        rate,
        commentId
      });
      fetchSetPost(post?.slug);
    } catch (e) {
      await handleException(e);
    }
  };

  const fetchRatePost = async ({ rate }: { rate: '+' | '-' }) => {
    try {
      const token = localStorage.getItem('_at');
      await ratePost({
        postId: post?.id,
        token,
        rate
      });
      setPostRated(postRated === rate ? null : rate);
      fetchSetPost(post?.slug);
    } catch (e) {
      await handleException(e);
    }
  };

  const fetchLeaveComment = async () => {
    try {
      const token = localStorage.getItem('_at');
      await leaveComment({
        token, postId: post?.id, comment
      });
      fetchSetPost(post?.slug);
      setComment('');
    } catch (e) {
      await handleException(e);
    }
  };

  const fetchSetPost = (postSlug: string | Array<string> | undefined) => {
    fetchGetPost(postSlug as string).then((res) => {
      res?.postInfo.rates.forEach((rate) => {
        if (rate.rated) setPostRated(rate.rate);
      });
      countRating(res?.postInfo.rates, 'post');
      setPost(res);
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

  const countRating = (
    payload: Array<{
    username: string;
    rate: '+' | '-';
    rated: boolean;
  }> | undefined,
    entity: 'comment' | 'post'
  ) => {
    let rate = 0;
    payload?.forEach((item) => {
      if (item.rate === '+') rate++;
      else rate--;
    });
    if (entity === 'post') setPostRating(rate);
    else return rate;
  };

  const findCommentRate = (commentRates: Array<{
    username: string;
    rate: '+' | '-';
    rated: boolean;
  }>) => {
    let foundRatedComment;
    commentRates.forEach((item) => {
      if (item.rated) foundRatedComment = item.rate;
    });
    return foundRatedComment;
  };

  const handleRedirect = async (path: string) => {
    return router.push(`${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | {post?.title ?? 'Not found'}</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2 || l3}>
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
              <PostInfoBlog className={'space-between'}>
                <PostInfoBlog>
                  <OpacitySpan>Search tags: </OpacitySpan>
                  {post?.searchTags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </PostInfoBlog>
                <PostInfoBlog>
                  <PostRate
                    className={postRating > 0 ? 'positive' : postRating < 0 ? 'negative' : 'neutral'}
                  >Post rating: {postRating}</PostRate>
                </PostInfoBlog>
              </PostInfoBlog>

              {post?.content.map((item, index) => (
                <Paragraph key={index}>{item}</Paragraph>
              ))}

              {tokenPresent ? (
                <>
                  <PostVoteButtonsWrapper>
                    <PostVoteButton
                      className={`up ${postRated === '+' ? 'active' : ''}`}
                      onClick={() => fetchRatePost({ rate: '+' })}
                    >Cool!</PostVoteButton>
                    <PostVoteButton
                      className={`down ${postRated === '-' ? 'active' : ''}`}
                      onClick={() => fetchRatePost({ rate: '-' })}
                    >Nah...</PostVoteButton>
                  </PostVoteButtonsWrapper>
                </>
              ) : (
                <>
                  <JoinDiscussionTextWrapper>
                    <PostTitle className={'subtitle'}>
                      Like and wanna give the author now?
                    </PostTitle>
                    <PostTitle
                      className={'subtitle link'}
                      onClick={() => handleRedirect('/signup')}
                    >
                      Welcome on board!
                    </PostTitle>
                  </JoinDiscussionTextWrapper>
                </>
              )}

              {post?.postInfo.comments.length ? (
                <>
                  <PostTitle className={'subtitle'}>
                    Discussions
                  </PostTitle>
                  {post.postInfo.comments.map((comment, index) => (
                    <CommentContainer key={index}>
                      <CommentHeader>
                        <LinkWrapper>{comment.username}</LinkWrapper>
                        <CommentPayload>
                          Written at: <CommentOpacityPayload>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</CommentOpacityPayload>
                        </CommentPayload>
                      </CommentHeader>

                      <CommentPayload className={'body'}>{comment.payload}</CommentPayload>

                      {tokenPresent ? (
                        <VoteButtonsWrapper className={'space-between'}>
                          <VoteButtonsWrapper>
                            <VoteButton
                              className={`up ${findCommentRate(comment.commentRates) === '+' ? 'active' : ''}`}
                              onClick={() => fetchRateComment({
                                rate: '+',
                                commentId: comment.id
                              })}
                            >
                              <VoteButtonsWrapper className={'button-content'}>+</VoteButtonsWrapper>
                            </VoteButton>
                            <VoteButton
                              className={`down ${findCommentRate(comment.commentRates) === '-' ? 'active' : ''}`}
                              onClick={() => fetchRateComment({
                                rate: '-',
                                commentId: comment.id
                              })}
                            >
                              <VoteButtonsWrapper className={'button-content'}>-</VoteButtonsWrapper>
                            </VoteButton>
                          </VoteButtonsWrapper>
                          <VoteButtonsWrapper>
                            <PostRate
                              className={`comment ${countRating(comment.commentRates, 'comment') as number > 0 ? 'positive' : (countRating(comment.commentRates, 'comment') as number) < 0 ? 'negative' : 'neutral'}`}
                            >Comment rating: {countRating(comment.commentRates, 'comment')}
                            </PostRate>
                          </VoteButtonsWrapper>
                        </VoteButtonsWrapper>
                      ): (
                        <VoteButtonsWrapper>
                          <LinkWrapper
                            onClick={() => handleRedirect('/signup')}
                          >Wanna rate a comment?</LinkWrapper>
                        </VoteButtonsWrapper>
                      )}
                    </CommentContainer>
                  ))}
                </>
              ) : (
                <>
                  <JoinDiscussionTextWrapper>
                    <PostTitle className={'subtitle'}>
                      Quite empty here, huh? You can be first tho!
                    </PostTitle>
                  </JoinDiscussionTextWrapper>
                </>
              )}

              {tokenPresent ? (
                <>
                  <Textarea
                    value={comment}
                    placeholder={'Join the discussion'}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <PostButtonWrapper>
                    <Button
                      text={'Leave the comment'}
                      onClick={() => fetchLeaveComment()}
                    />
                  </PostButtonWrapper>
                </>
              ) : (
                <>
                  <JoinDiscussionTextWrapper>
                    <PostTitle className={'subtitle'}>
                      Found it interesting and wanna join?
                    </PostTitle>
                    <PostTitle
                      className={'subtitle link'}
                      onClick={() => handleRedirect('/signup')}
                    >
                      Welcome on board!
                    </PostTitle>
                  </JoinDiscussionTextWrapper>
                </>
              )}
            </>
          )}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Post;
