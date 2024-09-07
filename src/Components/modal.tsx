import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { rf, rw } from '../Helpers/Responsivedimention';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    content: any;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, content }) => {
    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >

            <View style={styles.modalOverlay}>
                <View style={{ zIndex: 10, backgroundColor: 'black', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>{content}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        opacity: 0.8,
        zIndex: 0,
        justifyContent: 'flex-end'
    },
    modalTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2),
    },
    modalContent: {
        fontSize: rf(2),
    },
});

export default CustomModal;
