

import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './src/navigation/routes';

const queryClient = new QueryClient();

export default function App() {

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Root />
        <Toast />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

