import { ActivityIndicator, StyleSheet, View } from "react-native";
import { rh } from "../helpers/Responsivedimention";

interface loading {
    isLoading: boolean
}

export const Loader: React.FC<loading> = ({ isLoading }) => {
    return (
        <View>
            <ActivityIndicator
                style={styles.activestyle}
                animating={isLoading}
                size="large" />
        </View>
    )
}
const styles = StyleSheet.create({
    activestyle: { padding: 10, marginTop: rh(3) }
})
