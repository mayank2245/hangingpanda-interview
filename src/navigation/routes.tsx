import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DeveloperStack from './stacks/DeveloperStack';

export default function Root(): React.ReactElement {
  const { navigate } = useNavigation()
  const handleNav = () => navigate('NetworkLogger')
  return (
    <>
      <DeveloperStack />
      {/* <TouchableOpacity onPress={handleNav}>
        <Text>NetworkLogger</Text>
      </TouchableOpacity> */}
    </>
  );
}
