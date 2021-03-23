import * as React from 'react';
import { Container, Label, Content, Form, Item, Input, Button, Text, H1 } from 'native-base';
import { StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

const ForgotPassword = () => {
    return (
        <Container>
            <Content>
                <Form>
                    <H1 style={styles.h3}>Forgot your password?</H1>
                    <Text style={styles.info}>
                        We just need your registered email address to send you password reset
                    </Text>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Button full primary style={styles.button} onPress={() => console.log('hello')}>
                        <Text> Reset Password </Text>
                    </Button>
                    <Link to="/customer_register" style={styles.register}>
                        Register
                    </Link>
                </Form>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    h3: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 40,
    },
    info: { textAlign: 'center', marginBottom: 50 },
    button: { marginTop: 35 },
    register: { textAlign: 'center', paddingTop: 15 },
});

export default ForgotPassword;
