import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';

export default function ChatScreen() {
  return (
    
    <KeyboardAvoidingViewContainer>
    <View style={styles.container}>
      <View style={styles.messagesContainer}></View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textbox} placeholder='Type a message...' />
        <TouchableOpacity style={styles.sendBtn}>
          <Feather name='send' size={18} color='white' />
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingViewContainer>
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
    borderRadius: 50,
  },
  textbox: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
});
