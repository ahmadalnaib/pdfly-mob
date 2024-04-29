import { ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useEffect, useState } from 'react';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import LoginScreen from './Screens/Auth/LoginScreen';
import FilesScreen from './Screens/FilesScreen';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    SecureStore.getItemAsync('user').then((userString) => {
      if (userString) {
        setUser(JSON.parse(userString));
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='gray' />
      </View>
    );
  }

  return (
    <>
      {!user ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                textAlign: 'right',
              },
            }}
          >
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ title: 'صفحة التسجيل' }}
            />
              <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ title: 'صفحة الدخول' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
   <FilesScreen/>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
