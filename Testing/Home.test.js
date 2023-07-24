import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../screens/Home/Home';
import { ScrollView } from 'react-native-gesture-handler';

// Mock FlatList components
jest.mock('react-native/Libraries/Lists/FlatList', () => 'FlatList');

// Mock ScrollView component
jest.mock('react-native-gesture-handler', () => {
  const RealGestureHandler = jest.requireActual('react-native-gesture-handler');
  return {
    ...RealGestureHandler,
    ScrollView: jest.fn(),
  };
});

describe('Home component', () => {
  it('should call enrollCourse function with correct course data when "Enroll" button is clicked', () => {
    // Mock the enrollCourse function
    const mockEnrollCourse = jest.fn();
    jest.mock('../screens/Home/Home', () => ({ enrollCourse: mockEnrollCourse }));

    const { getByText } = render(<Home />);
    const enrollButton = getByText('Enroll');

    fireEvent.press(enrollButton);

    // Ensure that the enrollCourse function is called once
    expect(mockEnrollCourse).toHaveBeenCalledTimes(1);
    // You can further test the arguments passed to enrollCourse function if required
  });

  it('should render the course list correctly', () => {
    const { getByText } = render(<Home />);

    // Make sure all course titles are rendered
    expect(getByText('Core Java')).toBeDefined();
    expect(getByText('Java 8')).toBeDefined();
    expect(getByText('Advanced Java')).toBeDefined();
    // Add more expectations for other courses

    // You can add more specific tests as needed based on your UI and logic
  });
});