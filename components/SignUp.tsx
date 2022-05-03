import {StackScreenProps} from '@react-navigation/stack';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {UserContext} from '../App';
import {LoginParamList} from './LoginNavigator';

type Props = StackScreenProps<LoginParamList, 'SignUp'>;

export default function SignUp({navigation}: Props) {
  const {setUser} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (
    <Icon
      onPress={toggleSecureEntry}
      name={secureTextEntry ? 'eye-off' : 'eye'}
    />
  );

  return (
    <Layout style={styles.container}>
      <Text style={styles.title} category="h1">
        GymBro
      </Text>
      <Input
        style={styles.fields}
        value={email}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <Input
        style={styles.fields}
        value={username}
        placeholder="Username"
        onChangeText={(text: string) => setUsername(text)}
      />
      <Input
        style={styles.fields}
        value={password}
        placeholder="Password"
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button
        style={styles.signUp}
        status="primary"
        disabled={username === '' || password === '' || email === ''}
        onPress={() => setUser({username: username, password: password})}>
        Sign Up
      </Button>
      <Divider />
      <Text appearance="hint">
        Already have an account?{' '}
        <Text status="primary" onPress={() => navigation.navigate('Login')}>
          Log in.
        </Text>
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fields: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  title: {
    padding: 20,
  },
  signUp: {
    width: '90%',
    margin: 10,
  },
});
