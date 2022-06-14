import React, {ReactElement, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text, Icon} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {PersonIcon} from './extra/icons';
import {UserContext} from '../../App';
import {AuthParamList} from './AuthNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {Users} from '../data/users';
import {useUser} from '../hooks/useUser';
import {ScrollView} from 'react-native-gesture-handler';

type Props = StackScreenProps<AuthParamList, 'SignIn'>;

export default function SignIn({navigation}: Props) {
  const {setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');

  const onSignInButtonPress = (): void => {
    const user = useUser(username);
    if (user) {
      if (user.password === password) {
        setInvalidMessage('');
        setUser({username: username, password: password});
      } else {
        setInvalidMessage('password is incorrect');
      }
    } else {
      setInvalidMessage('username does not exist');
    }
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = (): void => {
    console.log('implement forgot password');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props: any): ReactElement => (
    <Icon
      {...props}
      name={passwordVisible ? 'eye-off' : 'eye'}
      onPress={onPasswordIconPress}
    />
  );

  return (
    <ImageOverlay
      style={styles.container}
      source={{
        uri: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80',
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            GymBro
          </Text>

          {invalidMessage !== '' ? (
            <Text style={styles.signInLabel} category="s1" status="danger">
              {invalidMessage}
            </Text>
          ) : (
            <Text style={styles.signInLabel} category="s1" status="control">
              Sign in to continue
            </Text>
          )}
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Username"
            accessoryRight={PersonIcon as any}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            style={styles.passwordInput}
            status="control"
            placeholder="Password"
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="control"
              onPress={onForgotPasswordButtonPress}>
              Forgot your password?
            </Button>
          </View>
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          disabled={username === '' || password === ''}
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>
      </ScrollView>
    </ImageOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
