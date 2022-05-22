import React from 'react';
import {ScrollView} from 'react-native';
import {
  Button,
  Layout,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {ProfileSetting} from './extra/profile-setting.component';
import {CameraIcon} from './extra/icons';
import {Profile} from './extra/data';
import {BackIcon} from '../extra/icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const profile: Profile = Profile.jenniferGreen();

export default function ProfileSettings() {
  const navigation = useNavigation<NavigationProp<any>>();
  const styles = useStyleSheet(themedStyle);

  const onBackButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryLeft={CameraIcon as any}
    />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        appearance="control"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ProfileAvatar
          style={styles.profileAvatar as any}
          source={profile.photo}
          editButton={renderPhotoButton}
        />
        <ProfileSetting
          style={[styles.profileSetting, styles.section]}
          hint="First Name"
          value={profile.firstName}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Last Name"
          value={profile.lastName}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Gender"
          value={profile.gender}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Age"
          value={`${profile.age}`}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Weight"
          value={`${profile.weight} kg`}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Height"
          value={`${profile.height} cm`}
        />
        <ProfileSetting
          style={[styles.profileSetting, styles.section]}
          hint="Email"
          value={profile.email}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Phone Number"
          value={profile.phoneNumber}
        />
        <Button style={styles.doneButton} onPress={onBackButtonPress}>
          DONE
        </Button>
      </ScrollView>
    </Layout>
  );
}

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
