import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MyLearning from '../screens/MyLearning/MyLearning';

// Mock the API function getData since it's asynchronous
jest.mock('../screens/MyLearning/MyLearning', () => ({
  ...jest.requireActual('../screens/MyLearning/MyLearning'),
  getData: jest.fn(() => Promise.resolve([])), // Mock the response for getData
}));

describe('MyLearning', () => {
  // Test rendering of MyLearning with no courses
  it('should render empty courses message when no courses available', () => {
    const { getByText } = render(<MyLearning />);
    const emptyCoursesMessage = getByText(
      'Seems like you have not purchased any course yet.'
    );
    expect(emptyCoursesMessage).toBeTruthy();
  });

  // Test rendering of MyLearning with courses
  it('should render course title and duration for each course', async () => {
    const courses = [
      { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
      { id: 2, title: 'Advanced JavaScript Concepts', duration: '3.5 hours' },
    ];

    // Mock the response for getData
    jest.spyOn(MyLearning, 'getData').mockResolvedValueOnce(courses);

    const { getByText } = render(<MyLearning />);
    await waitFor(() => {
      courses.forEach((course) => {
        const courseTitle = getByText(course.title);
        const courseDuration = getByText(course.duration);
        expect(courseTitle).toBeTruthy();
        expect(courseDuration).toBeTruthy();
      });
    });
  });

  // Test navigation on course item click
  it('should navigate to CourseDetails screen when a course is clicked', async () => {
    const courses = [
      { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
    ];
    jest.spyOn(MyLearning, 'getData').mockResolvedValueOnce(courses);

    const navigateMock = jest.fn();
    const { getByText } = render(
      <MyLearning navigation={{ navigate: navigateMock }} />
    );
    const courseTitle = getByText('Introduction to React Native');

    // Simulate a click event on the course title
    fireEvent.press(courseTitle);

    // Ensure that the navigation function was called with the correct screen name and params
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('CourseDetails', {
        course: courses[0],
      });
    });
  });

  // Test the refresh functionality
  it('should refresh courses when the RefreshControl is triggered', async () => {
    const courses = [
      { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
    ];

    // Mock the response for getData
    jest.spyOn(MyLearning, 'getData').mockResolvedValueOnce(courses);

    const { getByText, getByTestId } = render(<MyLearning />);
    const courseTitle = getByText('Introduction to React Native');

    // Simulate a click event on the course title before refresh
    fireEvent.press(courseTitle);

    // Get the ScrollView and trigger the refresh
    const scrollView = getByTestId('course-scroll-view');
    fireEvent.refresh(scrollView);

    // Ensure that the navigation function was called with the correct screen name and params after refresh
    await waitFor(() => {
      expect(MyLearning.getData).toHaveBeenCalledTimes(2); // getData called twice (initial load + refresh)
      expect(navigateMock).toHaveBeenCalledWith('CourseDetails', {
        course: courses[0],
      });
    });
  });

  // Test a simple case where courses are fetched successfully
  it('should fetch and display courses correctly', async () => {
    // Mock the response for getData
    const courses = [
      { id: 1, title: 'Course 1', duration: '1 hour' },
      { id: 2, title: 'Course 2', duration: '1.5 hours' },
    ];
    jest.spyOn(MyLearning, 'getData').mockResolvedValueOnce(courses);

    const { getByText } = render(<MyLearning />);

    // Ensure that the loading state is displayed while courses are being fetched
    const loadingMessage = getByText('Loading...');
    expect(loadingMessage).toBeTruthy();

    // Wait for courses to be loaded and displayed
    await waitFor(() => {
      courses.forEach((course) => {
        const courseTitle = getByText(course.title);
        const courseDuration = getByText(course.duration);
        expect(courseTitle).toBeTruthy();
        expect(courseDuration).toBeTruthy();
      });
    });
  });

  // Test a case where there is an error fetching courses
  it('should display an error message when courses cannot be fetched', async () => {
    // Mock the response for getData
    jest.spyOn(MyLearning, 'getData').mockRejectedValueOnce(new Error('API Error'));

    const { getByText } = render(<MyLearning />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = getByText('Failed to fetch courses. Please try again later.');
      expect(errorMessage).toBeTruthy();
    });
  });
});
