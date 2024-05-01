import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { Feather } from '@expo/vector-icons';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput styles={styles.textbox} placeholder='Type a message...' />
        <TouchableOpacity style={styles.sendBtn}>
        <Feather name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBG,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  sendBtn: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
  alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    
  },
});
