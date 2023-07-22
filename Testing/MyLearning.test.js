// Import the necessary testing libraries
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Import the component to be tested
import MyLearningScreen from './MyLearningScreen';

// Mock the API function getData since it's asynchronous and we don't want to make actual API calls in our tests
jest.mock('./MyLearningScreen', () => ({
  ...jest.requireActual('./MyLearningScreen'),
  getData: jest.fn(() => Promise.resolve([])), // Mock the response for getData
}));

describe('MyLearningScreen', () => {
  // Test rendering of MyLearningScreen with no courses
  it('should render empty courses message when no courses available', () => {
    const { getByText } = render(<MyLearningScreen />);
    const emptyCoursesMessage = getByText(
      'Seems like you have not purchased any course yet.'
    );
    expect(emptyCoursesMessage).toBeTruthy();
  });

  // Test rendering of MyLearningScreen with courses
  it('should render course title and duration for each course', () => {
    const courses = [
      { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
      { id: 2, title: 'Advanced JavaScript Concepts', duration: '3.5 hours' },
    ];

    // Mock the response for getData
    jest.spyOn(MyLearningScreen, 'getData').mockResolvedValueOnce(courses);

    const { getByText } = render(<MyLearningScreen />);
    courses.forEach((course) => {
      const courseTitle = getByText(course.title);
      const courseDuration = getByText(course.duration);
      expect(courseTitle).toBeTruthy();
      expect(courseDuration).toBeTruthy();
    });
  });

  // Test navigation on course item click
  it('should navigate to CourseDetails screen when a course is clicked', () => {
    const courses = [{ id: 1, title: 'Introduction to React Native', duration: '2 hours' }];
    jest.spyOn(MyLearningScreen, 'getData').mockResolvedValueOnce(courses);

    const navigateMock = jest.fn();
    const { getByText } = render(<MyLearningScreen navigation={{ navigate: navigateMock }} />);
    const courseTitle = getByText('Introduction to React Native');
    
    // Simulate a click event on the course title
    fireEvent.press(courseTitle);

    // Ensure that the navigation function was called with the correct screen name and params
    expect(navigateMock).toHaveBeenCalledWith('CourseDetails', { course: courses[0] });
  });
});
