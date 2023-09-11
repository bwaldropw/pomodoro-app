import { StoreProvider } from 'easy-peasy';
import { NativeWindStyleSheet } from 'nativewind';
import React from 'react';
import AuthRouter from './components/AuthRouter';
import store from './stores/store';

export default function App() {
  return (
    <StoreProvider store={store}>
      <AuthRouter />
    </StoreProvider>
  );
}

NativeWindStyleSheet.setOutput({
  default: 'native',
});
