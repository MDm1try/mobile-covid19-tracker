import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Container, Content, Form, Item, Button, Text, H2 } from 'native-base';
import { Picker } from '@react-native-picker/picker';

type Props = {
    show: boolean;
    handleConfirm: (hours: number) => void;
};
const AddInfectionTimeModal = ({ show, handleConfirm }: Props) => {
    const [hours, setHours] = useState('12');

    const onConfirm = useCallback(() => {
        handleConfirm(Number(hours));
    }, [handleConfirm, hours]);

    return (
        <Modal animationType="slide" transparent={true} visible={show}>
            <Container style={styles.centeredView}>
                <Content contentContainerStyle={styles.modalView}>
                    <Form>
                        <H2>Add infection time</H2>
                        <Text style={styles.text}>
                            Please, select how many hours have passed since the customer got infected with COVID-19
                        </Text>
                        <Item picker style={styles.item}>
                            <Picker
                                enabled
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={hours}
                                onValueChange={(value) => setHours(value)}
                            >
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="48" value="48" />
                                <Picker.Item label="96" value="96" />
                                <Picker.Item label="186" value="186" />
                            </Picker>
                        </Item>
                        <View style={styles.buttons}>
                            <Button onPress={onConfirm} success rounded>
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
    text: {
        marginTop: 10,
    },
    item: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
});

export default React.memo(AddInfectionTimeModal);
