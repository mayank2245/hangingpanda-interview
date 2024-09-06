import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={[styles.modalContent,]}>{content}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '80%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContent: {
        fontSize: 16,
    },
});

export default CustomModal;
