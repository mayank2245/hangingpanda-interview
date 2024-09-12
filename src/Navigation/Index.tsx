import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from '../Screens/Admin/AdminHome';
import showdata from '../Screens/Admin/ShowData';
import UserHome from '../Screens/User/UserHome'
import LoginUserPage from '../Screens/User/LoginUserPage';
import AddQuestion from '../Screens/Admin/AddQuestion';
import LoginHr from '../Screens/Hr/LoginHr'
import Instruction from '../Screens/User/Instruction'

export default function Index(): React.ReactElement {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="LoginUserPage"                             // User Page
        // initialRouteName="AdminHome"                                 // Admin Page
        // initialRouteName="LoginHr"                                      //Hr page
        screenOptions={{ headerShown: false }}>
        <stack.Screen name="AdminHome" component={AdminHome} />
        <stack.Screen name="ShowData" component={showdata} />
        <stack.Screen name='UserHome' component={UserHome} />
        <stack.Screen name='LoginUserPage' component={LoginUserPage} />
        <stack.Screen name='AddQuestion' component={AddQuestion} />
        <stack.Screen name='LoginHr' component={LoginHr} />
        <stack.Screen name='Instruction' component={Instruction} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
