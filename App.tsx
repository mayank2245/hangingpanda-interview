/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigate from './src/Navigation/Index';
import { Text, View } from 'react-native';
import Home from './src/Screens/User/Home';
import Add from './src/Screens/Admin/AddQuestion'
import LoginUserPage from './src/Screens/User/LoginUserPage'

export default function App() {
  // return <Navigate />;
  // return <Home />;
  // return <Add />;
  return <LoginUserPage />;
}
