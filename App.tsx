

import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './src/navigation/routes';
import BootSplash from "react-native-bootsplash";

const queryClient = new QueryClient();

export default function App() {

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    };

    init().finally(async () => {
      // Hide BootSplash after the initialization tasks are done
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Root />
        <Toast />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
