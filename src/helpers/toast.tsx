import Toast from 'react-native-toast-message';

const ShowToast = (type: 'success' | 'error' | 'info', text: string) => {
    return Toast.show({
        text1: 'Hello',
        text2: 'This is a toast message!',
        type: 'success', // can be 'success', 'error', 'info'
        position: 'top', // or 'bottom'
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        style: { backgroundColor: 'black' }, // Set your desired background color here
        text1Style: { color: 'white' }, // Customize text color if needed
        text2Style: { color: 'white' }, // Customize text color if needed
    });
};

export { ShowToast };
