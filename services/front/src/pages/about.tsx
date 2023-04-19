import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import DefaultLayout from '@layouts/Default.layout';
import {
  Box,
  Container,
  ContentContainer,
  Header,
  Headers,
  TextContainer,
  TextContainerContent,
  TextContainerSubtitle,
  TextContainerTitle, Web3,
  Wrapper
} from '@styles/about.style';
import { ButtonText, InputWrapper, StartButton } from '@styles/home.style';

const About = () => {
  const { width } = useWindowDimensions();

  const [pictureSide, setPictureSize] = React.useState(600);

  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`${path}`);
  };

  React.useEffect(() => {
    if (width && width <= 1300) setPictureSize(300);
    else setPictureSize(600);
  }, [width]);

  return (
    <>
      <Head>
        <title>Cryptotalks | About</title>
      </Head>
      <DefaultLayout>
        <Container>
          <Box>
            <Wrapper>
              <Headers>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('THE FUTURE IS ')
                      .typeString('<strong>HERE</strong>')
                      .start();
                  }}
                />
              </Headers>
              <Headers>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(2500)
                      .typeString('THE FUTURE IS ')
                      .typeString('<strong>NOW</strong>')
                      .start();
                  }}
                />
              </Headers>
            </Wrapper>
            <Wrapper>
              <Web3>WEB<Header>3</Header></Web3>
            </Wrapper>
          </Box>
        </Container>

        <ContentContainer className={'light'}>
          <TextContainer>
            <TextContainerTitle>Welcome to Cryptotalks</TextContainerTitle>
            <TextContainerSubtitle>Place, where we want to make WEB3 real</TextContainerSubtitle>
            <TextContainerContent><strong>Cryptotalks</strong> is the place where we truly believe in WEB3 ideas and try to make it easier and more available to everyone to touch future of digital currencies and the Internet.</TextContainerContent>
            <TextContainerContent>This place is just another tool that wants to give users new experience of cryptocurrencies usage.</TextContainerContent>
          </TextContainer>
          <Image
            className={'asset'}
            src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/user-interface.gif`}
            alt={'user-interface'}
            width={pictureSide}
            height={pictureSide}
          />
        </ContentContainer>

        <ContentContainer>
          <Image
            className={'asset'}
            src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/web-address-registration.gif`}
            alt={'web-address-registration'}
            width={pictureSide}
            height={pictureSide}
          />
          <TextContainer className={'end'}>
            <TextContainerTitle>Why is WEB3 important?</TextContainerTitle>
            <TextContainerSubtitle>Future of money, money of future</TextContainerSubtitle>
            <TextContainerContent className={'end'}>Centralization has helped onboard billions of people to the World Wide Web and created the stable, robust infrastructure on which it lives.</TextContainerContent>
            <TextContainerContent className={'end'}>At the same time, a handful of centralized entities have a stronghold on large swathes of the World Wide Web, unilaterally deciding what should and should not be allowed.</TextContainerContent>
            <TextContainerContent className={'end'}>Web3 is the answer to this dilemma. Instead of a Web monopolized by large technology companies, Web3 embraces decentralization and is being built, operated, and owned by its users. Web3 puts power in the hands of individuals rather than corporations.</TextContainerContent>
          </TextContainer>
        </ContentContainer>

        <ContentContainer className={'light'}>
          <TextContainer>
            <TextContainerTitle>Get rid off chains</TextContainerTitle>
            <TextContainerSubtitle>We want only blocks one</TextContainerSubtitle>
            <TextContainerContent>If the past tells us anything, it is that once blockchains become a necessary part of everyday life, we will stop talking about them. That’s what happens to the essential technical underpinnings of killer apps.</TextContainerContent>
            <TextContainerContent>When the revolution comes, it will be because blockchain technology is a mature, stable foundation for the apps and services we want. We’ll focus on those, and we’ll stop talking so much about blockchain. We will know that blockchain technology has achieved its success when we stop talking about it.</TextContainerContent>
          </TextContainer>
          <Image
            className={'asset'}
            src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/web-designer-setting-up-web-layout.gif`}
            alt={'web-designer-setting-up-web-layout'}
            width={pictureSide}
            height={pictureSide}
          />
        </ContentContainer>

        <ContentContainer className={'end'}>
          <TextContainer className={'center'}>
            <TextContainerTitle>Interested, Huh?...</TextContainerTitle>
            <TextContainerSubtitle>Let&apos;s dive into right now</TextContainerSubtitle>
            <InputWrapper>
              <StartButton className={'aboutPage'} onClick={() => handleRedirect('/signup')}>
                <ButtonText>SURE, LET ME IN</ButtonText>
              </StartButton>
            </InputWrapper>
          </TextContainer>
        </ContentContainer>

      </DefaultLayout>
    </>
  );
};

export default About;
