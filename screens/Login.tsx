import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase(
  {
    name: 'sqlite.db',
    location: 'default',
  },
  () => {
    createTable();
    console.log('Database connected!!!');
  },
  error => {
    console.log(error);
  },
);

const createTable = () => {
  database.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS NEWUSER (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT)',
      [],
      (_, resultSet) => {
        console.log('Table created successfully', resultSet);
      },
      (_, error) => {
        console.error('Error creating table', error);
      },
    );
  });
};

const insertData = () => {
  database.transaction(tx => {
    tx.executeSql('insert into NEWUSER (name) values(?)', [name]);
  });
};

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {});

  const handleLogin = () => {
    // Implement your login logic here
    navigation.navigate('Home');
    console.log('Login button pressed');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assests/crsl2.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
