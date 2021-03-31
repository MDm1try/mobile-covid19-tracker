import React, { useEffect, useCallback, useState, memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Container, H3, Left, Content, ListItem, CheckBox, Text, Body, Button, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';

import createAction from '../../utils/createAction';
import { CUSTOMERS } from '../../actions';
import * as actions from '../../actionTypes/CustomersActionTypes';

type Props = {
    route: RouteProp<RootStackParamList, 'edit_customer'>;
    customer?: Customer;
    isLoading: boolean;
    getCustomerById: (_id: string) => void;
    updateCustomerStatusById: (statuses: CustomerStatuses) => void;
};

const EditCustomer = ({ isLoading, updateCustomerStatusById, getCustomerById, customer, route }: Props) => {
    const [statuses, setStatuses] = useState({
        isInfected: false,
        isHealthy: false,
        isVaccinated: false,
        isRecovered: false,
        isPossiblyInfected: false,
    });

    useEffect(() => {
        getCustomerById(route.params._id);
    }, [getCustomerById, route]);

    const currentStatuses = customer?.statuses[0];
    useEffect(() => {
        if (currentStatuses) {
            setStatuses({
                isInfected: currentStatuses.isInfected,
                isHealthy: currentStatuses.isHealthy,
                isVaccinated: currentStatuses.isVaccinated,
                isRecovered: currentStatuses.isRecovered,
                isPossiblyInfected: currentStatuses.isPossiblyInfected,
            });
        }
    }, [currentStatuses]);

    const handleChangeStatus = useCallback(
        (name: 'isInfected' | 'isHealthy' | 'isVaccinated' | 'isRecovered' | 'isPossiblyInfected') => () => {
            setStatuses({ ...statuses, [name]: !statuses[name] });
        },
        [setStatuses, statuses],
    );

    const handleUpdate = useCallback(() => {
        if (customer && customer.statuses.length) {
            updateCustomerStatusById({
                ...statuses,
                _id: customer.statuses[0]._id,
                userId: customer.statuses[0]._id,
            });
        }
    }, [updateCustomerStatusById, statuses, customer]);

    return (
        <Container>
            <H3 style={styles.h3}>Patient Info</H3>
            <Content>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <ListItem>
                            <Left>
                                <Text> First Name:</Text>
                            </Left>
                            <Body>
                                <Text>{customer?.firstName}</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text> Last Name:</Text>
                            </Left>
                            <Body>
                                <Text>{customer?.lastName}</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text> Date Of Birth:</Text>
                            </Left>
                            <Body>
                                <Text>{customer?.dob}</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text> Email:</Text>
                            </Left>
                            <Body>
                                <Text>{customer?.email}</Text>
                            </Body>
                        </ListItem>
                        <ListItem header noBorder noIndent style={styles.checkboxTitle}>
                            <Text>Please, select the current status for the patient:</Text>
                        </ListItem>
                        <ListItem noIndent>
                            <CheckBox
                                checked={statuses.isInfected}
                                color="red"
                                onPress={handleChangeStatus('isInfected')}
                            />
                            <Body>
                                <Text>already got infected</Text>
                            </Body>
                        </ListItem>
                        <ListItem noIndent>
                            <CheckBox
                                checked={statuses.isHealthy}
                                color="green"
                                onPress={handleChangeStatus('isHealthy')}
                            />
                            <Body>
                                <Text>healthy</Text>
                            </Body>
                        </ListItem>
                        <ListItem noIndent>
                            <CheckBox
                                checked={statuses.isVaccinated}
                                color="blue"
                                onPress={handleChangeStatus('isVaccinated')}
                            />
                            <Body>
                                <Text>already vaccinated</Text>
                            </Body>
                        </ListItem>
                        <ListItem noIndent>
                            <CheckBox
                                checked={statuses.isRecovered}
                                color="#DEBA6B"
                                onPress={handleChangeStatus('isRecovered')}
                            />
                            <Body>
                                <Text>already recovered</Text>
                            </Body>
                        </ListItem>
                        <ListItem noIndent>
                            <CheckBox
                                checked={statuses.isPossiblyInfected}
                                color="orange"
                                onPress={handleChangeStatus('isPossiblyInfected')}
                            />
                            <Body>
                                <Text>possibly infected</Text>
                            </Body>
                        </ListItem>
                        <Button full primary style={styles.button} onPress={handleUpdate}>
                            <Text> Update </Text>
                        </Button>
                    </>
                )}
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    h3: {
        textAlign: 'center',
        padding: 20,
    },
    checkboxTitle: {
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
    },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.customers.isLoading,
    customer: state.customers.customer,
});
export default connect(mapStateToProps, {
    getCustomerById: createAction<actions.GetCustomerByIdRequestAction['payload']>(CUSTOMERS.GET_BY_ID),
    updateCustomerStatusById: createAction<actions.UpdateCustomerStatusByIdRequestAction['payload']>(
        CUSTOMERS.UPDATE_STATUS_BY_ID,
    ),
})(memo(EditCustomer));
