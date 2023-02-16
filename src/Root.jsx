import React from 'react';
import { Provider } from 'react-redux';

export default function Root(props) {
  const { store, children } = props;
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}