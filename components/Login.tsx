import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {User, UserContext} from '../App';

export default function Login() {
  const {setUser} = useContext(UserContext);
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
        style={styles.login}
        status="primary"
        disabled={username === '' || password === ''}
        onPress={() => setUser({username: username, password: password})}>
        Log In
      </Button>
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
  login: {
    width: '90%',
    margin: 10,
  },
});
