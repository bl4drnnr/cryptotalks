import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import { Input } from '@components/Input/Input.component';
import { Modal } from '@components/Modal/Modal.component';
import PersonalInformation from '@components/PersonalInformation/PersonalInformation.component';
import SecuritySettings from '@components/SecuritySettings/SecuritySettings.component';
import { TwoFa } from '@components/TwoFa/TwoFa.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useCloseAccountService } from '@services/close-account/close-account.service';
import { IPersonalInformation, ISecuritySettings } from '@services/get-user-settings/get-user-settings.interface';
import { useGetUserSettingsService } from '@services/get-user-settings/get-user-settings.service';
import { useSetPersonalSettingsService } from '@services/set-personal-settings/set-personal-settings.service';
import { useUploadPhotoService } from '@services/upload-photo/upload-photo.service';
import { NotificationType } from '@store/global/global.state';
import { ModalButtonWrapper } from '@styles/SecuritySettings.style';
import {
  ButtonWrapper,
  Container,
  CreatedAtDate,
  CreatedAtParagraph,
  Nickname,
  PersonalAccount,
  SettingsContainer,
  SettingsContent,
  SettingsHeaderItemsWrapper,
  SettingsHeaderTextWrapper,
  SettingsPageHeader,
  SettingsPageHeaderSide,
  SidebarContainer,
  UserProfilePicture,
  Wrapper
} from '@styles/settings.style';

const AccountSettings = () => {
  const router = useRouter();

  const { loading: l0, getUserSettings } = useGetUserSettingsService();
  const { loading: l1, closeAccount } = useCloseAccountService();
  const { loading: l2, setPersonalSettings } = useSetPersonalSettingsService();
  const { loading: l3, uploadPhoto } = useUploadPhotoService();
  const { showNotificationMessage } = useNotificationMessage();

  const fetchSettingsRef = React.useRef(true);

  const [internalLoader, setInternalLoader] = React.useState<boolean>(false);
  const [personalInformation, setPersonalInformation] = React.useState<IPersonalInformation>();
  const [securitySettings, setSecuritySettings] = React.useState<ISecuritySettings>();

  const [isProfilePicturePresent, setIsProfilePicturePresent] = React.useState<boolean>(false);
  const [closeAccountStep, setCloseAccountStep] = React.useState(1);
  const [closeAccountModal, setCloseAccountModal] = React.useState<boolean>();
  const [closePassword, setClosePassword] = React.useState<string>('');
  const [twoFaCode, setTwoFaCode] = React.useState('');
  const [code, setCode] = React.useState('');

  const [section, setSection] = React.useState('personalInformation');
  const [sections, ] = React.useState([{
      value: 'personalInformation',
      text: 'Personal information',
      danger: false
    }, {
      value: 'securitySettings',
      text: 'Security settings',
      danger: false
    }]
  );
  const { handleException } = useHandleException();

  React.useEffect(() => {
    if (fetchSettingsRef.current) {
      fetchSettingsRef.current = false;
      const token = localStorage.getItem('_at');

      if (!token) handleRedirect('/').then();
      else fetchUserSettings(token).then();
    }
  }, []);

  const exceptionHandler = async (e: any) => {
    handleException(e);
    if (e.message !== 'username-taken') {
      localStorage.removeItem('_at');
      await handleRedirect('/');
    }
  };

  const fetchUserSettings = async (token: string | null) => {
    try {
      const {
        personalSettings,
        securitySettings,
        isProfilePicPresent
      } = await getUserSettings({ token });

      setPersonalInformation(personalSettings);
      setSecuritySettings(securitySettings);
      setIsProfilePicturePresent(isProfilePicPresent);
      return;
    } catch (e) {
      handleException(e);
      localStorage.removeItem('_at');
      await handleRedirect('/');
    }
  };

  const applyPersonalInformation = async () => {
    try {
      const token = localStorage.getItem('_at');
      await setPersonalSettings({ ...personalInformation, token });
      return handleRedirect('/account');
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchPhotoUpload = async (file: any) => {
    try {
      const token = localStorage.getItem('_at');

      await uploadPhoto({ photo: file, token });
      await fetchUserSettings(token);

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Photo has been successfully uploaded'
      });

      return;
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchCloseUserAccount = async () => {
    try {
      const token = localStorage.getItem('_at');
      const { message } = await closeAccount({
        token, password: closePassword, code: twoFaCode || code
      });

      if (message === 'code-sent')
        return setCloseAccountStep(2);
      else if (message === 'two-fa-required')
        return setCloseAccountStep(3);

      showNotificationMessage({
        type: NotificationType.SUCCESS,
        content: 'Account has been successfully closed'
      });

      localStorage.removeItem('_at');
      await handleRedirect('/');
    } catch (e) {
      return handleException(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Settings</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2 || l3 || internalLoader}>
        <Container>
          <Wrapper>

            <SettingsPageHeader>
              <SettingsPageHeaderSide
                onClick={() => handleRedirect('/account')}
              >
                <UserProfilePicture>
                  {isProfilePicturePresent ? (
                    <Image
                      className={'ava'}
                      src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/users-profile-pictures/${personalInformation?.id}.png`}
                      alt={'ava'}
                      width={128}
                      height={128}
                    />
                  ) : (
                    <Image
                      className={'ava'}
                      src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/testava.jpg`}
                      alt={'ava'}
                      width={128}
                      height={128}
                    />
                  )}
                </UserProfilePicture>

                <SettingsHeaderItemsWrapper>
                  <SettingsHeaderTextWrapper>
                    <Nickname>{personalInformation?.username} ({securitySettings?.email})</Nickname>
                    <PersonalAccount>Your personal account</PersonalAccount>
                  </SettingsHeaderTextWrapper>
                </SettingsHeaderItemsWrapper>
              </SettingsPageHeaderSide>

              <SettingsHeaderItemsWrapper className={'created-at'}>
                <SettingsHeaderTextWrapper>
                  <CreatedAtParagraph>Account created at</CreatedAtParagraph>
                  <CreatedAtDate>{dayjs(personalInformation?.createdAt).format('YYYY-MM-DD')}</CreatedAtDate>
                </SettingsHeaderTextWrapper>
              </SettingsHeaderItemsWrapper>
            </SettingsPageHeader>

            <SettingsContainer>
              <SidebarContainer>
                {sections.map(item => (
                  <ButtonWrapper key={item.value}>
                    <Button
                      text={item.text}
                      fillButton={section === item.value}
                      onClick={() => setSection(item.value)}
                    />
                  </ButtonWrapper>
                ))}
                <ButtonWrapper>
                  <Button
                    text={'Close account'}
                    onClick={() => setCloseAccountModal(true)}
                    fillDanger={true}
                  />
                  {closeAccountModal ? (
                    <Modal
                      onClose={() => setCloseAccountModal(false)}
                      header={'Close account'}
                      description={'Be careful! You are about to close your account! This action will remove all your data, but most importantly, we are gonna miss you :( In order to continue, provide your password.'}
                    >
                      <>
                        {closeAccountStep === 1 ? (
                          <>
                            <Input
                              onWhite={true}
                              type={'password'}
                              value={closePassword}
                              placeholder={'Password'}
                              onChange={(e) => setClosePassword(e.target.value)}
                            />
                            <ModalButtonWrapper className={'vertical-margin'}>
                              <Button
                                disabled={closePassword.length < 8}
                                onWhite={true}
                                onClick={() => fetchCloseUserAccount()}
                                text={'Close account'}
                              />
                            </ModalButtonWrapper>
                          </>
                        ) : (closeAccountStep === 2 ? (
                          <>
                            <TwoFa
                              styles={{ justifyCenter: true, onWhite: true }}
                              title={'Mobile 2FA code'}
                              setTwoFaCode={setCode}
                            />
                            <ModalButtonWrapper>
                              <Button
                                disabled={code.length !== 6}
                                onWhite={true}
                                onClick={() => fetchCloseUserAccount()}
                                text={'Submit'}
                              />
                            </ModalButtonWrapper>
                          </>
                        ) : (
                          <>
                            <TwoFa
                              styles={{ justifyCenter: true, onWhite: true }}
                              title={'Two factor authentication code'}
                              setTwoFaCode={setTwoFaCode}
                            />
                            <ModalButtonWrapper>
                              <Button
                                disabled={twoFaCode.length !== 6}
                                onWhite={true}
                                onClick={() => fetchCloseUserAccount()}
                                text={'Submit'}
                              />
                            </ModalButtonWrapper>
                          </>
                        ))}
                      </>
                    </Modal>
                  ) : null}
                </ButtonWrapper>
              </SidebarContainer>
              <SettingsContent>
                {section === 'personalInformation' ? (
                  <PersonalInformation
                    isProfilePicturePresent={isProfilePicturePresent}
                    personalInformation={personalInformation}
                    setPersonalInformation={setPersonalInformation}
                    applyPersonalInformation={applyPersonalInformation}
                    setSelectedFile={fetchPhotoUpload}
                  />
                ) : (section === 'securitySettings' ? (
                  <SecuritySettings
                    securitySettings={securitySettings}
                    setSecuritySettings={setSecuritySettings}
                    setInternalLoader={setInternalLoader}
                  />
                ) : (<></>))}
              </SettingsContent>
            </SettingsContainer>

          </Wrapper>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default AccountSettings;
