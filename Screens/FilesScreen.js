import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingScreen';
import PdfScreen from './PdfScreen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function FileScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Pdf'
          component={PdfScreen}
          options={{
            tabBarIcon: () => {
             return <AntDesign name='pdffile1' size={24} color='black' />;
            },
          }}
        />
        <Tab.Screen name='Chat' component={ChatScreen}  options={{
            tabBarIcon: () => {
             return <Entypo name='chat' size={24} color='black' />;
            },
          
        }}/>
        <Tab.Screen name='Settings' component={SettingsScreen} options={{
            tabBarIcon: () => {
            return  <Ionicons name="settings-outline" size={24} color="black" />
            },
          
        
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
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
