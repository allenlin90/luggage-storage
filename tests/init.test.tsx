import { render } from '@testing-library/react';
import Home from '../pages/';

describe('render page', () => {
  test('should render a page not on local', async () => {
    render(<Home />);
  });

  test('should render a page on local', async () => {
    render(<Home local />);
  });

  test('should render a page with img', async () => {
    render(<Home />);
  });
});
