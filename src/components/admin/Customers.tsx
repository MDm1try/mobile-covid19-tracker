import React, { useCallback, useEffect } from 'react';
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Button,
    Text,
    Content,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Spinner,
} from 'native-base';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import createAction from '../../utils/createAction';
import { CUSTOMERS } from '../../actions';
import * as actions from '../../actionTypes/CustomersActionTypes';

type StatusesProps = {
    statuses: Array<CustomerStatuses>;
};

const Statuses = ({ statuses }: StatusesProps) => {
    if (!statuses.length) {
        return null;
    }
    const currentStatus = statuses[0];
    return (
        <>
            {currentStatus.isInfected && <Icon style={styles.infected} name="ellipse" />}
            {currentStatus.isHealthy && <Icon style={styles.healthy} name="ellipse" />}
            {currentStatus.isVaccinated && <Icon style={styles.vaccinated} name="ellipse" />}
            {currentStatus.isRecovered && <Icon style={styles.recovered} name="ellipse" />}
            {currentStatus.isPossiblyInfected && <Icon style={styles.risk} name="ellipse" />}
        </>
    );
};

type Props = {
    isLoading: boolean;
    list: Array<Customer>;
    navigation: StackNavigationProp<RootStackParamList, any>;
    getCustomers: (payload: { name?: string }) => void;
};

const Customers = ({ navigation, list, isLoading, getCustomers }: Props) => {
    useEffect(() => {
        getCustomers({});
    }, [getCustomers]);

    const handleSearch = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const name = e.nativeEvent.text.trim();
            getCustomers({ name });
        },
        [getCustomers],
    );

    const handleOpenCustomer = useCallback(
        (_id: string) => () => {
            navigation.navigate('edit_customer', { _id });
        },
        [navigation],
    );
    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChange={handleSearch} />
                    <Icon name="ios-people" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <List>
                        {list.map((customer) => (
                            <ListItem key={customer._id}>
                                <Left>
                                    <Text>
                                        {customer.firstName} {customer.lastName}
                                    </Text>
                                </Left>
                                <Body style={styles.statuses}>
                                    <Statuses statuses={customer.statuses} />
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" onPress={handleOpenCustomer(customer._id)} />
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    infected: { color: 'red' }, // red
    healthy: { color: 'green' }, // green
    vaccinated: { color: 'blue' }, // blue
    recovered: { color: '#DEBA6B' }, // yellow
    risk: { color: 'orange' }, // orange
    statuses: {
        display: 'flex',
        flexDirection: 'row',
    },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.customers.isLoading,
    list: state.customers.list,
});

export default connect(mapStateToProps, {
    getCustomers: createAction<actions.GetAllCustomersRequestAction['payload']>(CUSTOMERS.GET_ALL),
})(Customers);
