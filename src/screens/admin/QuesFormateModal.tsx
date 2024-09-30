import { Button, Text, View } from "react-native";

export default function ModalScreen({ navigation }: any) {
    return (
        <View >
            <Text >This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    );
}