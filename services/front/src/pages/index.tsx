import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Input } from '@components/Input/Input.component';
import DefaultLayout from '@layouts/Default.layout';
import {
  Bold,
  BoldWeb3,
  ButtonText, HomeDescriptionSide, HomePostsContainer, HomePostsTitle,
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
          <HomeDescriptionSide>
            <Image
              src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/skeleton.gif`}
              alt={'skeleton'}
              width={500}
              height={500}
            />
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
      </DefaultLayout>
    </>
  );
};

export default Home;
