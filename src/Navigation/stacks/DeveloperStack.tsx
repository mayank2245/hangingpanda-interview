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
import LandingPage from '../../screens/landingPage/LandingPage';
import HrHome from '../../screens/hr/HrHome';
import AllStudentList from '../../screens/hr/AllStudentList';
import AddStudent from '../../screens/hr/AddStudent';
import StudentCsvFormate from '../../screens/hr/StudentCsvFormate';
import QuitScreen from '../../screens/user/QuitScreen';
import AddAllCandidate from '../../screens/hr/AddAllCandidate';

const DeveloperStack = () => {
    const stack = createNativeStackNavigator();
    return (
        <stack.Navigator
            initialRouteName="LandingPage"
            screenOptions={{ headerShown: false }}>
            <stack.Screen name="LandingPage" component={LandingPage} />
            <stack.Screen name="LoginAdmin" component={LoginAdmin} />
            <stack.Screen name="AllQuestionPaper" component={AllQuestionPaper} />
            <stack.Screen name="QuitScreen" component={QuitScreen} />
            <stack.Screen name="ShowData" component={showdata} />
            <stack.Screen name="AdminHome" component={AdminHome} />
            <stack.Screen options={{ presentation: 'modal' }} name="QuesFormateModal" component={QuesFormateModal} />
            <stack.Screen name='UserHome' component={UserHome} />
            <stack.Screen name='LoginUserPage' component={LoginUserPage} />
            <stack.Screen name='AddQuestion' component={AddQuestion} />
            <stack.Screen name='LoginHr' component={LoginHr} />
            <stack.Screen name='HrHome' component={HrHome} />
            <stack.Screen name='AllStudentList' component={AllStudentList} />
            <stack.Screen name='AddStudent' component={AddStudent} />
            <stack.Screen name='AddAllCandidate' component={AddAllCandidate} />
            <stack.Screen name='StudentCsvFormate' component={StudentCsvFormate} />
            <stack.Screen name='Instruction' component={Instruction} />
            <stack.Screen name='QuestionList' component={QuestionList} />
            <stack.Screen name='NetworkLogger' component={NetworkLogger} />
        </stack.Navigator>

    )
}

export default DeveloperStack