import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CourseEnrollmentPayment = () => {
  const handlePaymentOptionPress = (option) => {
    // Handle the selected payment option
    console.log('Selected option:', option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Options</Text>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handlePaymentOptionPress('Credit Card Payment')}
      >
        <Text style={styles.optionText}>Option 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handlePaymentOptionPress('Debit Card Payment')}
      >
        <Text style={styles.optionText}>Option 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handlePaymentOptionPress('PayPal')}
      >
        <Text style={styles.optionText}>Option 3</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default PaymentOptionsScreen;
