import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import Profile from "../screens/Profile/Profile";
jest.mock("@aws-amplify/ui-react-native", () => ({
  useAuthenticator: jest.fn(),
}));

// Mock useNavigation hook
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe("Profile component", () => {
  it("should render the user information correctly", () => {
    // Mock user data
    const mockUser = {
      username: "JohnDoe",
      attributes: {
        email: "john.doe@example.com",
      },
    };

    // Mock the useAuthenticator hook to return the mockUser
    useAuthenticator.mockReturnValue({ user: mockUser });

    const { getByText } = render(<Profile />);

    expect(getByText(mockUser.username)).toBeDefined();
    expect(getByText(mockUser.attributes.email)).toBeDefined();
  });

  it('should navigate to the "ChangePassword" screen when "Change Password" button is pressed', () => {
    // Mock useNavigation hook
    const mockNavigate = jest.fn();
    jest.mock("@react-navigation/native", () => ({
      useNavigation: jest.fn(() => ({
        navigate: mockNavigate,
      })),
    }));

    const { getByText } = render(<Profile />);
    const changePasswordButton = getByText("Change Password");

    fireEvent.press(changePasswordButton);

    expect(mockNavigate).toHaveBeenCalledWith("ChangePassword");
  });

  it('should sign out when "LogOut" button is pressed', () => {
    const mockSignOut = jest.fn();
    jest.mock("aws-amplify", () => ({
      Auth: {
        signOut: mockSignOut,
      },
    }));

    const { getByText } = render(<Profile />);
    const logoutButton = getByText("LogOut");

    fireEvent.press(logoutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
});
