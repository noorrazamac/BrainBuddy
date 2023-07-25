import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Composer,
  Send,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);

  async function askChatGpt(userQuery) {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: userQuery },
      ],
    });
    console.log("Response");
    return completion.data.choices[0].message.content;
  }

  const onSend = useCallback(async (messages = []) => {
    let messageToPass = `
    Hello ChatGPT! I am integrating you into my e-learning application called Brain Buddy. From now on, you will be serving as a friendly learning assistant for children aged 8 to 16 years. As our Brain Buddy chat assistant, it's crucial to create a safe, respectful, and educational environment for young learners. Here are some guidelines to ensure an age-appropriate and tailored experience:
  
      1. Child-Friendly Language: Please use simple language and explanations suitable for kids between 8 and 16 years old. Avoid jargon or complex terminology that might be difficult for them to understand.
  
      2. Positive Reinforcement: Encourage children to learn and explore by praising their efforts and providing constructive feedback. A positive and supportive tone will foster a love for learning.
  
      3. Educational Focus: Brain Buddy is primarily an e-learning application. Please prioritize responses related to academic subjects, homework help, educational topics, and general knowledge.
  
      4. Culturally Sensitive: Be mindful of cultural differences and ensure that responses are inclusive and respectful of diverse backgrounds.
  
      5. Safety First: Children's safety is of utmost importance. Please do not request or store any personal information from the users, and promptly report any inappropriate requests.
  
      6. No Harmful Content: Avoid providing information that may be harmful or unsuitable for children. Refrain from discussing explicit, violent, or mature themes.
  
      7. Learning Games and Quizzes: If applicable, feel free to engage children in fun learning games, quizzes, or interactive activities related to educational content.
  
      8. Verified Information: While providing information, verify sources and prioritize accuracy. If uncertain about an answer, it's okay to say you're not sure and encourage further research.
  
      9. Time Restrictions: To prevent excessive screen time, consider gently reminding users to take breaks and engage in other physical or creative activities.
  
      10. Ethical AI: Remember that you are an AI language model. Do not pretend to be a human or disclose your AI nature unless necessary for the user's understanding.
  
  Please adhere to these guidelines throughout the interactions with our young learners. Thank you for being a valuable part of Brain Buddy, and together, let's make learning an enjoyable and enriching experience for all children!
  
  Begin your responses with "Hey Brain Buddy" to let users know they are interacting with their friendly learning assistant. 
  
  Let's empower young minds through knowledge and curiosity!
  
  Best regards,
  Brain Buddy Team
  
  
  This is the first message sent to you via API so to inform you about the situation. Please keep in mind that your response for this message will be shown to the user (children) as their first message, please respond accordingly, preferably greet them. They will continue this conversation it is not the brain buddy team anymore. So, chat and reply accordingly`;

   
    if(messages.length > 0) {
      const lastUserMessage = messages.find(
        (message) => message.user._id === 1
      );

      messageToPass = lastUserMessage.text;
    }

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    console.log("Sending message");
    // Show loading text for 5 seconds (update till response from backend API)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.round(Math.random() * 1000000),
          text: "Typing...",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar:
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        },
      ])
    );
    console.log("Sent message");
    try {
      let chatgptResponse = await askChatGpt(messageToPass);
      console.log("Updating message");
      // Call chatGPT from backend and append response to messages
      setMessages((previousMessages) => {
        const updatedMessages = [...previousMessages];

        // Find the index of the previous message from BOT
        const previousMessageIndex = updatedMessages.findIndex(
          (message) => message.user._id === 2
        );

        if (previousMessageIndex >= 0) {
          // Update the properties of the previous message from BOT
          const previousMessage = updatedMessages[previousMessageIndex];
          const updatedPreviousMessage = {
            ...previousMessage,
            text: chatgptResponse,
          };

          updatedMessages[previousMessageIndex] = updatedPreviousMessage;
        }

        return updatedMessages;
        // return GiftedChat.append(updatedMessages, messages);
      });
    } catch (error) {
        console.error("Error occurred:", error);
        // Handle different error scenarios here and show appropriate messages to the students
        let errorMessage = "Oops! An unexpected error occurred. Please try again later.";

        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 400:
              errorMessage = "Uh oh! Something seems to be wrong with your request. Please double-check and try again.";
              break;
            case 401:
              errorMessage = "Oh no! It appears you are not authorized to access this feature. Please ensure you have the necessary permissions.";
              break;
            case 403:
              errorMessage = "Oops! You don't have permission to perform this action. Let's focus on exploring other exciting topics!";
              break;
            case 404:
              errorMessage = "We couldn't find what you were looking for. Let's embark on a new learning adventure!";
              break;
            case 429:
              errorMessage = "Hold on! Our chat assistant is a bit overwhelmed with requests. Let's give it a moment to catch its breath.";
              break;
            case 500:
              errorMessage = "Yikes! Our servers are having a small hiccup. Don't worry; we're already working on fixing it!";
              break;
            default:
              errorMessage = "Oops! An unexpected error occurred. Please try again later.";
              break;
          }
        }
      setMessages((previousMessages) => {
        const updatedMessages = [...previousMessages];

        // Find the index of the previous message from BOT
        const previousMessageIndex = updatedMessages.findIndex(
          (message) => message.user._id === 2
        );

        if (previousMessageIndex >= 0) {
          // Update the properties of the previous message from BOT
          const previousMessage = updatedMessages[previousMessageIndex];
          const updatedPreviousMessage = {
            ...previousMessage,
            text: errorMessage,
          };

          updatedMessages[previousMessageIndex] = updatedPreviousMessage;
        }

        return updatedMessages;
        // return GiftedChat.append(updatedMessages, messages);
      });
    }
  }, []);

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbarContainer}
      primaryStyle={styles.inputPrimary}
      renderComposer={renderComposer}
      renderSend={renderSend}
    />
  );

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={styles.composerInput}
      placeholder="Type a message"
    />
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <View style={styles.sendButton}>
        <Icon name="send" size={24} color="#fff" />
      </View>
    </Send>
  );
  
  console.log(messages.length);

  if(messages.length == 0) {
     onSend(messages);
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={renderInputToolbar}
        listViewProps={{
          contentContainerStyle: styles.chatContentContainer, // Added contentContainerStyle
        }}
      />
    </View>
  );
};

export default ChatSupport;

const { width } = Dimensions.get("window");
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
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginLeft: 25,
  },
  composerInput: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#3F51B5",
    borderRadius: 50,
    padding: 8,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end", // Align chat to the bottom
  },
});
