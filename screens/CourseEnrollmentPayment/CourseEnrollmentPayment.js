import React, {useState} from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CourseEnrollmentPayment = () => {
 const handlePaymentOptionPress = (option) => {
    // Handle the selected payment option
    console.log('Selected option:', option);
  };

  const [isLiked, setIsLiked] = useState([
      { id: 1, value: true, name: "6 months", selected: false },
      { id: 2, value: false, name: "12 months", selected: false }
    ]);

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




         <Text style={styles.optionText}>1. 6 months</Text>
         <Text style={styles.optionText}>2. 12 months</Text>
        <Text style={styles.title}>Payment Options</Text>

           <TouchableOpacity
             style={styles.optionContainer}
             onPress={() => handlePaymentOptionPress('Credit Card Payment')}
           >
             <Text style={styles.optionText}>Option 1</Text>
           </TouchableOpacity>



         </View>
         );

}

const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Yes", selected: false },
    { id: 2, value: false, name: "No", selected: false }
  ]);

  const onRadioBtnClick = (item) => {
      let updatedState = isLiked.map((isLikedItem) =>
        isLikedItem.id === item.id
          ? { ...isLikedItem, selected: true }
          : { ...isLikedItem, selected: false }
      );
      setIsLiked(updatedState);
    };




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    //alignItems: 'left',

    paddingHorizontal: 20,
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
      marginRight: 45
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: "#F8F8F8",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E6E6E6",
      alignItems: "center",
      justifyContent: "center"
    },
    radioButtonIcon: {
      height: 14,
      width: 14,
      borderRadius: 7,
      backgroundColor: "#98CFB6"
    },
    radioButtonText: {
      fontSize: 16,
      marginLeft: 16
    }
});

export default CourseEnrollmentPayment;