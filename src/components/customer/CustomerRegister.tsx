import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Container, Label, Content, Form, Item, Input, Button, Text, H1, CheckBox, Body } from 'native-base';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { inputRegisterForm } from '../../utils/validationForms';
import createAction from '../../utils/createAction';
import { AUTH } from '../../actions';
import * as actions from '../../actionTypes/AuthActionTypes';

type Props = {
    registration: (payload: actions.RegistrationRequestAction['payload']) => void;
};

class CustomerRegister extends React.Component<Props> {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: new Date(),
        confirmLicense: false,
        showDatepicker: false,
        isDobChanged: false,
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: '',
            confirmLicense: '',
        },
    };

    setDate = (event: Event, date?: Date) => {
        if (date) {
            this.setState({ dob: date, showDatepicker: false, isDobChanged: true });
        }
    };

    onChange = (name: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        this.setState({ [name]: e.nativeEvent.text.trim() });
    };

    onCheck = () => {
        this.setState({ confirmLicense: !this.state.confirmLicense });
    };

    showDatepicker = () => this.setState({ showDatepicker: true });

    register = () => {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            dob: moment(this.state.dob).format('YYYY-MM-DD'),
            confirmLicense: this.state.confirmLicense,
        };
        const { errors, isInvalid } = inputRegisterForm(data);
        this.setState({ errors });
        if (!isInvalid) {
            this.props.registration(data);
        }
    };

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <H1 style={styles.h3}>Registration</H1>
                        <Item stackedLabel>
                            <Label>
                                First Name * <Text style={styles.errorText}>{this.state.errors.firstName}</Text>
                            </Label>
                            <Input onChange={this.onChange('firstName')} value={this.state.firstName} />
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                Last Name * <Text style={styles.errorText}>{this.state.errors.lastName}</Text>
                            </Label>
                            <Input onChange={this.onChange('lastName')} value={this.state.lastName} />
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                Email * <Text style={styles.errorText}>{this.state.errors.email}</Text>
                            </Label>
                            <Input onChange={this.onChange('email')} value={this.state.email} />
                        </Item>
                        <Item stackedLabel style={styles.datePickerContainer}>
                            <Label>
                                Date of Birth * <Text style={styles.errorText}>{this.state.errors.dob}</Text>
                            </Label>
                            <Text onPress={this.showDatepicker} style={styles.datePicker}>
                                {this.state.isDobChanged ? moment(this.state.dob).format('LL') : 'Select date'}
                            </Text>
                            {this.state.showDatepicker && (
                                <DateTimePicker
                                    value={this.state.dob}
                                    minimumDate={new Date(1900, 1, 1)}
                                    maximumDate={new Date(2005, 12, 31)}
                                    locale={'en'}
                                    timeZoneOffsetInMinutes={undefined}
                                    textColor="black"
                                    onChange={this.setDate}
                                />
                            )}
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                Password * <Text style={styles.errorText}>{this.state.errors.password}</Text>
                            </Label>
                            <Input onChange={this.onChange('password')} value={this.state.password} />
                        </Item>
                        <Item stackedLabel>
                            <Label>
                                Confirm Password *{' '}
                                <Text style={styles.errorText}>{this.state.errors.confirmPassword}</Text>
                            </Label>
                            <Input onChange={this.onChange('confirmPassword')} value={this.state.confirmPassword} />
                        </Item>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox checked={this.state.confirmLicense} onPress={this.onCheck} />
                            <Body>
                                <Text>
                                    I agree to the <Text style={styles.licenseAgreement}>License Agreement</Text>
                                </Text>
                            </Body>
                        </View>
                        {!!this.state.errors.confirmLicense && (
                            <Text style={styles.errorTextLicense}>{this.state.errors.confirmLicense}</Text>
                        )}
                        <Button full primary style={styles.button} onPress={this.register}>
                            <Text> Register </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    h3: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 40,
    },
    button: { marginTop: 35, marginBottom: 50 },
    register: { textAlign: 'center', paddingTop: 15 },
    checkBoxContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 40,
    },
    datePickerContainer: {
        alignItems: 'flex-start',
    },
    datePicker: {
        paddingTop: 25,
        paddingBottom: 15,
        paddingLeft: 5,
    },
    licenseAgreement: {
        color: '#0000EE',
    },
    errorText: { color: '#FF9494' },
    errorTextLicense: { color: '#FF9494', marginLeft: 20, marginTop: 5 },
});

export default connect(null, {
    registration: createAction<actions.RegistrationRequestAction['payload']>(AUTH.REGISTRATION),
})(CustomerRegister);
