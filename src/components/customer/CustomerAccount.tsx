import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, ListItem, Text, Left, Body, Spinner, Icon } from 'native-base';

import * as actions from '../../actionTypes/CustomersActionTypes';
import createAction from '../../utils/createAction';
import { CUSTOMERS } from '../../actions';

type Props = {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    customerId: string;
    isLoading: boolean;
    lastCustomerStatus?: CustomerStatuses;
    getLastCustomerStatus: (payload: actions.GetLastCustomerStatusRequestAction['payload']) => void;
};

const CustomerAccount = (props: Props) => {
    const { firstName, lastName, dob, email, customerId, isLoading, lastCustomerStatus, getLastCustomerStatus } = props;

    useEffect(() => {
        getLastCustomerStatus(customerId);
    }, [customerId, getLastCustomerStatus]);

    return (
        <Container>
            <Header>
                <Text style={styles.header}>My Account </Text>
            </Header>
            <Content>
                <ListItem>
                    <Left>
                        <Text> First Name:</Text>
                    </Left>
                    <Body>
                        <Text>{firstName}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Last Name:</Text>
                    </Left>
                    <Body>
                        <Text>{lastName}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Date Of Birth:</Text>
                    </Left>
                    <Body>
                        <Text>{dob}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Email:</Text>
                    </Left>
                    <Body>
                        <Text>{email}</Text>
                    </Body>
                </ListItem>
                <ListItem header noBorder style={styles.statusTitle}>
                    <Text>Your current status:</Text>
                </ListItem>
                {isLoading ? (
                    <Spinner color="blue" />
                ) : (
                    <>
                        {lastCustomerStatus?.isInfected && (
                            <ListItem>
                                <Icon name="checkmark-circle-outline" style={{ color: 'red' }} />
                                <Body>
                                    <Text>already got infected</Text>
                                </Body>
                            </ListItem>
                        )}
                        {lastCustomerStatus?.isHealthy && (
                            <ListItem>
                                <Icon name="checkmark-circle-outline" style={{ color: 'green' }} />
                                <Body>
                                    <Text>healthy</Text>
                                </Body>
                            </ListItem>
                        )}
                        {lastCustomerStatus?.isVaccinated && (
                            <ListItem>
                                <Icon name="checkmark-circle-outline" style={{ color: 'blue' }} />
                                <Body>
                                    <Text>already vaccinated</Text>
                                </Body>
                            </ListItem>
                        )}
                        {lastCustomerStatus?.isRecovered && (
                            <ListItem>
                                <Icon name="checkmark-circle-outline" style={{ color: '#DEBA6B' }} />
                                <Body>
                                    <Text>already recovered</Text>
                                </Body>
                            </ListItem>
                        )}
                        {lastCustomerStatus?.isPossiblyInfected && (
                            <ListItem noIndent>
                                <Icon name="checkmark-circle-outline" style={{ color: 'orange' }} />
                                <Body>
                                    <Text>possibly infected</Text>
                                </Body>
                            </ListItem>
                        )}
                    </>
                )}
            </Content>
        </Container>
    );
};

const mapStateToProps = (state: IRootState) => ({
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    dob: state.auth.dob,
    email: state.auth.email,
    customerId: state.auth._id,
    lastCustomerStatus: state.customers.lastCustomerStatus,
    isLoading: state.customers.isLoading,
});

const styles = StyleSheet.create({
    header: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    statusTitle: {
        marginTop: 20,
    },
});

export default connect(mapStateToProps, {
    getLastCustomerStatus: createAction<actions.GetLastCustomerStatusRequestAction['payload']>(
        CUSTOMERS.GET_LAST_STATUS,
    ),
})(CustomerAccount);
