import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Container, Content, Label, Form, Item, Input, Button, Text, H2 } from 'native-base';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleConfirm: (name: string, radius: number) => void;
};
const AddNewLocationModal = ({ show, handleClose, handleConfirm }: Props) => {
    const [name, setName] = useState('Point 1');
    const [radius, setRadius] = useState('10');
    const [error, setError] = useState('');

    const onConfirm = useCallback(() => {
        const d = Number(radius);
        if (name.length && d > 0 && d <= 500) {
            handleConfirm(name, d);
            setError('');
        } else {
            setError('should be greater than 0 and less than 500 m');
        }
    }, [handleConfirm, radius, name]);

    return (
        <Modal animationType="slide" transparent={true} visible={show} onRequestClose={handleClose}>
            <Container style={styles.centeredView}>
                <Content contentContainerStyle={styles.modalView}>
                    <Form>
                        <H2>Add a new location</H2>
                        <Item stackedLabel error={name.length === 0}>
                            <Label>Name</Label>
                            <Input value={name} onChangeText={(value) => setName(value.trim())} />
                        </Item>
                        <Item stackedLabel error={error.length > 0}>
                            <Label>Diameter (meters)</Label>
                            <Input
                                value={radius}
                                keyboardType="numeric"
                                onChangeText={(value) => setRadius(value.replace(/[^0-9.]/g, ''))}
                            />
                        </Item>
                        {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
                        <View style={styles.buttons}>
                            <Button onPress={handleClose} danger rounded>
                                <Text>Close</Text>
                            </Button>
                            <Button
                                onPress={onConfirm}
                                disabled={name.length === 0 && radius.length === 0}
                                success
                                rounded
                            >
                                <Text>Confirm</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        marginTop: 150,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    errorText: { color: 'red', paddingLeft: 15 },
});

export default AddNewLocationModal;
