import { ActivityIndicator, View } from "react-native";
import { rh } from "../Helpers/Responsivedimention";

interface loading {
    isLoading: boolean
}

export const Loader: React.FC<loading> = ({ isLoading }) => {
    return (
        <View>
            <ActivityIndicator
                style={{ padding: 10, marginTop: rh(3) }}
                animating={isLoading}
                size="large" />
        </View>
    )
}
