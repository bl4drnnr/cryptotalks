import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Input } from '@components/Input/Input.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { ListCryptoResponse } from '@services/list-crypto/list-crypto.interface';
import { useListCryptoService } from '@services/list-crypto/list-crypto.service';
import { ListPostsResponse } from '@services/posts/list-posts/list-posts.interface';
import { useListPostsService } from '@services/posts/list-posts/list-posts.service';
import {
  Bold,
  BoldWeb3,
  ButtonText,
  HomeDescriptionSide,
  HomeParagraph,
  HomePostsContainer,
  HomePostsTitle,
  HomeWelcomeBox,
  HomeWelcomeTitle,
  InputWrapper,
  Line,
  Lines,
  MainHomeWelcomeContainer,
  StartButton
} from '@styles/home.style';

const Home = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [posts, setPosts] = React.useState<ListPostsResponse>();
  const [coins, setCoins] = React.useState<ListCryptoResponse>();

  const { handleException } = useHandleException();
  const { loading: l0, listPosts } = useListPostsService();
  const { loading: l1, listCrypto } = useListCryptoService();

  React.useEffect(() => {
    fetchListCoins().then((res) => setCoins(res));
    fetchListPosts().then((res) => setPosts(res));
  }, []);

  const fetchListCoins = async () => {
    try {
      return await listCrypto({
        page: 0,
        pageSize: 3,
        order: '',
        orderBy: ''
      });
    } catch (e) {
      await handleException(e);
    }
  };

  const fetchListPosts = async () => {
    try {
      return await listPosts({
        page: 0,
        pageSize: 3,
        order: '',
        orderBy: ''
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
        <title>Cryptotalks | Home</title>
      </Head>
      <DefaultLayout>
        <MainHomeWelcomeContainer>
          <HomeWelcomeBox className={'name'}>
            <HomeWelcomeTitle><Bold>CRYPTOTALKS</Bold></HomeWelcomeTitle>
          </HomeWelcomeBox>

          <HomeWelcomeBox>
            <HomeWelcomeTitle>
              WHERE WE TALK ABOUT <BoldWeb3 >WEB3</BoldWeb3>
            </HomeWelcomeTitle>
          </HomeWelcomeBox>

          <HomeWelcomeBox className={'block'}>
            <InputWrapper>
              <Input
                high={true}
                value={email}
                placeholder={'Email'}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <StartButton onClick={() => handleRedirect(`signup?email=${email}`)}>
                <ButtonText>
                  Here we go
                </ButtonText>
              </StartButton>
            </InputWrapper>
          </HomeWelcomeBox>

          <Lines>
            {[...Array(7)].map((x, i) =>
              <Line key={i}/>
            )}
          </Lines>
        </MainHomeWelcomeContainer>

        <HomePostsContainer>
          <HomeDescriptionSide className={'image'}>
            <Image
              src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/skeleton-hello.gif`}
              alt={'skeleton'}
              width={500}
              height={500}
            />
          </HomeDescriptionSide>
          <HomeDescriptionSide>
            <HomePostsTitle className={'subtitle'}>Hello there! How&apos;s going?</HomePostsTitle>
            <HomeParagraph className={'small'}>Welcome to our forum dedicated to cryptocurrencies! We&apos;re thrilled to have you join our community of like-minded individuals who are passionate about the world of digital currencies. Your presence here is greatly appreciated, and we look forward to engaging in meaningful discussions, sharing insights, and learning from each other&apos;s experiences in the exciting realm of cryptocurrencies.</HomeParagraph>
            <HomeParagraph className={'small'}>We&apos;re delighted to see you on our cryptocurrency forum! Your participation adds immense value to our community, and we&apos;re excited to have you contribute your unique perspectives and knowledge about the ever-evolving world of blockchain technology and cryptocurrencies. Thank you for joining us, and we can&apos;t wait to embark on this cryptocurrency journey together!</HomeParagraph>
          </HomeDescriptionSide>
          <HomeDescriptionSide>
            <HomePostsContainer className={'align-center'}>
              <HomePostsTitle>Latest best posts</HomePostsTitle>
              <Image
                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/fire.png`}
                alt={'fire'}
                width={58}
                height={58}
              />
            </HomePostsContainer>
          </HomeDescriptionSide>
        </HomePostsContainer>

        <HomePostsContainer>
          <HomeDescriptionSide>
            <HomePostsContainer className={'align-center'}>
              <HomePostsTitle>The most hot coins</HomePostsTitle>
              <Image
                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/fire.png`}
                alt={'fire'}
                width={58}
                height={58}
              />
            </HomePostsContainer>
          </HomeDescriptionSide>
          <HomeDescriptionSide className={'image'}>
            <Image
              src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/skeleton-talk.gif`}
              alt={'skeleton'}
              width={500}
              height={500}
            />
          </HomeDescriptionSide>
          <HomeDescriptionSide>
            <HomePostsContainer className={'align-center'}>
              <HomePostsTitle>Here is what you can find here</HomePostsTitle>
              <Image
                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/fire.png`}
                alt={'fire'}
                width={58}
                height={58}
              />
            </HomePostsContainer>
          </HomeDescriptionSide>
        </HomePostsContainer>

        <HomePostsContainer>
          <HomeDescriptionSide className={'image'}>
            <Image
              src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/skeleton-cheetos.gif`}
              alt={'skeleton'}
              width={500}
              height={500}
            />
          </HomeDescriptionSide>
          <HomeDescriptionSide>
            <HomePostsTitle className={'subtitle'}>Anyway, glad you are here!</HomePostsTitle>
            <HomeParagraph>If you are interested in all this cryptogeek stuff, we always will be glad to see you as a part of this community.</HomeParagraph>
            <InputWrapper>
              <Input
                high={true}
                value={email}
                placeholder={'Email'}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <StartButton onClick={() => handleRedirect(`signup?email=${email}`)}>
                <ButtonText>
                  Let&apos;s roll!
                </ButtonText>
              </StartButton>
            </InputWrapper>
          </HomeDescriptionSide>
          <HomeDescriptionSide className={'image'}>
            <Image
              src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/skeleton-like.gif`}
              alt={'skeleton'}
              width={500}
              height={500}
            />
          </HomeDescriptionSide>
        </HomePostsContainer>
      </DefaultLayout>
    </>
  );
};

export default Home;
