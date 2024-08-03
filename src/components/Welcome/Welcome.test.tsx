import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Vite guide link', () => {
    render(<Welcome />);
    expect(screen.getByRole('heading')).toHaveTextContent('Film Timer');
  });
});
