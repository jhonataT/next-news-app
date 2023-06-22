import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { SignInButton } from ".";

jest.mock('next-auth/react');

describe('SignInButton component', () => {
  it('Should render correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValue({ status: 'unauthenticated', data: null, update: async () => null })

    render(<SignInButton/>);

    expect(screen.findByText('Sign with Github'));
  });

  it('Should render correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const userToReturn = {
      user: {
        email: 'johndoe@gmail.com',
        name: 'John Doe'
      },
      expires: 'fake-expires',
      activeSubscription: 'isActive',
    };

    useSessionMocked.mockReturnValue({ status: 'authenticated', data: userToReturn, update: async () => null })

    render(<SignInButton/>);
    expect(screen.findByText('John Doe'));
  });

});