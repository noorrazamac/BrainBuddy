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
  
  });