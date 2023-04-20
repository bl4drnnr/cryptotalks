import Head from 'next/head';
import { useRouter } from 'next/router';

import GlobalLayout from '@layouts/Global.layout';
import { Container, Content, Link, Title } from '@styles/error.style';

const ErrorPage = () => {
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Not Found</title>
      </Head>
      <GlobalLayout>
        <Container>
          <Title>It&apos;s quite empty here, isn&apos;t it?</Title>
          <Content>Not sure what you were trying to found, but it&apos;s defensively not here</Content>
          <Link
            onClick={() => handleRedirect('/')}
          >Try to find it somewhere else</Link>
        </Container>
      </GlobalLayout>
    </>
  );
};

export default ErrorPage;
