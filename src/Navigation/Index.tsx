
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';



import NetworkLogger from 'react-native-network-logger';
import DeveloperStack from './stacks/DeveloperStack';

export default function Index(): React.ReactElement {
  const { navigate } = useNavigation()
  return (
    <>
      <DeveloperStack />
      <TouchableOpacity onPress={() => navigate('NetworkLogger')}>
        <Text>NetworkLogger</Text>
      </TouchableOpacity>
    </>
  );
}
