

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './src/navigation/routes';
import { ToastProvider } from 'react-native-toast-notifications';

const queryClient = new QueryClient();

export default function App() {

  return (
    <ToastProvider placement='top' dangerColor="red" duration={2000} animationType='slide-in' type='Normal' >
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Root />
        </QueryClientProvider>
      </NavigationContainer>
    </ToastProvider >
  );
}

