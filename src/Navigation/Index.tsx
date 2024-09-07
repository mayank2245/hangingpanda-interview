import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from '../Screens/Admin/AdminHome';
import showdata from '../Screens/Admin/ShowData';
import UserHome from '../Screens/User/UserHome'
import LoginUserPage from '../Screens/User/LoginUserPage';
import AddQuestion from '../Screens/Admin/AddQuestion';

export default function Index(): React.ReactElement {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="LoginUserPage"
        // initialRouteName="AdminHome"
        screenOptions={{ headerShown: false }}>
        <stack.Screen name="AdminHome" component={AdminHome} />
        <stack.Screen name="ShowData" component={showdata} />
        <stack.Screen name='UserHome' component={UserHome} />
        <stack.Screen name='LoginUserPage' component={LoginUserPage} />
        <stack.Screen name='AddQuestion' component={AddQuestion} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
