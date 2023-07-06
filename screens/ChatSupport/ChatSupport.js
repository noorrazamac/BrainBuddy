import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, InputToolbar, Composer } from 'react-native-gifted-chat'

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
          avatar: 'https://placeimg.com/140/140/any',
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
    />
  )

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={styles.composerInput}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chat Support Screen</Text>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={renderInputToolbar}
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    marginBottom: 5,
  },
  inputPrimary: {
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  composerInput: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
})
