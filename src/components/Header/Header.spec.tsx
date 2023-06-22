import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock('next/router', () => {
  return {
    useRouter() {
      return { asPath: '/' }
    }
  }
});

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {
        status: 'unauthenticated',
        data: null
      };
    }
  } 
})

describe('Header component', () => {
  it('Should render correctly', () => {
    render(<Header/>);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});