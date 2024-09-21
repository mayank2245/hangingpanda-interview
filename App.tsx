/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigate from './src/Navigation/Index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';


import NetworkLogger from 'react-native-network-logger';



const queryClient = new QueryClient()
export default function App() {
  console.log(queryClient, 'queryClient')
  return (
    <QueryClientProvider client={queryClient}>
      <Navigate />
      <Toast />
      {/* <NetworkLogger /> */}
    </QueryClientProvider>

  )
}
