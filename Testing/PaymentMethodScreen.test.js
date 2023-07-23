import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentMethodScreen from '../screens/CourseEnrollmentPayment/PaymentMethodScreen';

describe('PaymentMethodScreen component', () => {
    it('should select the correct subscription when the radio button is clicked', () => {
      const { getByText } = render(<PaymentMethodScreen />);
      const sixMonthsRadioButton = getByText('6 months');
      const twelveMonthsRadioButton = getByText('12 months');
  
      fireEvent.press(sixMonthsRadioButton);
      expect(sixMonthsRadioButton.props.selected).toBe(true);
      expect(twelveMonthsRadioButton.props.selected).toBe(false);
  
      fireEvent.press(twelveMonthsRadioButton);
      expect(sixMonthsRadioButton.props.selected).toBe(false);
      expect(twelveMonthsRadioButton.props.selected).toBe(true);
    });
  
    it('should call onCheckout function when the "Subscribe" button is pressed', () => {
      const { getByText } = render(<PaymentMethodScreen />);
      const subscribeButton = getByText('Subscribe');
      const mockOnCheckout = jest.fn();
  
      // Replace onCheckout function with the mock function
      PaymentMethodScreen.defaultProps.onCheckout = mockOnCheckout;
  
      fireEvent.press(subscribeButton);
  
      // Check if onCheckout function is called
      expect(mockOnCheckout).toHaveBeenCalled();
    });
  
    // Add more test cases to cover other scenarios and edge cases
  });