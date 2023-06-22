import { render } from '@testing-library/react';
import { ActiveLink } from '.';

test('active link renders correctly', () => {
  const { debug } = render(
    <ActiveLink to='/' activeClassName='active' label='active link'/>
  )

  debug();
});