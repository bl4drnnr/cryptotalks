import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import PostPreview from '@components/PostPreview/PostPreview.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import { Container } from '@styles/posts.style';

const Posts = () => {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [order, setOrder] = React.useState('ASC');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [searchQuery, setSearchQuery] = React.useState('');

  const [posts, setPosts] = React.useState<ListPostsResponse>();

  const { handleException } = useHandleException();
  const { loading: l0, listPosts } = useListPostsService();

  React.useEffect(() => {
    fetchListPosts().then((res) => setPosts(res));
  }, []);

  const fetchListPosts = async () => {
    try {
      return await listPosts({
        page, pageSize, order, orderBy, searchQuery
      });
    } catch (e) {
      await handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Posts</title>
      </Head>
      <DefaultLayout loading={l0}>
        <Container>
          {posts?.rows.map((post) => (
            <PostPreview
              key={post.id}
              title={post.title}
              preview={post.preview}
              searchTags={post.searchTags}
              createdAt={post.createdAt}
            />
          ))}
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Posts;
