import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container, Label, Content, Form, Item, Input, Button, Text, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';
import validator from 'validator';

import createAction from '../utils/createAction';
import { AUTH } from '../actions';
import * as actions from '../actionTypes/AuthActionTypes';

type Props = {
    isLoading: boolean;
    login: (payload: actions.LoginRequestAction['payload']) => void;
};

const Login = (props: Props) => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('123456');

    const isValid = validator.isEmail(email) && password.length > 0;
    const onSumbit = useCallback(() => {
        if (isValid) {
            props.login({ email, password });
        }
    }, [email, password, isValid, props]);

    return (
        <Container>
            <Content>
                <Form>
                    <Text style={styles.logo}>Staying safe and informed</Text>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.nativeEvent.text.trim())} />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            value={password}
                            onChange={(e) => setPassword(e.nativeEvent.text.trim())}
                        />
                    </Item>
                    <Button
                        full
                        primary
                        style={styles.button}
                        onPress={onSumbit}
                        disabled={!isValid || props.isLoading}
                    >
                        {props.isLoading ? <Spinner /> : <Text> Login </Text>}
                    </Button>
                    <Link to="/forgot_password" style={styles.forgotYourPassword}>
                        Forgot your password?
                    </Link>
                    <Link to="/customer_register" style={styles.register}>
                        Register
                    </Link>
                </Form>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 80,
        marginBottom: 50,
    },
    button: { marginTop: 35 },
    forgotYourPassword: { textAlign: 'center', paddingTop: 15, color: '#0000EE' },
    register: { textAlign: 'center', paddingTop: 15, color: '#0000EE' },
    loginAsManager: { textAlignVertical: 'center', color: 'white' },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
    login: createAction<actions.LoginRequestAction['payload']>(AUTH.LOGIN),
})(Login);
