import React from 'react';

import Image from 'next/image';

import { Button } from '@components/Button/Button.component';
import { Checkbox } from '@components/Checkbox/Checkbox.component';
import { Input } from '@components/Input/Input.component';
import { PersonalInformationProps } from '@components/PersonalInformation/PersonalInformation.interface';
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
  personalInformation,
  isProfilePicturePresent,
  setPersonalInformation,
  applyPersonalInformation,
  setSelectedFile
}: PersonalInformationProps) => {

  const handleFileSelect = (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedFile(reader.result);
    };
  };

  return (
    <>
      <PublicInfoTitleBox>
        <PublicInfoTitle>Personal information</PublicInfoTitle>
        <PersonalInfoSectionDescription>Manage your public visible personal information settings</PersonalInfoSectionDescription>
      </PublicInfoTitleBox>
      <SeparationLine className={'margin-bottom'} />

      <PersonalInformationContainer>
        <PersonalInfoItemsWrapper className={'fields'}>
          <FieldsContainer>
            {personalInformation && (
              <>
                <Input
                  value={personalInformation.username}
                  placeholder={'Username'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, username: e.target.value })}
                  inputDescription={'Username should be unique and will be shown publicly'}
                />
                <Input
                  value={personalInformation.firstName}
                  placeholder={'First name'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, firstName: e.target.value })}
                />
                <Input
                  value={personalInformation.lastName}
                  placeholder={'Last name'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, lastName: e.target.value })}
                />
                <SeparationLine />
                <Input
                  value={personalInformation.title}
                  placeholder={'Account title'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, title: e.target.value })}
                  inputDescription={'What do you want to tell this world?'}
                />
                <Input
                  value={personalInformation.personalWebsite}
                  placeholder={'Personal website'}
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
                  placeholder={'Biography'}
                  onChange={(e) => setPersonalInformation({ ...personalInformation, bio: e.target.value })}
                  inputDescription={'Tell something about yourself'}
                />
              </>
            )}
          </FieldsContainer>

          <FieldsContainer className={'no-line'}>
            <InputWrapper className={'button'}>
              <Button
                text={'Save changes'}
                onClick={applyPersonalInformation}
              />
            </InputWrapper>
          </FieldsContainer>
        </PersonalInfoItemsWrapper>

        <PersonalInfoItemsWrapper className={'end'}>
          <AvaWrapper>
            {isProfilePicturePresent ? (
              <Image
                className={'ava'}
                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/users-profile-pictures/${personalInformation?.id}.png`}
                alt={'ava'}
                width={225}
                height={225}
              />
            ) : (
              <Image
                className={'ava'}
                src={`${process.env.NEXT_PUBLIC_PUBLIC_S3_BUCKET_URL}/testava.jpg`}
                alt={'ava'}
                width={225}
                height={225}
              />
            )}
            <ChangeAvatar>
              <input
                type={'file'}
                id="fileInput"
                hidden={true}
                onChange={handleFileSelect}
              />
              <Button
                text={'Change avatar'}
                fillButton={true}
                // @ts-ignore
                onClick={() => document.getElementById('fileInput').click()}
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
