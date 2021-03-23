import * as React from 'react';
import { Container, Content, Form, Text, H1, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<RootStackParamList, any>;
};

const RegistrationSuccessful = (props: Props) => (
    <Container>
        <Content>
            <Form style={styles.form}>
                <H1 style={styles.h3}>Register</H1>
                <Text style={styles.info}>
                    Your registration has been successfully completed. You have just been sent an email containing
                    activation instructions.
                </Text>
                <Button full success style={styles.continue} onPress={() => props.navigation.push('login')}>
                    <Text> Continue </Text>
                </Button>
            </Form>
        </Content>
    </Container>
);

const styles = StyleSheet.create({
    form: { justifyContent: 'center' },
    h3: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 40,
    },
    info: { textAlign: 'center', marginBottom: 50 },
    button: { marginTop: 35 },
    continue: { marginTop: 15, fontSize: 20 },
});

export default RegistrationSuccessful;
