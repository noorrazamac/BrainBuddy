import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, InputToolbar, Composer, Send } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatSupport = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      },
    ])
  }, [])

  // async function askChatGpt(query) {
  //   const { Configuration, OpenAIApi } = require("openai");
  //   const configuration = new Configuration({
  //     apiKey: "",
  //   });
  //   const openai = new OpenAIApi(configuration);
  //   const completion = await openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: query}],
  //   });

  //   setMessages(previousMessages => GiftedChat.append(previousMessages, [{ _id: Math.round(Math.random() * 1000000), text: "completion.data.choices[0].message", createdAt: new Date(), user: { _id: 2, name: 'React Native', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' } }]))
  //   console.log(completion.data.choices[0].message);
  // }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    // Show loading text for 5 seconds (update till response from backend API)
    setMessages(previousMessages => GiftedChat.append(previousMessages, [
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Typing...',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      },
    ]))

    setTimeout(() => {
      // Call chatGPT from backend and append response to messages
      setMessages(previousMessages => {
        const updatedMessages = [...previousMessages];
    
        // Find the index of the previous message from BOT
        const previousMessageIndex = updatedMessages.findIndex(
          message => message.user._id === 2
        );
    
        if (previousMessageIndex >= 0) {
          // Update the properties of the previous message from BOT
          const previousMessage = updatedMessages[previousMessageIndex];
          const updatedPreviousMessage = {
            ...previousMessage,
            text: 'Response from backend API',
          };
    
          updatedMessages[previousMessageIndex] = updatedPreviousMessage;
        }
    
        return updatedMessages;
        // return GiftedChat.append(updatedMessages, messages);
      });
    }, 5000); 
  }, [])

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbarContainer}
      primaryStyle={styles.inputPrimary}
      renderComposer={renderComposer}
      renderSend={renderSend}
    />
  )

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={styles.composerInput}
      placeholder="Type a message"
    />
  )

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <View style={styles.sendButton}>
        <Icon name="send" size={24} color="#fff" />
      </View>
    </Send>
  )

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={renderInputToolbar}
        listViewProps={{
          contentContainerStyle: styles.chatContentContainer, // Added contentContainerStyle
        }}
      />
    </View>
  )
}

export default ChatSupport

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: "#E8DEF8",
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    marginBottom: 10,
    marginRight: 25,
    backgroundColor: "#E8DEF8",
  },
  inputPrimary: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginLeft: 25,
  },
  composerInput: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3F51B5',
    borderRadius: 50,
    padding: 8,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Align chat to the bottom
  },
})
