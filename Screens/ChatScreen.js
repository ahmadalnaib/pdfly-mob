import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import { addUserMessage, addAssistantMessage, getConversation} from '../utils/conversationHistory';
import axiosConfig from '../helpers/axiosConfig';

export default function ChatScreen() {
  const [messageText, setMessageText] = useState('');
  const [conversation, setConversation] = useState([]);

  // useEffect(() => {
  //   initConversation();
  // }, []);

  const sendMessage =useCallback  (async() => {
    // makeChatRequest(messageText);
    try {
      const response = await axiosConfig.post('send-message', {
        message: messageText,
      });

        // Update conversation history with user message
      addUserMessage(messageText);

      // Update conversation history with assistant response
      addAssistantMessage(response.data.response);

      // Update conversation state to trigger re-render
      setConversation(getConversation());

        setMessageText('');

    } catch (error) {
      // Handle error
      console.error('Error sending message:', error);
    }
    setMessageText('');
  },[messageText]);

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
      <FlatList
          data={conversation}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageContent}>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
          
        />
        <View style={styles.messagesContainer}></View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textbox}
            placeholder='Type a message...'
            onChangeText={(text) => setMessageText(text)}
            value={messageText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
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
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageContent: {
    fontSize: 16,
  },

});
