import Toast from 'react-native-toast-message';

const ShowToast = (type: 'success' | 'error' | 'info', text: string) => {
    return Toast.show({
        text1: text,
        type: type,
    });
};

export { ShowToast };
