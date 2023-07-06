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

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
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
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    marginBottom: 10,
    marginRight: 25
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
