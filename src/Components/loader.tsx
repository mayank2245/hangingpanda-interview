import { ActivityIndicator, StyleSheet, View } from "react-native";

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
