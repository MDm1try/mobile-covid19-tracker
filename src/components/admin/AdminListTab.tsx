import React, { useCallback, useEffect } from 'react';
import {
    Container,
    Content,
    Text,
    Header,
    Item,
    List,
    ListItem,
    Spinner,
    Button,
    Right,
    Left,
    Icon,
    Input,
} from 'native-base';
import { connect } from 'react-redux';
import { NativeSyntheticEvent, TextInputChangeEventData, StyleSheet } from 'react-native';

import createAction from '../../utils/createAction';
import { LOCATIONS } from '../../actions';
import * as actions from '../../actionTypes/LocationActionTypes';

type Props = {
    getLocations: (payload?: { name?: string }) => void;
    removeLocationById: (id: string) => void;
    list: Array<Location>;
    isLoading: boolean;
};

const AdminListTab = ({ removeLocationById, getLocations, isLoading, list }: Props) => {
    const handleRemove = useCallback(
        (id: string) => () => {
            removeLocationById(id);
        },
        [removeLocationById],
    );

    const handleSearch = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const name = e.nativeEvent.text.trim();
            getLocations({ name });
        },
        [getLocations],
    );

    useEffect(() => {
        getLocations();
    }, [getLocations]);

    return (
        <Container>
            <Header searchBar rounded style={styles.header}>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChange={handleSearch} />
                    <Icon name="flag-sharp" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content>
                {isLoading ? (
                    <Spinner color="blue" />
                ) : (
                    <List>
                        {list.map((location) => (
                            <ListItem key={location._id}>
                                <Left style={styles.infoLeft}>
                                    <Text style={styles.infoName}>{location.name}</Text>
                                    <Text style={styles.infoRadius}>radius {location.radius} (m)</Text>
                                </Left>
                                <Right>
                                    <Icon
                                        name="trash-outline"
                                        onPress={handleRemove(location._id)}
                                        style={styles.trashIcon}
                                    />
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
    header: {
        marginTop: 5,
        backgroundColor: 'white',
    },
    infoLeft: {
        display: 'flex',
        flexDirection: 'column',
    },
    infoName: {
        textAlign: 'left',
        width: '100%',
    },
    infoRadius: {
        textAlign: 'left',
        fontSize: 12,
        width: '100%',
    },
    trashIcon: {
        color: 'black',
    },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.locations.isLoading,
    location: state.locations.location,
    list: state.locations.list,
});

export default connect(mapStateToProps, {
    getLocations: createAction<actions.GetAllLocationsRequestAction['payload']>(LOCATIONS.GET_ALL),
    removeLocationById: createAction<actions.RemoveLocationByIdRequestAction['payload']>(LOCATIONS.REMOVE_BY_ID),
})(AdminListTab);
