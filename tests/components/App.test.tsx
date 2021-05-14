import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import App from '../../src/App';

test('renders the default app page', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Please log in with Google to continue/i)).toBeInTheDocument();
});
