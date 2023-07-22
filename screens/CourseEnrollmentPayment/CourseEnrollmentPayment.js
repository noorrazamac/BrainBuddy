import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

 const PaymentMethodScreen = () => {
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
                 <TouchableOpacity style={styles.button}>
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
