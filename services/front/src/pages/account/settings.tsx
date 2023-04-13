import React from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@components/Button/Button.component';
import PersonalInformation from '@components/PersonalInformation/PersonalInformation.component';
import SecuritySettings from '@components/SecuritySettings/SecuritySettings.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import DefaultLayout from '@layouts/Default.layout';
import { useCloseAccountService } from '@services/close-account/close-account.service';
import {
  IPersonalInformation,
  ISecuritySettings
} from '@services/get-user-settings/get-user-settings.interface';
import { useGetUserSettingsService } from '@services/get-user-settings/get-user-settings.service';
import { useSetPersonalSettingsService } from '@services/set-personal-settings/set-personal-settings.service';
import { useSetSecuritySettingsService } from '@services/set-security-settings/set-security-settings.service';
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
  const { loading: l3, setSecurityUserSettings } = useSetSecuritySettingsService();

  const fetchSettingsRef = React.useRef(true);

  const [personalInformation, setPersonalInformation] = React.useState<IPersonalInformation>();
  const [securitySettings, setSecuritySettings] = React.useState<ISecuritySettings>();

  const [section, setSection] = React.useState('personalInformation');
  const [sections, ] = React.useState([
    { value: 'personalInformation',
      text: 'Personal information',
      danger: false
    }, {
      value: 'securitySettings',
      text: 'Security settings',
      danger: false
    }
  ]);
  const { handleException } = useHandleException();

  React.useEffect(() => {
    if (fetchSettingsRef.current) {
      fetchSettingsRef.current = false;
      const token = sessionStorage.getItem('_at');

      if (!token) handleRedirect('').then();
      else fetchUserSettings(token).then();
    }
  }, []);

  const exceptionHandler = async (e: any) => {
    handleException(e);
    if (e.message !== 'username-taken') {
      sessionStorage.removeItem('_at');
      await handleRedirect('');
    }
  };

  const fetchUserSettings = async (token: string) => {
    try {
      const { personalSettings, securitySettings } = await getUserSettings({ token });

      setPersonalInformation(personalSettings);
      setSecuritySettings(securitySettings);
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const applyPersonalInformation = async () => {
    try {
      const token = sessionStorage.getItem('_at');
      await setPersonalSettings({ ...personalInformation, token });
      return handleRedirect('account');
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const applySecuritySettings = async () => {
    try {
      const token = sessionStorage.getItem('_at');
      await setSecurityUserSettings({  ...securitySettings, token });
      return handleRedirect('account');
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchCloseUserAccount = async () => {
    try {
      const token = sessionStorage.getItem('_at');
      const response = await closeAccount({ token });
    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptotalks | Settings</title>
      </Head>
      <DefaultLayout loading={l0 || l1 || l2 || l3}>
        <Container>
          <Wrapper>

            <SettingsPageHeader>
              <SettingsPageHeaderSide
                onClick={() => handleRedirect('account')}
              >
                <UserProfilePicture>
                  <Image className={'ava'} src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/testava.jpg`} alt={'ava'} width={128} height={128}/>
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
                    onClick={() => fetchCloseUserAccount()}
                    fillDanger={true}
                  />
                </ButtonWrapper>
              </SidebarContainer>
              <SettingsContent>
                {section === 'personalInformation' ? (
                  <PersonalInformation
                    personalInformation={personalInformation}
                    setPersonalInformation={setPersonalInformation}
                    applyPersonalInformation={applyPersonalInformation}
                  />
                ) : (section === 'securitySettings' ? (
                  <SecuritySettings
                    securitySettings={securitySettings}
                    setSecuritySettings={setSecuritySettings}
                    applySecuritySettings={applySecuritySettings}
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
