import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingScreen';
import PdfScreen from './PdfScreen';
import { AntDesign,Ionicons,Entypo } from '@expo/vector-icons';


export default function FileScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Pdf'
          component={PdfScreen}
          options={{
            tabBarIcon: (props) => {
              const { color, size } = props;
             return <AntDesign name='pdffile1' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen name='Chat' component={ChatScreen}  options={{
            tabBarIcon: (props) => {
              const { color, size } = props;
             return <Entypo name='chat' size={size} color={color} />;
            },
          
        }}/>
        <Tab.Screen name='Settings' component={SettingsScreen} options={{
            tabBarIcon: (props) => {
              const { color, size } = props;
            return  <Ionicons name="settings-outline" size={size} color={color} />
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
