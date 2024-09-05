import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Admin/Home';
import showdata from '../Screens/Admin/ShowData';

export default function Index(): React.ReactElement {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="ShowData" component={showdata} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
