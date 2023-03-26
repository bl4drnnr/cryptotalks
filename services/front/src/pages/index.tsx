import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Input } from '@components/Input/Input.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import DefaultLayout from '@layouts/Default.layout';
import {
  Bold,
  BoldWeb3,
  ButtonText,
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

  const { height, width } = useWindowDimensions();
  const [pictureSize, setPictureSize] = React.useState({
    crypto: 400, ntf: 500
  });

  const [email, setEmail] = React.useState('');

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  React.useEffect(() => {
    if (width && width < 1200) setPictureSize({ crypto: 200, ntf: 200 });
    else setPictureSize({ crypto: 400, ntf: 500 });
  }, [width]);

  return (
    <DefaultLayout>
      <Head>
        <title>Cryptotalks | Home</title>
      </Head>
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

    </DefaultLayout>
  );
};

export default Home;
