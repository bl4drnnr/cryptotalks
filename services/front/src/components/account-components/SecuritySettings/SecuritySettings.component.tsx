import React from 'react';

import { SecuritySettingsProps } from '@components/account-settings/SecuritySettings/SecuritySettings.interface';
import { Modal } from '@components/Modal/Modal.component';
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
  SecuritySectionDescription
} from '@styles/SecuritySettings.style';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as node2fa from 'node-2fa';

import { Button } from '@components/Button/Button.component';
import { Loader } from '@components/Loader/Loader.component';
import { TwoFa } from '@components/TwoFa/TwoFa.component';
import { useHandleException } from '@hooks/useHandleException.hook';


const SecuritySettings = ({
  locale,
  translate,
  securitySettings
}: SecuritySettingsProps) => {
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
    await handleRedirect('/');
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
    await router.push(`/${locale}${path}`);
  };

  return (
    <>
      <Loader loading={l0 || l1 || l2 || l3} />
      <SecurityTitleBox>
        <SecurityTitle>
          {translate('placeholders:inputs.securitySettings')}
        </SecurityTitle>
        <SecuritySectionDescription>{translate('pages:settings.securitySettingDescription')}</SecuritySectionDescription>
      </SecurityTitleBox>
      <SeparationLine className={'margin-bottom'} />

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>{translate('pages:settings.s2faTitle')}</ItemTitle>
          <ItemDescription>{translate('pages:settings.s2faDescription')}</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={translate('pages:settings.s2faButton')}
            onClick={() => openTwoFaModalAndGenerateToken()}
          />
          {twoFaModal ? (
            <Modal
              onClose={() => setTwoFaModal(false)}
              header={translate('pages:settings.s2faTitle')}
              description={translate('pages:settings.s2faDescription')}
            >
              <>
                <Image src={twoFaQr} alt={'2fa'} width={200} height={200} />
                <TwoFa
                  title={translate('placeholders:inputs.twoFa')}
                  setTwoFaCode={setTwoFa}
                />
                <Button
                  text={'Confirm 2FA code'}
                  onClick={() => fetchSetTwoFa()}
                />
              </>
            </Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>{translate('pages:settings.sPhoneTitle')}</ItemTitle>
          <ItemDescription>{translate('pages:settings.sPhoneDescription')}</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={translate('pages:settings.sPhoneButton')}
            onClick={() => setPhoneModal(true)}
          />
          {phoneModal ? (
            <Modal
              onClose={() => setPhoneModal(false)}
              header={translate('pages:settings.sPhoneTitle')}
              description={translate('pages:settings.sPhoneDescription')}
            ><></></Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>{translate('pages:settings.changePassTitle')}</ItemTitle>
          <ItemDescription>{translate('pages:settings.changePassDescription')}</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={translate('pages:settings.changePassButton')}
            onClick={() => setPasswordChangeModal(true)}
          />
          {passwordChangeModal ? (
            <Modal
              onClose={() => setPasswordChangeModal(false)}
              header={translate('pages:settings.changePassTitle')}
              description={translate('pages:settings.changePassDescription')}
            ><></></Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>

      <SecurityItemBlock>
        <SecurityItemWrapper>
          <ItemTitle>{translate('pages:settings.changeEmailTitle')}</ItemTitle>
          <ItemDescription>{translate('pages:settings.changeEmailDescription')}</ItemDescription>
        </SecurityItemWrapper>
        <SecurityItemWrapper className={'button'}>
          <Button
            text={translate('pages:settings.changeEmailButton')}
            onClick={() => setChangeEmailModal(true)}
          />
          {changeEmailModal ? (
            <Modal
              onClose={() => setChangeEmailModal(false)}
              header={translate('pages:settings.changeEmailTitle')}
              description={translate('pages:settings.changeEmailDescription')}
            ><></></Modal>
          ) : null}
        </SecurityItemWrapper>
      </SecurityItemBlock>
    </>
  );
};

export default SecuritySettings;
