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
import {
  addUserMessage,
  addAssistantMessage,
  getConversation,
} from '../utils/conversationHistory';
import axiosConfig from '../helpers/axiosConfig';

export default function ChatScreen() {
  const [messageText, setMessageText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isSending, setIsSending] = useState(false); 

  useEffect(() => {
    // initConversation();
    // setConversation([])
  }, []);

  const sendMessage = useCallback(async () => {
    // makeChatRequest(messageText);
    if (messageText.trim() === '') {
      // Don't send empty messages
      return;
    }
    setIsSending(true);
    try {
      const response = await axiosConfig.post('send-message', {
        message: messageText,
      });

      // Update conversation history with user message
      addUserMessage(messageText);
      setMessageText('');
      setConversation([...getConversation()]);

      // Update conversation history with assistant response
      addAssistantMessage(response.data.response);
    } catch (error) {
      // Handle error
      console.error('Error sending message:', error);
    } finally {
      // Update conversation state to trigger re-render
      setIsSending(false);
      setConversation([...getConversation()]);
    }
  }, [messageText]);

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <FlatList
          data={conversation}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.role === 'assistant'
                  ? styles.assistantMessageContainer
                  : null,
                item.role === 'system' ? styles.systemMessageContainer : null,
              ]}
            >
              <Text style={styles.messageContent}>
                {item.role === 'user' ? 'انت: ' : 'الذكاء الاصطناعي: '}
                {item.content}
              </Text>
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
    backgroundColor: '#D9FAD2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  messageContent: {
    fontSize: 16,
  },
  assistantMessageContainer: {
    backgroundColor: '#EFEFEF', // Change color to differentiate assistant messages
  },

  systemMessageContainer: {
    backgroundColor: 'lightblue', // Change color to differentiate system messages
  },
});
