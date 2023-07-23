import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChangePassword from "../screens/Profile/ChangePassword";

describe('ChangePassword component', () => {
    it('should change the state when typing in old password input', () => {
      const { getByPlaceholderText } = render(<ChangePassword />);
      const oldPasswordInput = getByPlaceholderText('Old password');
  
      fireEvent.changeText(oldPasswordInput, 'oldPassword123');
  
      expect(oldPasswordInput.props.value).toBe('oldPassword123');
    });
  
    it('should change the state when typing in new password input', () => {
      const { getByPlaceholderText } = render(<ChangePassword />);
      const newPasswordInput = getByPlaceholderText('New password');
  
      fireEvent.changeText(newPasswordInput, 'newPassword456');
  
      expect(newPasswordInput.props.value).toBe('newPassword456');
    });
    
    it('should display "Passwords are same" message when old and new passwords are the same', () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<ChangePassword />);
        const passwordInput = getByPlaceholderText('Old password');
    
        fireEvent.changeText(passwordInput, 'samePassword');
        fireEvent.changeText(getByPlaceholderText('New password'), 'samePassword');
        fireEvent.press(getByTestId('changePasswordButton'));
    
        expect(getByText('Passwords are same')).toBeDefined();
      });
    
      it('should display "Password changed successfully" message when passwords are different', () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<ChangePassword />);
        const passwordInput = getByPlaceholderText('Old password');
    
        fireEvent.changeText(passwordInput, 'oldPassword123');
        fireEvent.changeText(getByPlaceholderText('New password'), 'newPassword456');
        fireEvent.press(getByTestId('changePasswordButton'));
    
        expect(getByText('Password changed successfully')).toBeDefined();
      });
  });