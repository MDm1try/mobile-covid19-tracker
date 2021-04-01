import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Content, Text, Card, CardItem, Spinner, View, Icon, Button } from 'native-base';
import { StyleSheet, Alert, Dimensions } from 'react-native';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';

import AddNewLocationModal from '../modals/AddNewLocationModal';
import createAction from '../../utils/createAction';
import { LOCATIONS } from '../../actions';
import * as actions from '../../actionTypes/LocationActionTypes';

type Props = {
    addLocation: (payload: actions.AddLocationRequestAction['payload']) => void;
    getLocations: () => void;
    list: Array<Location>;
    isLoading: boolean;
};

const AdminMapTab = ({ getLocations, addLocation, list, isLoading }: Props) => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        readyToLaunch: false,
        error: '',
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0034,
    });

    const [show, setModalVisible] = useState(false);

    const [markerInfo, setMarkerInfo] = useState({
        latitude: 0,
        longitude: 0,
    });

    const geoLocationSuccess = useCallback((response: GeolocationResponse) => {
        const latitude = response.coords.latitude;
        const longitude = response.coords.longitude;

        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const lonDelta = response.coords.accuracy / oneDegreeOfLongitudeInMeters;

        console.log('Lat & Lng', latitude, longitude);
        console.log('Lat del & Lng del', Math.max(0, lonDelta));

        setRegion({
            latitude,
            longitude,
            readyToLaunch: true,
            error: '',
            latitudeDelta: 0.0025,
            longitudeDelta: Math.max(0, lonDelta),
        });
    }, []);

    const geoLocationFailure = useCallback((err: GeolocationError) => {
        const error =
            err.message === 'No location provider available.'
                ? 'Geo Location failure, permission denied, Please enable it.'
                : err.message;
        setRegion((prevState) => ({
            ...prevState,
            readyToLaunch: false,
            error,
        }));
        Alert.alert(error);
    }, []);

    useEffect(() => {
        Geolocation.getCurrentPosition(geoLocationSuccess, geoLocationFailure);
    }, [geoLocationFailure, geoLocationSuccess]);

    useEffect(() => {
        getLocations();
    }, [getLocations]);

    const handleUpdateMap = useCallback(() => {
        Geolocation.getCurrentPosition(geoLocationSuccess, geoLocationFailure);
        getLocations();
    }, [geoLocationSuccess, geoLocationFailure, getLocations]);

    const handleAddMarker = useCallback((e) => {
        const coordinate = e.nativeEvent.coordinate;
        setMarkerInfo({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
        setModalVisible(true);
    }, []);

    const handleClose = useCallback(() => setModalVisible(false), [setModalVisible]);

    const handleConfirm = useCallback(
        (name: string, radius: number) => {
            const payload = {
                ...markerInfo,
                name,
                radius,
            };
            addLocation(payload);
            setModalVisible(false);
        },
        [setModalVisible, addLocation, markerInfo],
    );

    return (
        <Container>
            <Content>
                <Card>
                    <CardItem header bordered>
                        <Text style={styles.text}>If you want to add a new location, please click it on the map</Text>
                    </CardItem>
                    <CardItem footer bordered style={styles.mapCardItem}>
                        {region.readyToLaunch ? (
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                region={region}
                                style={styles.maps}
                                onPress={handleAddMarker}
                                showsUserLocation
                                zoomEnabled
                            >
                                {list.map((loc) => (
                                    <React.Fragment key={loc._id}>
                                        <Marker
                                            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                                            title={loc.name}
                                            description="There were people infected with СOVID-19"
                                        />
                                        <Circle
                                            center={{ latitude: loc.latitude, longitude: loc.longitude }}
                                            radius={loc.radius}
                                            fillColor="rgba(255,0,0,0.5)"
                                        />
                                    </React.Fragment>
                                ))}
                            </MapView>
                        ) : (
                            <View style={styles.spinner}>
                                {isLoading ? (
                                    <Spinner color="blue" />
                                ) : (
                                    <Button onPress={handleUpdateMap}>
                                        <Icon name="refresh" />
                                    </Button>
                                )}
                            </View>
                        )}
                    </CardItem>
                </Card>
                <AddNewLocationModal
                    show={show}
                    handleClose={handleClose}
                    handleConfirm={handleConfirm}
                    qty={list.length}
                />
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    text: { color: 'black' },
    maps: {
        width: '100%',
        height: '100%',
    },
    spinner: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    mapCardItem: {
        height: Dimensions.get('window').height - 195,
    },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.locations.isLoading,
    list: state.locations.list,
});

export default connect(mapStateToProps, {
    addLocation: createAction<actions.AddLocationRequestAction['payload']>(LOCATIONS.ADD),
    getLocations: createAction<actions.AddLocationRequestAction['payload']>(LOCATIONS.GET_ALL),
})(AdminMapTab);
