import React from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { InputButton } from '@components/InputButton/InputButton.component';
import { useWindowDimensions } from '@hooks/useGetWindowDimensions.hook';
import { useHandleException } from '@hooks/useHandleException.hook';
import {
  validateEmail,
  validatePassword,
  validatePasswordRules
} from '@hooks/useValidators.hook';
import CredentialsLayout from '@layouts/Credentials.layout';
import { useForgotPasswordService } from '@services/forgot-password/forgot-password.service';
import {
  Box,
  Link,
  WelcomeTitle,
  LoginOptions,
  LoginOption,
  VerticalLine,
  MarginWrapper,
  HeaderLink,
  Title,
  PasswordCheckBox,
  PasswordCheckLine,
  Dot,
  Paragraph, SubTitle
} from '@styles/login.style';

const ForgotPassword = () => {
  const router = useRouter();

  const { width } = useWindowDimensions();
  const { handleException } = useHandleException();
  const { loading: l0, forgotPassword } = useForgotPasswordService();

  const [hideLeftSide, setHideLeftSide] = React.useState(false);
  const [passwordRecoveryMethod, setPasswordRecoveryMethod] = React.useState('email');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [verificationString, setVerificationString] = React.useState('');
  const [resetMessageSent, setResetMessageSent] = React.useState<string>('');
  const [changedPassword, setChangedPassword] = React.useState({ password: '', repeatPassword: '' });
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

  React.useEffect(() => {
    if (changedPassword.password === changedPassword.repeatPassword)
      setPasswordError({ ...passwordError, passwordMismatch: false });

    const passwordRuleCheck = validatePasswordRules(changedPassword.password);
    setPasswordRulesList(passwordRuleCheck);

    setPasswordError({
      passwordMismatch: !!((changedPassword.password && changedPassword.repeatPassword) && (changedPassword.password !== changedPassword.repeatPassword)),
      passwordRequirement: !changedPassword.password || !changedPassword.repeatPassword,
      passwordRules: (!validatePassword(changedPassword.password) || !validatePassword(changedPassword.repeatPassword))
    });

    if (!changedPassword.password && !changedPassword.repeatPassword) {
      setPasswordError({
        passwordMismatch: false,
        passwordRequirement: false,
        passwordRules: false
      });
    }
  }, [changedPassword.password, changedPassword.repeatPassword]);

  const fetchSendVerificationCode = async () => {
    try {
      const { message } = await forgotPassword({
        email, phone, verificationString, password: changedPassword.password
      });
      setResetMessageSent(message);
    } catch (e) {
      handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  React.useEffect(() => {
    if (!validateEmail(email)) setEmailError(true);
    else if (validateEmail(email) === 1) setEmailError(false);
    else setEmailError(false);
  }, [email]);

  React.useEffect(() => {
    if (width) setHideLeftSide(width <= 1050);
  }, [width]);

  const validateFields = () => {
    return changedPassword.password &&
      changedPassword.repeatPassword &&
      !passwordError.passwordMismatch &&
      !passwordError.passwordRequirement &&
      !passwordError.passwordRules;
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Forgot password</title>
      </Head>
      <CredentialsLayout leftSide={
        <Box>
          <WelcomeTitle>
            Forgot password?
          </WelcomeTitle>
          <WelcomeTitle>
            Hah... Not a big deal!
          </WelcomeTitle>

        </Box>
      } rightSide={
        <Box>
          {!['sent', 'success'].includes(resetMessageSent) ? (
            <Title>Forgot password?</Title>
          ): (<></>)}
          {!['sent', 'success'].includes(resetMessageSent) ? (
            <LoginOptions>
              <LoginOption onClick={() => setPasswordRecoveryMethod('email')}>With email</LoginOption>
              <VerticalLine/>
              <LoginOption onClick={() => setPasswordRecoveryMethod('phone')}>With phone</LoginOption>
            </LoginOptions>
          ) : (<></>)}

          {!['sent', 'success'].includes(resetMessageSent) ? (
            <>
              {passwordRecoveryMethod === 'email' ? (
                <MarginWrapper>
                  <InputButton
                    onError={emailError}
                    buttonTitle={'Send code'}
                    onChange={(e) => setEmail(e.target.value)}
                    onClick={() => fetchSendVerificationCode()}
                    buttonDisabled={resetMessageSent === 'sent' || emailError}
                    placeholder={'Email'}
                    value={email}
                  />
                </MarginWrapper>
              ) : (
                <MarginWrapper>
                  <InputButton
                    buttonTitle={'Send code'}
                    onChange={(e) => setPhone(e.target.value)}
                    onClick={() => fetchSendVerificationCode()}
                    buttonDisabled={resetMessageSent === 'sent'}
                    placeholder={'Phone'}
                    value={phone}
                  />
                </MarginWrapper>
              )}
            </>
          ): (<></>)}

          {resetMessageSent === 'sent' ? (
            <>
              <MarginWrapper>
                <Input
                  high={true}
                  value={verificationString}
                  onChange={(e) => setVerificationString(e.target.value)}
                  placeholder={'Verification string'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={passwordError.passwordMismatch || passwordError.passwordRequirement}
                  value={changedPassword.password}
                  onChange={(e) => setChangedPassword({ ...changedPassword, password: e.target.value })}
                  type={'password'}
                  placeholder={'Password'}
                />
              </MarginWrapper>

              <MarginWrapper>
                <Input
                  high={true}
                  onError={passwordError.passwordMismatch || passwordError.passwordRequirement}
                  value={changedPassword.repeatPassword}
                  onChange={(e) => setChangedPassword({ ...changedPassword, repeatPassword: e.target.value })}
                  type={'password'}
                  placeholder={'Password repeat'}
                />
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

              <Paragraph>We have sent a message, if this account exists.</Paragraph>
              <MarginWrapper>
                <Button
                  disabled={!verificationString || !validateFields()}
                  onClick={() => fetchSendVerificationCode()}
                  highHeight={true}
                  text={'Change password'}
                />
              </MarginWrapper>
            </>
          ) : (resetMessageSent === 'success' ? (
            <Box>
              <Title>Success!</Title>
              <MarginWrapper>
                <SubTitle>Your password has been successfully changed!</SubTitle>
              </MarginWrapper>
              <MarginWrapper>
                <Button
                  highHeight={true}
                  fillButton={true}
                  text={'Sign in'}
                  onClick={() => handleRedirect('/signin')}
                />
              </MarginWrapper>
            </Box>
          ) : (<></>))}
        </Box>
      } headerLink={
        <HeaderLink>
          Do not have an account yet? <Link
          onClick={() => handleRedirect('/signup')}
        >Sign up now!</Link>
        </HeaderLink>
      } rightDarkSide={true}
        leftSideHide={hideLeftSide}
        loading={l0}
      />
    </>
  );
};

export default ForgotPassword;
