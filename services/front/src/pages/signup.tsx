import React from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Checkbox } from '@components/Checkbox/Checkbox.component';
import { Input } from '@components/Input/Input.component';
import { Textarea } from '@components/Textarea/Textarea.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import { useHandleException } from '@hooks/useHandleException.hook';
import { validateEmail, validatePasswordRules, validatePassword } from '@hooks/useValidators.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { useSignUpService } from '@services/signup/signup.service';
import {
  Box,
  Link,
  Tea,
  MarginWrapper,
  PasswordCheckBox,
  Dot,
  PasswordCheckLine,
  WelcomeTitle,
  WelcomeText,
  Buttons,
  MarginVerticalWrapper,
  Title,
  SubTitle,
  HeaderLink,
  HeaderSmall,
  Paragraph
} from '@styles/login.style';

const Signup = () => {
  const router = useRouter();

  const { loading, signUp } = useSignUpService();
  const { handleException } = useHandleException();
  const { height, width } = useWindowDimensions();
  const [hideLeftSide, setHideLeftSide] = React.useState(false);

  const [step, setStep] = React.useState(1);
  const [tac, setTac] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [twitter, setTwitter] = React.useState('');
  const [linkedIn, setLinkedIn] = React.useState('');
  const [personalWebsite, setPersonalWebsite] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [publicEmail, setPublicEmail] = React.useState(false);

  const [password, setPassword] = React.useState({ password: '', repeatPassword: '' });
  const [passwordError, setPasswordError] = React.useState({
    passwordMismatch: false,
    passwordRequirement: false,
    passwordRules: false
  });
  const [passwordRulesList, setPasswordRulesList] = React.useState([
    { error: false, text: 'Password length should be more than 8 characters' },
    { error: false, text: 'Password should contain at least one uppercase character' },
    { error: false, text: 'Password should contain at least one lowercase character' },
    { error: false, text: 'Password should contain at least one special character' },
    { error: false, text: 'Password should contain at least one digit character' }
  ]);

  const signUpUser = async () => {
    try {
      const response = await signUp({
        password: password.password,
        bio,
        linkedIn,
        firstName,
        lastName,
        title,
        twitter,
        personalWebsite,
        tac,
        email,
        username,
        publicEmail
      });

      if (response.message == 'success') {
        setStep(3);
      }
    } catch (e) {
      handleException(e);
    }
  };

  React.useEffect(() => {
    const routeEmail = window.location.search;
    if (routeEmail.split('=').length >= 2) {
      setEmail(routeEmail.split('=')[1]);
    }
  }, [email]);

  React.useEffect(() => {
    if (width) setHideLeftSide(width <= 1050);
  }, [width]);

  React.useEffect(() => {
    if (!validateEmail(email)) setEmailError(true);
    else if (validateEmail(email) === 1) setEmailError(false);
    else setEmailError(false);
  }, [email]);

  React.useEffect(() => {
    setUsernameError(username.length === 1);
  }, [username]);

  React.useEffect(() => {
    if (password.password === password.repeatPassword)
      setPasswordError({ ...passwordError, passwordMismatch: false });

    const passwordRuleCheck = validatePasswordRules(password.password);
    setPasswordRulesList(passwordRuleCheck);

    setPasswordError({
      passwordMismatch: !!((password.password && password.repeatPassword) && (password.password !== password.repeatPassword)),
      passwordRequirement: !password.password || !password.repeatPassword,
      passwordRules: (!validatePassword(password.password) || !validatePassword(password.repeatPassword))
    });

    if (!password.password && !password.repeatPassword) {
      setPasswordError({
        passwordMismatch: false,
        passwordRequirement: false,
        passwordRules: false
      });
    }
  }, [password.password, password.repeatPassword]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const validateFields = () => {
    return tac &&
      !emailError &&
      email &&
      password.password &&
      password.repeatPassword &&
      !passwordError.passwordMismatch &&
      !passwordError.passwordRequirement &&
      !passwordError.passwordRules;
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Sign up</title>
      </Head>
      <CredentialsLayout leftSide={
        <Box>
          <WelcomeTitle>Hello there, cryptogeek!</WelcomeTitle>
          <WelcomeText>Welcome to Cryptotalks - platform that will keep you in touch with everything that happens in the world of cryptocurrencies.</WelcomeText>
          <WelcomeText>We are quite sure you have been doing this hundreds times before, so, no need to explain what you need to do, fields on the right side. See ya!</WelcomeText>
        </Box>
      } rightSide={
        <>
          {step === 1 ? (
            <Box>
              <Title>Sign up</Title>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={emailError}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Email'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={usernameError}
                  onErrorMessage={'Username should contain at least 1 symbol'}
                  value={username}
                  placeholder={'Username'}
                  onChange={(e) => setUsername(e.target.value)}
                  inputDescription={'Username should be unique'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={passwordError.passwordMismatch || passwordError.passwordRequirement}
                  value={password.password}
                  onChange={(e) => setPassword({ ...password, password: e.target.value })}
                  type={'password'}
                  placeholder={'Password'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={passwordError.passwordMismatch || passwordError.passwordRequirement}
                  value={password.repeatPassword}
                  onChange={(e) => setPassword({ ...password, repeatPassword: e.target.value })}
                  type={'password'}
                  placeholder={'Password repeat'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Checkbox
                  value={tac}
                  label={
                    <Tea>I confirm that I have read and accepted <Link
                      onClick={() => handleRedirect('terms-and-conditions')}>terms and conditions</Link>
                    </Tea>
                  } onChange={() => setTac(!tac)}/>
              </MarginWrapper>

              {passwordError.passwordRules ? (
                <PasswordCheckBox>
                  {passwordRulesList.map(rule => {
                    return (
                      <PasswordCheckLine key={rule.text}>
                        <Dot className={classNames({ error: !rule.error })}/>
                        <p>{rule.text}</p>
                      </PasswordCheckLine>);
                  })}
                </PasswordCheckBox>
              ) : (<></>)}

              <MarginWrapper>
                <Button
                  disabled={!validateFields()}
                  onClick={() => setStep(2)}
                  highHeight={true}
                  text={'Sign up'}
                />
              </MarginWrapper>

            </Box>
          ) : (step === 2 ? (
              <Box className={'scrollable'}>
                <MarginWrapper>
                  <HeaderSmall>Tell us a little about yourself</HeaderSmall>
                </MarginWrapper>
                <MarginWrapper>
                  <Paragraph>Don't worry, you can skip this step and fill information you want later</Paragraph>
                </MarginWrapper>

                <MarginWrapper>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={'First name'}
                  />
                </MarginWrapper>

                <MarginWrapper>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={'Last name'}
                  />
                </MarginWrapper>

                <MarginWrapper>
                  <HeaderSmall>Provide your nickname or link</HeaderSmall>
                </MarginWrapper>
                <hr/>

                <MarginWrapper>
                  <Input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder={'Twitter'}
                  />
                </MarginWrapper>
                <MarginWrapper>
                  <Input
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder={'LinkedIn'}
                  />
                </MarginWrapper>
                <MarginWrapper>
                  <Input
                    value={personalWebsite}
                    onChange={(e) => setPersonalWebsite(e.target.value)}
                    placeholder={'Personal website'}
                  />
                </MarginWrapper>

                <MarginWrapper>
                  <HeaderSmall>What do you want to tell this world?</HeaderSmall>
                </MarginWrapper>
                <hr/>

                <MarginWrapper>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={'Title'}
                  />
                </MarginWrapper>
                <MarginWrapper>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={'Bio'}
                  />

                </MarginWrapper>
                <Checkbox
                  value={publicEmail}
                  label={'Public email'}
                  onChange={() => setPublicEmail(!publicEmail)}
                />

                <Buttons>
                  <Button text={'Back'} onClick={() => setStep(step - 1)}/>
                  <MarginVerticalWrapper>
                    <Button text={'Skip'} onClick={() => signUpUser()}/>
                  </MarginVerticalWrapper>
                  <Button fillButton={true} text={'Sign up'} onClick={() => signUpUser()}/>
                </Buttons>
              </Box>
            ) : (
              <Box>
                <Title>Welcome!</Title>
                <MarginWrapper>
                  <SubTitle>Your account has been successfully created!</SubTitle>
                </MarginWrapper>
                <MarginWrapper>
                  <SubTitle>Please, check you email inbox in order to confirm registration by clicking the link you will find inside the message.</SubTitle>
                </MarginWrapper>
                <MarginWrapper>
                  <Button fillButton={true} text={'Sign in'} onClick={() => handleRedirect('signin')}/>
                </MarginWrapper>
              </Box>
            )
          )}
        </>
      } headerLink={
        <>
          {step === 1 &&
            <HeaderLink>Already have an account? <Link
              onClick={() => handleRedirect('signin')}
            >Sign in!</Link></HeaderLink>
          }
        </>
      } rightDarkSide={true}
        leftSideHide={hideLeftSide}
        loading={loading}
      />
    </>
  );
};


export default Signup;
