import React, { useState } from 'react';
import axiosConfig from '../../helpers/axiosConfig';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function register(email, name, password, confirmPassword) {

  setIsLoading(true);
  axiosConfig.post('register', {
    name,
    email,
    password,
    password_confirmation: confirmPassword,

  })

    .then(response =>{
      Alert.alert('Success', 'You have successfully registered');
      navigation.navigate('Login');
      setIsLoading(false);
      setError(null);
    })
    .catch(error => {
      setError(error.response.data.message);
      setIsLoading(false);
    });
  }

  return (
    <View style={styles.container}>
    <View style={{ marginTop: 130, width: 260 }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={require('../../assets/black-one.webp')}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <TextInput
          style={[styles.inputBox, styles.mt4]}
          onChangeText={setName}
          value={name}
          placeholder="Name"
          placeholderTextColor="gray"
        />
        <TextInput
          style={[styles.inputBox, styles.mt4]}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="gray"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
 
        <TextInput
          style={[styles.inputBox, styles.mt4]}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.inputBox, styles.mt4]}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => register(email,name, password, confirmPassword)}
        style={[styles.loginButton, styles.mt5]}
      >
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginRight: 18 }}
          />
        )}
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 12,
        }}
      >
        <Text style={[styles.registerText]}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerTextLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#1d9bf1',
  alignItems: 'center',
},
logo: {
  width: 100,
  height: 120,
},
inputBox: {
  backgroundColor: 'white',
  borderRadius: 5,
  padding: 10,
},
loginButton: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0084b3',
  padding: 12,
  borderRadius: 5,
},
loginButtonText: {
  color: 'white',
},
registerText: {
  fontSize: 12,
},
registerTextLink: {
  fontSize: 12,
  color: 'white',
  textDecorationLine: 'underline',
},
textAlignCenter: {
  textAlign: 'center',
},
mt4: {
  marginTop: 16,
},

mt5: {
  marginTop: 22,
},
});