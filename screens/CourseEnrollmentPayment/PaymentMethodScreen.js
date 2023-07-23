
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { fetchPaymentIntentClient } from './fetchPaymentIntentClient';
import { useNavigation } from '@react-navigation/native';

 const PaymentMethodScreen = () => {
         const navigation = useNavigation();
         let selectedPlanAmount = 50;
         const handlePaymentOptionPress = (option) => {
            // Handle the selected payment option
            console.log('Selected option:', option);
          };



         const [isLiked, setIsLiked] = useState([
              { id: 1, value: true, name: "6 months", selected: false },
              { id: 2, value: false, name: "12 months", selected: false }
            ]);

              const onRadioBtnClick = (item) => {
                  let updatedState = isLiked.map((isLikedItem) =>
                    isLikedItem.id === item.id
                      ? { ...isLikedItem, selected: true }
                      : { ...isLikedItem, selected: false }
                  );
                  item.id == 1 ?
                  selectedPlanAmount = 50 :
                  selectedPlanAmount = 100;
                  console.log(selectedPlanAmount);

                  setIsLiked(updatedState);
                };






          const RadioButton = ({ onPress, selected, children }) => {
            return (
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                  {selected ? <View style={styles.radioButtonIcon} /> : null}
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                  <Text style={styles.radioButtonText}>{children}</Text>
                </TouchableOpacity>
              </View>
            );
          };




          const fetchPaymentIntentClient = async (amount) => {
                      console.log("inside fetchPaymentIntentClient");

                      try {
                        const response = await fetch("http://10.0.2.2:3000/payments/intents", {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                          },
                          body: JSON.stringify({
                            amount: amount * 100,
                            payment_method_types: ["card"],
                          }),
                        });

                        if (!response.ok) {
                          throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        console.log("response fetchPaymentIntentClient", data);
                        console.log("response fetchPaymentIntentClient secret", data.paymentIntent);

                        return data.paymentIntent;

                      } catch (error) {
                        console.log(error);
                        throw error;
                      }
                    };



                    const { initPaymentSheet, presentPaymentSheet } = useStripe();
                     const onCheckout = async () => {


                       try {
                       console.log(" before fetchPaymentIntentClient");
                         // 1. Create a payment intent
                         const response = await fetchPaymentIntentClient({
                           amount: Math.floor(selectedPlanAmount * 100),
                         });
                         console.log("after fetchPaymentIntent", response);
                         if (response.error) {
                              Alert.alert('Something went wrong');
                              return;
                         }

                         // 2. Initialize the Payment sheet
                         console.log("Before Initialize Payment Sheet", initResponse);
                         const initResponse = await initPaymentSheet({
                           merchantDisplayName: 'BrainBuddy',
                           paymentIntentClientSecret: response,
                         });
                         console.log("After Initialize Payment Sheet", initResponse);
                          if (initResponse.error) {
                               console.log(initResponse.error);
                               Alert.alert('Something went wrong');
                               return;
                             }

                         // 3. Present the Payment Sheet from Stripe
                         console.log("Before View Payment Sheet", initResponse);
                         const paymentResponse = await presentPaymentSheet();

                         console.log("After View Payment Sheet", initResponse);
                         if (paymentResponse.error) {
                              Alert.alert(
                                `Error code: ${paymentResponse.error.code}`,
                                paymentResponse.error.message
                              );
                              return;
                            }

                         // 4. If payment is ok -> create the order
                          Alert.alert('Payment Successful', 'You have successfully subscribed!', [
                               {
                                 text: 'OK',
                                 onPress: () => {
                                   // Navigate back to the previous screen
                                   navigation.goBack();
                                 },
                               },
                             ]);
                       } catch (error) {
                         console.log('An error occurred:', error);

                       }
                     };
















        return (
          <View style={styles.container}>


          <View style= {styles.content}>
                 <Text style={styles.title}>Select Subscription</Text>

                 {isLiked.map((item) => (
                          <RadioButton
                            onPress={() => onRadioBtnClick(item)}
                            selected={item.selected}
                            key={item.id}
                          >
                            {item.name}
                          </RadioButton>
                          ))}


                   <Text style={styles.title}>Select Payment Method</Text>


                   <View style={styles.radioButtonContainer}>
                                   <TouchableOpacity onPress={() => console.log('Pay with card')} style={styles.radioButton}>
                                      <View style={styles.radioButtonIcon} />
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => console.log('Pay with card')}>
                                     <Text style={styles.radioButtonText}>Pay with card</Text>
                                   </TouchableOpacity>
                                 </View>

                </View>


                      <TouchableOpacity
                      onPress={onCheckout}

                      style={styles.button}>
                        <Text style={styles.buttonText}>Subscribe</Text>
                      </TouchableOpacity>


          </View>
        );
      };


      const styles = StyleSheet.create({

          container: {
              flex: 1,
              flexDirection: 'column', // Horizontal layout
              justifyContent: 'flex-start', // Align children with equal space between them
              alignItems: 'flex-start',
             // justifyContent: 'space-between',
              backgroundColor: 'white',
              paddingHorizontal: 30,
            },
            content: {
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            },

            button: {
                backgroundColor: 'green',
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 5,
                marginBottom: 20, // Add some bottom margin to separate the button from the content
                alignSelf: 'center', // Align the button in the center horizontally
              },
              buttonText: {
                color: 'white',
                fontSize: 18,
              },




          title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 20
          },
          optionContainer: {
            width: '100%',
            height: 50,
            backgroundColor: '#e1e1e1',
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          },
          optionText: {
            fontSize: 16,
          },
          radioButtonContainer: {
              flexDirection: "row",
              alignItems: "center",
              marginRight: 45,
              marginBottom: 20
            },
            radioButton: {
              height: 24,
              width: 24,
              backgroundColor: "#F8F8F8",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E6E6E6",
              alignItems: "center",
              justifyContent: "center"
            },
            radioButtonIcon: {
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: "#98CFB6"
            },
            radioButtonText: {
              fontSize: 18,
              marginLeft: 16
            },

        dummyText: {
          color: 'red',
          fontWeight: 'bold',
          fontSize: 30,
          textAlign: 'center'
        }
      });

  export default PaymentMethodScreen;
