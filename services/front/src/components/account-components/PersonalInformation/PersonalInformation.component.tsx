import Image from 'next/image';

import { PersonalInformationProps } from '@components/account-settings/PersonalInformation/PersonalInformation.interface';
import { Button } from '@components/Button/Button.component';
import { Checkbox } from '@components/Checkbox/Checkbox.component';
import { Input } from '@components/Input/Input.component';
import { Textarea } from '@components/Textarea/Textarea.component';
import {
  AvaWrapper,
  ChangeAvatar,
  FieldsContainer,
  InputWrapper,
  PersonalInfoItemsWrapper,
  PersonalInformationContainer,
  PersonalInfoSectionDescription,
  PublicInfoTitle,
  PublicInfoTitleBox,
  SeparationLine,
  TitleWrapper
} from '@styles/PersonalInformation.style';

export const PersonalInformation = ({
  translate,
  personalInformation,
  setPersonalInformation,
  applyPersonalInformation
}: PersonalInformationProps) => {
  return (
    <>
      <PublicInfoTitleBox>
        <PublicInfoTitle>
          {translate('placeholders:inputs.personalInformation')}
        </PublicInfoTitle>
        <PersonalInfoSectionDescription>{translate('pages:settings.personalInfoDescription')}</PersonalInfoSectionDescription>
      </PublicInfoTitleBox>
      <SeparationLine className={'margin-bottom'} />

      <PersonalInformationContainer>
        <PersonalInfoItemsWrapper className={'fields'}>
          <FieldsContainer>
            {personalInformation && (
              <>
                <Input
                  value={personalInformation.username}
                  placeholder={translate('placeholders:inputs.username')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, username: e.target.value })}
                  inputDescription={translate('placeholders:inputs.usernameDescription')}
                />
                <Input
                  value={personalInformation.firstName}
                  placeholder={translate('pages:signup.firstName')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, firstName: e.target.value })}
                />
                <Input
                  value={personalInformation.lastName}
                  placeholder={translate('pages:signup.lastName')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, lastName: e.target.value })}
                />
                <SeparationLine />
                <Input
                  value={personalInformation.title}
                  placeholder={translate('pages:signup.accTitle')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, title: e.target.value })}
                  inputDescription={translate('pages:signup.tellTheWorld')}
                />
                <Input
                  value={personalInformation.personalWebsite}
                  placeholder={translate('pages:signup.personalWebsite')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, personalWebsite: e.target.value })}
                />
                <Input
                  value={personalInformation.linkedIn}
                  placeholder={'LinkedIn'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, linkedIn: e.target.value })}
                />
                <Input
                  value={personalInformation.twitter}
                  placeholder={'Twitter'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, twitter: e.target.value })}
                />
                <Textarea
                  value={personalInformation.bio}
                  placeholder={translate('pages:signup.bio')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, bio: e.target.value })}
                  inputDescription={translate('pages:signup.tellAbout')}
                />
                <SeparationLine />
                <Checkbox
                  value={personalInformation.publicEmail}
                  label={translate('pages:signup.publicEmail')}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, publicEmail: !personalInformation.publicEmail })}
                />
              </>
            )}
          </FieldsContainer>

          <FieldsContainer className={'no-line'}>
            <InputWrapper className={'button'}>
              <Button
                text={translate('placeholders:inputs.saveChanges')}
                onClick={applyPersonalInformation}
              />
            </InputWrapper>
          </FieldsContainer>
        </PersonalInfoItemsWrapper>

        <PersonalInfoItemsWrapper className={'end'}>
          <AvaWrapper>
            <Image className={'ava'} src={'/img/testava.jpg'} alt={'ava'} width={225} height={225}/>
            <ChangeAvatar>
              <Button
                text={translate('placeholders:inputs.changeAva')}
                fillButton={true}
              />
            </ChangeAvatar>
          </AvaWrapper>
          {personalInformation && (
            <TitleWrapper>{personalInformation.title}</TitleWrapper>
          )}
        </PersonalInfoItemsWrapper>
      </PersonalInformationContainer>
    </>
  );
};

export default PersonalInformation;
