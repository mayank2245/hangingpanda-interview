import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { rh, rw } from "../helpers/responsivedimention";

interface loading {
    isLoading: boolean
}

export const Loader: React.FC<loading> = ({ isLoading }) => {
    return (
        <View>
            <ActivityIndicator
                animating={isLoading}
                size="large" />
        </View>
    )
}
const styles = StyleSheet.create({
})
