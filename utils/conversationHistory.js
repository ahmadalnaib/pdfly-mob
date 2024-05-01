 let conversationHistory = [];  
 export const getConversation = () => {
    return conversationHistory;
  }

  export const initConversation = () => {
    addSystemMessage('your name is ahmad');
  }

export const addUserMessage = (messageText) => {
    conversationHistory.push({
      role: 'user',
      content: messageText,
    });
  }


export const addAssistantMessage = (messageText) => {
  conversationHistory.push({
    role: 'assistant',
    content: messageText,
  });
}

export const addSystemMessage = (messageText) => {
  conversationHistory.push({
    role: 'system',
    content: messageText,
  });
}