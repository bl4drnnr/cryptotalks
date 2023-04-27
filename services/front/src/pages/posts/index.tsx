import React from 'react';

import Head from 'next/head';

import { Input } from '@components/Input/Input.component';
import Pagination from '@components/Pagination/Pagination.component';
import PostPreview from '@components/PostPreview/PostPreview.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { IPosts } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import {
  Container, PostIndexParagraph, PostIndexTitle,
  PostSearchInputWrapper,
  SortBar,
  SortItem,
  SortWrapper,
  TypeOfSortItem
} from '@styles/posts.style';

const Posts = () => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [order, setOrder] = React.useState('ASC');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [posts, setPosts] = React.useState<Array<IPosts>>();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentSort, setCurrentSort] = React.useState({
    name: 'createdAt',
    value: 'Sort by creation date'
  });
  const [sorts, _] = React.useState([{
    name: 'createdAt',
    value: 'Sort by creation date'
  }, {
    name: 'rate',
    value: 'Sort by rate'
  }, {
    name: 'title',
    value: 'Sort by title'
  }]);


  const { handleException } = useHandleException();
  const { loading: l0, listPosts } = useListPostsService();

  React.useEffect(() => {
    setOrderBy(currentSort.name);
  }, [currentSort]);

  React.useEffect(() => {
    fetchListPosts().then();
  }, []);

  React.useEffect(() => {
    fetchListPosts().then();
  }, [page, pageSize, order, orderBy, searchQuery]);

  const fetchListPosts = async () => {
    try {
      const { rows, count } = await listPosts({
        page, pageSize, order, orderBy, searchQuery
      });

      setPosts(rows);
      setTotalPages(count);
    } catch (e) {
      await handleException(e);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Posts</title>
      </Head>
      <DefaultLayout loading={l0}>
        <Container>

          <PostIndexTitle className={'main'}>Posts</PostIndexTitle>

          <PostIndexParagraph>Welcome to Cryptotalks, the leading platform for all things crypto. Here you will find a diverse range of articles, news, analysis, and opinion pieces on all aspects of the cryptocurrency world, from the latest blockchain technology developments to the most recent market trends.</PostIndexParagraph>

          <PostIndexParagraph>Our community of writers and readers is made up of individuals from all backgrounds and levels of expertise. Whether you&apos;re a seasoned crypto trader or just starting out, you&apos;ll find valuable insights and perspectives here that will help you make informed decisions and stay ahead of the curve.</PostIndexParagraph>

          <PostIndexParagraph>At Cryptotalks, we believe in the power of collaboration and knowledge-sharing. That&apos;s why we encourage our readers to not only consume content but also contribute their own articles, posts, and comments. Our platform is open and inclusive, and we welcome all voices and perspectives.</PostIndexParagraph>

          <PostIndexParagraph>So whether you&apos;re looking to stay up-to-date with the latest crypto news, connect with other like-minded individuals, or share your own insights and experiences, Cryptotalks is the place to be. Join our community today and become a part of the conversation!</PostIndexParagraph>

          <PostSearchInputWrapper>
            <Input
              value={searchQuery}
              placeholder={'Search for posts'}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </PostSearchInputWrapper>

          <SortWrapper>
            <SortBar>
              {sorts.map((item) => (
                <SortItem
                  className={currentSort.name === item.name ? 'active': ''}
                  key={item.name}
                  onClick={() => setCurrentSort(item)}
                >
                  {item.value}
                </SortItem>
              ))}
            </SortBar>
            <TypeOfSortItem
              onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}
            >
              {order}
            </TypeOfSortItem>
          </SortWrapper>

          {posts?.map((post) => (
            <PostPreview
              slug={post.slug}
              key={post.id}
              title={post.title}
              preview={post.preview}
              searchTags={post.searchTags}
              createdAt={post.createdAt}
            />
          ))}

          <Pagination
            currentPage={page + 1}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            totalPages={Math.ceil(totalPages / pageSize) === 0 ? 1 : Math.ceil(totalPages / pageSize)}
          />
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Posts;
