import { render } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink to='/' activeClassName='active' label='Active link'/>
    )
  
    expect(getByText('Active link')).toBeInTheDocument();
  });
  
  it('Adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink to='/' activeClassName='active' label='Active link'/>
    )
  
    expect(getByText('Active link')).toHaveClass('active')
  });
})
