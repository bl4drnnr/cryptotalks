import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import * as node2fa from 'node-2fa';

import { Button } from '@components/Button/Button.component';
import { Loader } from '@components/Loader/Loader.component';
import { Modal } from '@components/Modal/Modal.component';
import { SecuritySettingsProps } from '@components/SecuritySettings/SecuritySettings.interface';
import { TwoFa } from '@components/TwoFa/TwoFa.component';
import { useHandleException } from '@hooks/useHandleException.hook';
import { useChangeEmailService } from '@services/change-email/change-email.service';
import { useChangePasswordService } from '@services/change-password/change-password.service';
import { useRemove2FaService } from '@services/remove-2fa/remove-2fa.service';
import { useSet2FaService } from '@services/set-2fa/set-2fa.service';
import {
  ItemDescription,
  ItemTitle,
  SeparationLine,
  SecurityItemBlock,
  SecurityTitle,
  SecurityTitleBox,
  SecurityItemWrapper,
  SecuritySectionDescription, ModalItemsWrapper
} from '@styles/SecuritySettings.style';


const SecuritySettings = ({ securitySettings }: SecuritySettingsProps) => {
  const [twoFaModal, setTwoFaModal] = React.useState(false);
  const [phoneModal, setPhoneModal] = React.useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = React.useState(false);
  const [changeEmailModal, setChangeEmailModal] = React.useState(false);

  const [twoFa, setTwoFa] = React.useState('');
  const [twoFaToken, setTwoFaToken] = React.useState('');
  const [twoFaQr, setTwoFaQr] = React.useState('');

  const { loading: l0, set2Fa } = useSet2FaService();
  const { loading: l1, remove2Fa } = useRemove2FaService();
  const { loading: l2, changeEmail } = useChangeEmailService();
  const { loading: l3, changePassword } = useChangePasswordService();

  const { handleException } = useHandleException();
  const router = useRouter();

  const exceptionHandler = async (e: any) => {
    handleException(e);
    sessionStorage.removeItem('_at');
    await handleRedirect('');
  };

  const openTwoFaModalAndGenerateToken = () => {
    setTwoFaModal(true);
    const { qr, secret } = node2fa.generateSecret({
      name: 'Cryptodistrict', account: securitySettings!.email
    });
    setTwoFaToken(secret);
    setTwoFaQr(qr);
  };

  const fetchSetTwoFa = async () => {
    try {

    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchRemoveTwoFa = async () => {
    try {

    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchChangeEmail = async () => {
    try {

    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const fetchChangePassword = async () => {
    try {

    } catch (e) {
      return exceptionHandler(e);
    }
  };

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  return (
    <>
      <Loader loading={l0 || l1 || l2 || l3} />
      <SecurityTitleBox>
        <SecurityTitle>Security settings</SecurityTitle>
        <SecuritySectionDescription>Manage security of your account</SecuritySectionDescription>
      </SecurityTitleBox>
      <SeparationLine className={'margin-bottom'} />

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>Set 2FA</ItemTitle>
          <ItemDescription>Secure your account with two-factor authentication (2FA).</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={'Set 2FA'}
            onClick={() => openTwoFaModalAndGenerateToken()}
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
                  setTwoFaCode={setTwoFa}
                />
                <Button
                  onWhite={true}
                  text={'Confirm 2FA code'}
                  onClick={() => fetchSetTwoFa()}
                />
              </ModalItemsWrapper>
            </Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>Set mobile phone</ItemTitle>
          <ItemDescription>Secure your account with mobile MFA.</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={'Set phone'}
            onClick={() => setPhoneModal(true)}
          />
          {phoneModal ? (
            <Modal
              onClose={() => setPhoneModal(false)}
              header={'Set mobile phone'}
              description={'Secure your account with mobile MFA.'}
            ><></></Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>Change password</ItemTitle>
          <ItemDescription>Be careful! Some operations won't be available for 24h after change.</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={'Change password'}
            onClick={() => setPasswordChangeModal(true)}
          />
          {passwordChangeModal ? (
            <Modal
              onClose={() => setPasswordChangeModal(false)}
              header={'Change password'}
              description={'Be careful! Some operations won\'t be available for 24h after change.'}
            ><></></Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>{'Change email'}</ItemTitle>
          <ItemDescription>{'Be careful! You are able to change email only one time.'}</ItemDescription>
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
            ><></></Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>
    </>
  );
};

export default SecuritySettings;
