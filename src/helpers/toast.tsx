import Toast from 'react-native-toast-message';

const ShowToast = (type: 'success' | 'error' | 'info', text: string) => {
    return Toast.show({
        type: type,
        text1: text,
    });
};

export { ShowToast };
