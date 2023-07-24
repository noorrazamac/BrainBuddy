import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatSupport from '../ChatSupport'; // Update the import path based on your project structure

describe('ChatSupport', () => {
  test('should send and receive a message correctly', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<ChatSupport />);
    
    // Find the input field and type a message
    const inputField = getByPlaceholderText('Type a message');
    fireEvent.changeText(inputField, 'Hello there');
    
    // Find and click the send button
    const sendButton = getByTestId('send-button');
    fireEvent.press(sendButton);

    // Wait for the response message to appear after 5 seconds
    await waitFor(() => getByText('Response from backend API'));

    // Check if the response message is displayed
    expect(getByText('Response from backend API')).toBeTruthy();
  });

  test('should show "Typing..." while waiting for the response', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<ChatSupport />);
    
    // Find the input field and type a message
    const inputField = getByPlaceholderText('Type a message');
    fireEvent.changeText(inputField, 'Hello there');
    
    // Find and click the send button
    const sendButton = getByTestId('send-button');
    fireEvent.press(sendButton);

    // Wait for the "Typing..." message to appear
    await waitFor(() => getByText('Typing...'));

    // Check if the "Typing..." message is displayed
    expect(getByText('Typing...')).toBeTruthy();

    // Wait for the response message to appear after 5 seconds
    await waitFor(() => getByText('Response from backend API'));

    // Check if the "Typing..." message is no longer displayed
    expect(queryByText('Typing...')).toBeNull();
  });
});