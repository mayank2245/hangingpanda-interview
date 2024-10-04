import { ActivityIndicator, StyleSheet, View } from "react-native";
import { color } from "../constant/color";

interface loading {
    isLoading: boolean
}

export const Loader: React.FC<loading> = ({ isLoading }) => {
    return (
        <View>
            <ActivityIndicator
                animating={isLoading}
                size="large"
                color={color.primaryRed} />
        </View>
    )
}
const styles = StyleSheet.create({
})
