import React from 'react';
import { Modal, View, StyleSheet, ViewStyle } from 'react-native';
import { rf, rh, rw } from '../helpers/responsivedimention';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    content: any;
    modaloverlaycss: ViewStyle;
    contentcss: ViewStyle;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, content, modaloverlaycss, contentcss }) => {
    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={[styles.modalOverlay, modaloverlaycss]}>
                <View style={[styles.contentcss, contentcss]}>{content}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff20',
        zIndex: 0,
        justifyContent: 'flex-end',
        height: rh(100)
    },
    modalTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2),
    },
    modalContent: {
        fontSize: rf(2),
    },
    contentcss: {
        zIndex: 10,
        backgroundColor: 'black',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    }
});

export default CustomModal;
