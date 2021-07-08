import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, ListItem, List, Text, Left, Body, Right, Spinner, Icon, H3 } from 'native-base';

import { STATISTICS } from '../../actions';
import createAction from '../../utils/createAction';
import * as actions from '../../actionTypes/StatisticsActionTypes';

type Props = {
    countInfectedCustomers: number;
    countHealthyCustomers: number;
    countVaccinatedCustomers: number;
    countRecoveredCustomers: number;
    countPossiblyInfectedCustomers: number;
    countLocations: number;
    isLoading: boolean;
    getStatistics: () => void;
};

const AdminStatistics = (props: Props) => {
    const {
        getStatistics,
        countInfectedCustomers,
        countHealthyCustomers,
        countVaccinatedCustomers,
        countRecoveredCustomers,
        countPossiblyInfectedCustomers,
        countLocations,
        isLoading,
    } = props;

    useEffect(() => {
        getStatistics();
    }, [getStatistics]);

    return (
        <Container>
            <Header>
                <Text style={styles.header}>Statistics </Text>
            </Header>
            <Content>
                {isLoading ? (
                    <Spinner color="blue" />
                ) : (
                    <List style={styles.list}>
                        <ListItem icon>
                            <Left>
                                <Icon name="viruses" type="FontAwesome5" style={{ fontSize: 20, color: 'red' }} />
                            </Left>
                            <Body>
                                <Text> Infected statuses:</Text>
                            </Body>
                            <Right>
                                <Text>{countInfectedCustomers}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="medkit-outline" style={{ fontSize: 20, color: 'green' }} />
                            </Left>
                            <Body>
                                <Text>Healthy statuses:</Text>
                            </Body>
                            <Right>
                                <Text>{countHealthyCustomers}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="syringe" type="FontAwesome5" style={{ fontSize: 20, color: 'blue' }} />
                            </Left>
                            <Body>
                                <Text> Vaccinated statuses:</Text>
                            </Body>
                            <Right>
                                <Text>{countVaccinatedCustomers}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="reload-circle-outline" style={{ color: '#DEBA6B' }} />
                            </Left>
                            <Body>
                                <Text> Recovered statuses:</Text>
                            </Body>
                            <Right>
                                <Text>{countRecoveredCustomers}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="help-circle-outline" style={{ color: 'orange' }} />
                            </Left>
                            <Body>
                                <Text> Possibly infected statuses:</Text>
                            </Body>
                            <Right>
                                <Text>{countPossiblyInfectedCustomers}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="location-outline" style={{ color: 'red' }} />
                            </Left>
                            <Body>
                                <Text> Number of infected locations:</Text>
                            </Body>
                            <Right>
                                <Text>{countLocations}</Text>
                            </Right>
                        </ListItem>
                    </List>
                )}
            </Content>
        </Container>
    );
};

const mapStateToProps = (state: IRootState) => ({
    countInfectedCustomers: state.statistics.countInfectedCustomers,
    countHealthyCustomers: state.statistics.countHealthyCustomers,
    countVaccinatedCustomers: state.statistics.countVaccinatedCustomers,
    countRecoveredCustomers: state.statistics.countRecoveredCustomers,
    countPossiblyInfectedCustomers: state.statistics.countPossiblyInfectedCustomers,
    countLocations: state.statistics.countLocations,
    isLoading: state.statistics.isLoading,
});

const styles = StyleSheet.create({
    header: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    list: {
        marginTop: 25,
    },
});

export default connect(mapStateToProps, {
    getStatistics: createAction<actions.GetStatisticsRequestAction['payload']>(STATISTICS.GET),
})(AdminStatistics);
