/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigate from './src/navigation/Index';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Navigate />
        <Toast />
      </QueryClientProvider>
    </NavigationContainer>
  )
}
