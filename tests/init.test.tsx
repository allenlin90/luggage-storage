import { render } from '@testing-library/react';
import Home from '../pages/';

describe('render page', () => {
  test('should render a page', async () => {
    render(<Home />);
  });
});
