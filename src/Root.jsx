import React from 'react';
import { Provider } from 'react-redux';
// import { applyMiddleware, createStore, compose } from 'redux';
// import reduxPromise from 'redux-promise';

export default function Root(props) {
  const { store, children } = props;
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}