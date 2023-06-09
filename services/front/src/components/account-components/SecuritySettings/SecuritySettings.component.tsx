import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as node2fa from 'node-2fa';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { Modal } from '@components/Modal/Modal.component';
import { SecuritySettingsProps } from '@components/SecuritySettings/SecuritySettings.interface';
import { TwoFa } from '@components/TwoFa/TwoFa.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import {
  validateEmail,
  validatePassword,
  validatePasswordLength,
  validatePasswordRules
} from '@hooks/useValidators.hook';
import { useChangeEmailService } from '@services/change-email/change-email.service';
import { useChangePasswordService } from '@services/change-password/change-password.service';
import { useRemove2FaService } from '@services/remove-2fa/remove-2fa.service';
import { useRemovePhoneService } from '@services/remove-phone/remove-phone.service';
import { useSet2FaService } from '@services/set-2fa/set-2fa.service';
import { useSetPhoneService } from '@services/set-phone/set-phone.service';
import { NotificationType } from '@store/global/global.state';
import { Dot, PasswordCheckBox, PasswordCheckLine } from '@styles/login.style';
import {
  ItemDescription,
  ItemTitle,
  ModalButtonWrapper,
  ModalItemsWrapper,
  SecurityItemBlock,
  SecurityItemWrapper,
  SecuritySectionDescription,
  SecurityTitle,
  SecurityTitleBox,
  SeparationLine,
  Tooltip,
  TooltipImageWrapper,
  TooltipWrapper
} from '@styles/SecuritySettings.style';

const SecuritySettings = ({
  securitySettings,
  setInternalLoader,
  setSecuritySettings
}: SecuritySettingsProps) => {
  const router = useRouter();

  const [twoFaModal, setTwoFaModal] = React.useState(false);
  const [phoneModal, setPhoneModal] = React.useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = React.useState(false);
  const [changeEmailModal, setChangeEmailModal] = React.useState(false);

  const [twoFaCode, setTwoFaCode] = React.useState('');
  const [twoFaToken, setTwoFaToken] = React.useState('');
  const [twoFaQr, setTwoFaQr] = React.useState('');

  const [phoneStep, setPhoneStep] = React.useState(1);
  const [phone, setMobilePhone] = React.useState('');
  const [code, setCode] = React.useState('');

  const [passwordChangeTwoFa, setPasswordChangeTwoFa] = React.useState('');
  const [passwordChangeCode, setPasswordChangeCode] = React.useState('');
  const [passwordChangeStep, setPasswordChangeStep] = React.useState(1);
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
  const [currentPasswordError, setCurrentPasswordError] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [changedPassword, setChangedPassword] = React.useState({ password: '', repeatPassword: '' });

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [changeEmailTwoFa, setChangeEmailTwoFa] = React.useState('');
  const [changeEmailCode, setChangeEmailCode] = React.useState('');
  const [changeEmailStep, setChangeEmailStep] = React.useState(1);

  const { loading: l0, set2Fa } = useSet2FaService();
  const { loading: l1, remove2Fa } = useRemove2FaService();
  const { loading: l2, changeEmail } = useChangeEmailService();
  const { loading: l3, changePassword } = useChangePasswordService();
  const { loading: l4, setPhone } = useSetPhoneService();
  const { loading: l5, removePhone } = useRemovePhoneService();

  const { handleException } = useHandleException();
  const { showNotificationMessage } = useNotificationMessage();

  React.useEffect(() => {
    if (currentPassword.length > 0)
      setCurrentPasswordError(!validatePasswordLength(currentPassword));
  }, [currentPassword]);

  React.useEffect(() => {
    if (!validateEmail(email)) setEmailError(true);
    else if (validateEmail(email) === 1) setEmailError(false);
    else setEmailError(false);
  }, [email]);

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

  React.useEffect(() => {
    setInternalLoader(l0 || l1 || l2 || l3 || l4 || l5);
  }, [l0, l1, l2, l3, l4, l5]);

  const exceptionHandler = async (e: any) => {
    handleException(e);
    if ([401, 403].includes(e.statusCode)) {
      localStorage.removeItem('_at');
      await handleRedirect('');
    }
  };

  const openTwoFaModal = ({ generateToken }: { generateToken: boolean; }) => {
    setTwoFaModal(true);
    if (generateToken) {
      const { qr, secret } = node2fa.generateSecret({
        name: 'Cryptotalks', account: securitySettings!.email
      });
      setTwoFaToken(secret);
      setTwoFaQr(qr);
    }
  };

  const fetchSetTwoFa = async () => {
    try {
      const token = localStorage.getItem('_at');
      await set2Fa({ token, twoFaToken, twoFaCode });

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: '2FA has been successfully set'
      });

      setTwoFaModal(false);
      setSecuritySettings({ ...securitySettings, twoFaToken: true });
      return;
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchRemoveTwoFa = async () => {
    try {
      const token = localStorage.getItem('_at');
      await remove2Fa({ token, twoFaCode });

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: '2FA has been successfully removed'
      });

      setTwoFaModal(false);
      setSecuritySettings({ ...securitySettings, twoFaToken: false });
      return;
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchSetPhone = async () => {
    try {
      const token = localStorage.getItem('_at');
      const { message } = await setPhone({ token, phone, code });

      if (message === 'code-sent') {
        return setPhoneStep(2);
      } else {
        showNotificationMessage({
          type: NotificationType.SUCCESS,
          content: 'Phone has been successfully set'
        });
        setPhoneModal(false);
        setSecuritySettings({ ...securitySettings, phone });
      }

      return;
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchRemovePhone = async () => {
    try {
      setPhoneModal(true);
      const token = localStorage.getItem('_at');
      const { message } = await removePhone({ token, code });

      if (message === 'code-sent') {
        showNotificationMessage({
          type: NotificationType.SUCCESS,
          content: 'SMS message has been sent'
        });
      } else {
        showNotificationMessage({
          type: NotificationType.SUCCESS,
          content: 'Phone has been successfully removed'
        });

        setPhoneModal(false);
        setSecuritySettings({ ...securitySettings, phone: null });
      }
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchChangeEmail = async () => {
    try {
      const token = localStorage.getItem('_at');
      const { message } = await changeEmail({
        token,
        email,
        twoFaCode: changeEmailTwoFa,
        code: changeEmailCode
      });

      if (message === 'code-sent') {
        return setChangeEmailStep(2);
      } else if (message === 'two-fa-required') {
        return setChangeEmailStep(3);
      }

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Confirmation email changing has been sent'
      });

      setChangeEmailModal(false);
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchChangePassword = async () => {
    try {
      const token = localStorage.getItem('_at');
      const { message } = await changePassword({
        password: changedPassword.password,
        passwordRepeat: changedPassword.repeatPassword,
        code: passwordChangeCode,
        twoFaCode: passwordChangeTwoFa,
        token
      });

      if (message === 'code-sent') {
        return setPasswordChangeStep(2);
      } else if (message === 'two-fa-required') {
        return setPasswordChangeStep(3);
      }

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Password has been successfully changed'
      });

      setPasswordChangeModal(false);
      setSecuritySettings({ ...securitySettings, passwordChanged: dayjs().add(24, 'hours') });
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  const validateFields = () => {
    return changedPassword.password &&
      changedPassword.repeatPassword &&
      !passwordError.passwordMismatch &&
      !passwordError.passwordRequirement &&
      !passwordError.passwordRules;
  };

  return (
    <>
      <SecurityTitleBox>
        <SecurityTitle>Security settings</SecurityTitle>
        <SecuritySectionDescription>Manage security of your account</SecuritySectionDescription>
      </SecurityTitleBox>
      <SeparationLine className={'margin-bottom'} />

      <SecurityItemBlock>
        {!securitySettings?.twoFaToken ? (
          <>
            <SecurityItemWrapper>
              <TooltipWrapper>
                <ItemTitle>
                  Set 2FA
                  <Tooltip
                    className={'tooltip'}
                    data-tool-tip='You can set up only 2FA or mobile phone as an additional way to secure your account'
                  >
                    <TooltipImageWrapper>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/info.svg`}
                        alt={'info'}
                        width={20}
                        height={20}
                      />
                    </TooltipImageWrapper>
                  </Tooltip>
                  <Tooltip className={'activated activated--deactivated'} data-tool-tip='Not active'/>
                </ItemTitle>
              </TooltipWrapper>
              <ItemDescription>Secure your account with two-factor authentication (2FA).</ItemDescription>
            </SecurityItemWrapper>
            <SecurityItemWrapper className={'button'}>
              <Button
                disabled={!!securitySettings?.phone}
                text={'Set 2FA'}
                onClick={() => openTwoFaModal({ generateToken: true })}
              />
              {twoFaModal ? (
                <Modal
                  onClose={() => setTwoFaModal(false)}
                  header={'Set 2FA'}
                  description={'Secure your account with two-factor authentication (2FA).'}
                >
                  <ModalItemsWrapper>
                    <Image src={twoFaQr} alt={'2fa'} width={200} height={200} />
                    <TwoFa
                      styles={{ justifyCenter: true, onWhite: true }}
                      title={'Two factor authentication code'}
                      setTwoFaCode={setTwoFaCode}
                    />
                    <ModalButtonWrapper>
                      <Button
                        onWhite={true}
                        text={'Confirm 2FA code'}
                        onClick={() => fetchSetTwoFa()}
                      />
                    </ModalButtonWrapper>
                  </ModalItemsWrapper>
                </Modal>
              ) : null}
            </SecurityItemWrapper>
          </>
        ) : (
          <>
            <SecurityItemWrapper>
              <ItemTitle>
                Disable 2FA
                <Tooltip
                  className={'tooltip'}
                  data-tool-tip='You can set up only 2FA or mobile phone as an additional way to secure your account'
                >
                  <TooltipImageWrapper>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/info.svg`}
                      alt={'info'}
                      width={20}
                      height={20}
                    />
                  </TooltipImageWrapper>
                </Tooltip>
                <Tooltip className={'activated'} data-tool-tip='Active'/>
              </ItemTitle>
              <ItemDescription>You have set up Two-factor authentication (2FA) for your account.</ItemDescription>
            </SecurityItemWrapper>
            <SecurityItemWrapper className={'button'}>
              <Button
                danger={true}
                text={'Disable 2FA'}
                onClick={() => openTwoFaModal({ generateToken: false })}
              />
              {twoFaModal ? (
                <Modal
                  onClose={() => setTwoFaModal(false)}
                  header={'Disable 2FA'}
                  description={'You are about deactivate your Two-factor authentication. Be careful! This action will decrease your account security. We recommend to have 2FA either mobile phone for security purposes.'}
                >
                  <ModalItemsWrapper>
                    <TwoFa
                      styles={{ justifyCenter: true, onWhite: true }}
                      title={'Two factor authentication code'}
                      setTwoFaCode={setTwoFaCode}
                    />
                    <ModalButtonWrapper>
                      <Button
                        onWhite={true}
                        danger={true}
                        text={'Disable 2FA'}
                        onClick={() => fetchRemoveTwoFa()}
                      />
                    </ModalButtonWrapper>
                  </ModalItemsWrapper>
                </Modal>
              ) : null}
            </SecurityItemWrapper>
          </>
        )}
      </SecurityItemBlock>

      <SecurityItemBlock>
        {!securitySettings?.phone ? (
          <>
            <SecurityItemWrapper>
              <ItemTitle>
                Set mobile phone
                <Tooltip
                  className={'tooltip'}
                  data-tool-tip='You can set up only 2FA or mobile phone as an additional way to secure your account'
                >
                  <TooltipImageWrapper>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/info.svg`}
                      alt={'info'}
                      width={20}
                      height={20}
                    />
                  </TooltipImageWrapper>
                </Tooltip>
                <Tooltip className={'activated activated--deactivated'} data-tool-tip='Not active'/>
              </ItemTitle>
              <ItemDescription>Secure your account with mobile MFA.</ItemDescription>
            </SecurityItemWrapper>
            <SecurityItemWrapper className={'button'}>
              <Button
                disabled={securitySettings?.twoFaToken}
                text={'Set phone'}
                onClick={() => setPhoneModal(true)}
              />
              {phoneModal ? (
                <Modal
                  onClose={() => setPhoneModal(false)}
                  header={'Set mobile phone'}
                  description={'You are about deactivate your Two-factor authentication. Be careful! This action will decrease your account security. We recommend to have 2FA either mobile phone for security purposes.'}
                >
                  <>
                    <Input
                      disabled={phoneStep === 2}
                      onWhite={true}
                      value={phone}
                      placeholder={'Mobile phone (with prefix (+1, for instance), without spaces)'}
                      onChange={(e) => setMobilePhone(e.target.value)}
                    />
                    {phoneStep === 2 ? (
                      <TwoFa
                        styles={{ justifyCenter: true, onWhite: true }}
                        title={'Provide code from SMS message'}
                        setTwoFaCode={setCode}
                      />
                    ) : null}
                    <ModalButtonWrapper className={'vertical-margin'}>
                      <Button
                        onWhite={true}
                        text={'Set mobile phone'}
                        onClick={() => fetchSetPhone()}
                      />
                    </ModalButtonWrapper>
                  </>
                </Modal>
              ) : null}
            </SecurityItemWrapper>
          </>
        ) : (
          <>
            <SecurityItemWrapper>
              <ItemTitle>
                Disable mobile phone
                <Tooltip
                  className={'tooltip'}
                  data-tool-tip='You can set up only 2FA or mobile phone as an additional way to secure your account'
                >
                  <TooltipImageWrapper>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/info.svg`}
                      alt={'info'}
                      width={20}
                      height={20}
                    />
                  </TooltipImageWrapper>
                </Tooltip>
                <Tooltip className={'activated'} data-tool-tip='Active'/>
              </ItemTitle>
              <ItemDescription>You have set up 2FA for your account with mobile phone.</ItemDescription>
            </SecurityItemWrapper>
            <SecurityItemWrapper className={'button'}>
              <Button
                danger={true}
                text={'Disable phone'}
                onClick={() => fetchRemovePhone()}
              />
              {phoneModal ? (
                <Modal
                  onClose={() => setPhoneModal(false)}
                  header={'Disable mobile phone'}
                  description={'Secure your account with mobile MFA. Alternative way of MFA, instead of authenticator application.'}
                >
                  <>
                    <TwoFa
                      styles={{ justifyCenter: true, onWhite: true }}
                      title={'Provide code from SMS message'}
                      setTwoFaCode={setCode}
                    />
                    <ModalButtonWrapper>
                      <Button
                        onWhite={true}
                        text={'Remove mobile phone'}
                        onClick={() => fetchRemovePhone()}
                      />
                    </ModalButtonWrapper>
                  </>
                </Modal>
              ) : null}
            </SecurityItemWrapper>
          </>
        )}
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>Change password
            {dayjs().diff(securitySettings?.passwordChanged, 'hours') < 24 ? (
              <Tooltip className={'pending'} data-tool-tip='Pending'/>
            ) : null}
          </ItemTitle>
          <ItemDescription>Be careful! Some operations won&apos;t be available for 24h after change.</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            disabled={dayjs().diff(securitySettings?.passwordChanged, 'hours') < 24}
            text={'Change password'}
            onClick={() => setPasswordChangeModal(true)}
          />
          {passwordChangeModal ? (
            <Modal
              onClose={() => setPasswordChangeModal(false)}
              header={'Change password'}
              description={'Be careful! Some operations won\'t be available for 24h after change.'}
            >
              <>
                <Input
                  type={'password'}
                  onWhite={true}
                  onError={currentPasswordError}
                  value={currentPassword}
                  placeholder={'Current password'}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  type={'password'}
                  onWhite={true}
                  onError={passwordError.passwordMismatch || passwordError.passwordRequirement}
                  value={changedPassword.password}
                  placeholder={'New password'}
                  onChange={(e) => setChangedPassword({ ...changedPassword, password: e.target.value })}
                />
                <Input
                  type={'password'}
                  onWhite={true}
                  onError={passwordError.passwordMismatch || passwordError.passwordRequirement}
                  value={changedPassword.repeatPassword}
                  placeholder={'Repeat new password'}
                  onChange={(e) => setChangedPassword({ ...changedPassword, repeatPassword: e.target.value })}
                />
                {passwordError.passwordRules ? (
                  <PasswordCheckBox className={'no-padding'}>
                    {passwordRulesList.map(rule => {
                      return (
                        <PasswordCheckLine className={'on-white'} key={rule.text}>
                          <Dot className={classNames({ error: !rule.error })}/>
                          <p>{rule.text}</p>
                        </PasswordCheckLine>);
                    })}
                  </PasswordCheckBox>
                ) : null}
                {passwordChangeStep === 2 ? (
                  <TwoFa
                    styles={{ justifyCenter: true, onWhite: true }}
                    title={'Provide MFA authentication code from SMS'}
                    setTwoFaCode={setPasswordChangeCode}
                  />
                ) : passwordChangeStep === 3 ? (
                  <TwoFa
                    styles={{ justifyCenter: true, onWhite: true }}
                    title={'Provide MFA authentication code'}
                    setTwoFaCode={setPasswordChangeTwoFa}
                  />
                ) : null}
                <ModalButtonWrapper className={'vertical-margin'}>
                  <Button
                    disabled={!validateFields()}
                    onWhite={true}
                    text={'Change password'}
                    onClick={() => fetchChangePassword()}
                  />
                </ModalButtonWrapper>
              </>
            </Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        {securitySettings?.emailChanged ? (
          <>
            <SecurityItemWrapper>
              <ItemTitle>Change email</ItemTitle>
              <ItemDescription>You have already changed an email, and you are allowed to do this only one time.</ItemDescription>
            </SecurityItemWrapper>
            <SecurityItemWrapper className={'button'}>
              <Button
                disabled={true}
                text={'Change email'}
                onClick={() => setChangeEmailModal(true)}
              />
            </SecurityItemWrapper>
          </>
        ) : (
          <>
            <SecurityItemWrapper>
              <ItemTitle>Change email</ItemTitle>
              <ItemDescription>Be careful! You are able to change email only one time.</ItemDescription>
            </SecurityItemWrapper>
            <SecurityItemWrapper className={'button'}>
              <Button
                text={'Change email'}
                onClick={() => setChangeEmailModal(true)}
              />
              {changeEmailModal ? (
                <Modal
                  onClose={() => setChangeEmailModal(false)}
                  header={'Change email'}
                  description={'Be careful! You are able to change email only one time.'}
                >
                  <>
                    <Input
                      onWhite={true}
                      value={email}
                      onError={emailError}
                      placeholder={'New email'}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {changeEmailStep === 2 ? (
                      <TwoFa
                        styles={{ justifyCenter: true, onWhite: true }}
                        title={'Provide MFA authentication code from SMS'}
                        setTwoFaCode={setChangeEmailCode}
                      />
                    ) : changeEmailStep === 3 ? (
                      <TwoFa
                        styles={{ justifyCenter: true, onWhite: true }}
                        title={'Provide MFA authentication code'}
                        setTwoFaCode={setChangeEmailTwoFa}
                      />
                    ) : null}
                    <ModalButtonWrapper className={'vertical-margin'}>
                      <Button
                        disabled={emailError}
                        onWhite={true}
                        text={'Change email'}
                        onClick={() => fetchChangeEmail()}
                      />
                    </ModalButtonWrapper>
                  </>
                </Modal>
              ) : null}
            </SecurityItemWrapper>
          </>
        )}
      </SecurityItemBlock>
    </>
  );
};

export default SecuritySettings;
