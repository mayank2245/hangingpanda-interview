import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHome from '../../Screens/Admin/AdminHome';
import showdata from '../../Screens/Admin/ShowData';
import UserHome from '../../Screens/User/UserHome'
import LoginUserPage from '../../Screens/User/LoginUserPage';
import AddQuestion from '../../Screens/Admin/AddQuestion';
import LoginHr from '../../Screens/Hr/LoginHr'
import Instruction from '../../Screens/User/Instruction'
import QuestionList from '../../Screens/User/QuestionList'
import LoginAdmin from '../../Screens/Admin/LoginAdmin';
import AllQuestionPaper from '../../Screens/Admin/AllQuestionPaper';
import NetworkLogger from 'react-native-network-logger';

const DeveloperStack = () => {
    const stack = createNativeStackNavigator();
    return (
        <stack.Navigator
            // initialRouteName="LoginUserPage"                             // User Page
            initialRouteName="LoginAdmin"                                 // Admin Page
            // initialRouteName="LoginHr"                                      //Hr page
            screenOptions={{ headerShown: false }}>
            <stack.Screen name="LoginAdmin" component={LoginAdmin} />
            <stack.Screen name="AdminHome" component={AdminHome} />
            <stack.Screen name="AllQuestionPaper" component={AllQuestionPaper} />
            <stack.Screen name="ShowData" component={showdata} />
            <stack.Screen name='UserHome' component={UserHome} />
            <stack.Screen name='LoginUserPage' component={LoginUserPage} />
            <stack.Screen name='AddQuestion' component={AddQuestion} />
            <stack.Screen name='LoginHr' component={LoginHr} />
            <stack.Screen name='Instruction' component={Instruction} />
            <stack.Screen name='QuestionList' component={QuestionList} />
            <stack.Screen name='NetworkLogger' component={NetworkLogger} />
        </stack.Navigator>

    )
}

export default DeveloperStack