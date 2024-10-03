import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHome from '../../screens/admin/AdminHome';
import showdata from '../../screens/admin/ShowData';
import UserHome from '../../screens/user/UserHome'
import LoginUserPage from '../../screens/user/LoginUserPage';
import AddQuestion from '../../screens/admin/AddQuestion';
import LoginHr from '../../screens/hr/LoginHr'
import Instruction from '../../screens/user/Instruction'
import QuestionList from '../../screens/user/QuestionList'
import LoginAdmin from '../../screens/admin/LoginAdmin';
import AllQuestionPaper from '../../screens/admin/AllQuestionPaper';
import NetworkLogger from 'react-native-network-logger';
import QuesFormateModal from '../../screens/admin/QuesFormateModal';

const DeveloperStack = () => {
    const stack = createNativeStackNavigator();
    return (
        <stack.Navigator
            initialRouteName="LoginUserPage"                             // User Page
            // initialRouteName="LoginAdmin"                                 // Admin Page
            // initialRouteName="LoginHr"                                      //Hr page
            screenOptions={{ headerShown: false }}>
            <stack.Screen name="LoginAdmin" component={LoginAdmin} />
            <stack.Screen name="AllQuestionPaper" component={AllQuestionPaper} />
            <stack.Screen name="ShowData" component={showdata} />
            <stack.Screen name="AdminHome" component={AdminHome} />
            <stack.Screen options={{ presentation: 'modal' }} name="QuesFormateModal" component={QuesFormateModal} />
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