import React, { useState, useEffect, useCallback } from 'react';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Content, Button, Text, Card, CardItem, Header, Spinner, View, Icon } from 'native-base';
import { StyleSheet, Alert, Dimensions, PermissionsAndroid } from 'react-native';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { connect } from 'react-redux';

import createAction from '../../utils/createAction';
import { CUSTOMERS, LOCATIONS } from '../../actions';
import * as actions from '../../actionTypes/LocationActionTypes';
import * as customerActions from '../../actionTypes/CustomersActionTypes';
import requestLocationPermission from '../../utils/requestLocationPermission';

type Props = {
    getLocations: () => void;
    getUnseenNotification: (customerId: string) => void;
    list: Array<Location>;
    isLoading: boolean;
    customerId: string;
};

const CustomerHome = ({ getLocations, getUnseenNotification, list, isLoading, customerId }: Props) => {
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        readyToLaunch: false,
        error: '',
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0034,
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

    const handleRefreshLocations = useCallback(() => {
        getLocations();
    }, [getLocations]);

    const handleFindCurrentLocation = useCallback(() => {
        Geolocation.getCurrentPosition(geoLocationSuccess, geoLocationFailure, {
            timeout: 10000,
        });
    }, [geoLocationSuccess, geoLocationFailure]);

    useEffect(() => {
        requestLocationPermission(
            () => setLocationPermissionGranted(true),
            () => setLocationPermissionGranted(false),
        );
    });

    useEffect(() => {
        if (locationPermissionGranted) {
            Geolocation.getCurrentPosition(geoLocationSuccess, geoLocationFailure, { timeout: 10000 });
        }
    }, [geoLocationFailure, geoLocationSuccess, locationPermissionGranted]);

    useEffect(() => {
        getLocations();
    }, [getLocations]);

    useEffect(() => {
        getUnseenNotification(customerId);
    }, [getUnseenNotification, customerId]);

    console.log('region.readyToLaunch', region.readyToLaunch, 'isLoading', isLoading);
    return (
        <Container>
            <Header>
                <Text style={styles.header}>COVID-19 Public Places </Text>
            </Header>
            <Content>
                <Card>
                    <CardItem header bordered>
                        <Text>Public places visited by cases during their infectious period</Text>
                    </CardItem>
                    <CardItem bordered style={styles.mapCardItem}>
                        {region.readyToLaunch || isLoading ? (
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                region={region}
                                style={styles.maps}
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
                                <Spinner color="blue" />
                            </View>
                        )}
                    </CardItem>
                    <CardItem footer bordered style={styles.footer}>
                        <Button iconRight onPress={handleRefreshLocations} disabled={isLoading}>
                            <Text>Refresh Zones</Text>
                            {isLoading ? <Spinner color="blue" /> : <Icon name="refresh-outline" />}
                        </Button>
                        <Button icon onPress={handleFindCurrentLocation}>
                            <Icon name="locate" />
                        </Button>
                    </CardItem>
                </Card>
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
        height: Dimensions.get('window').height - 215,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.locations.isLoading,
    list: state.locations.list,
    customerId: state.auth._id,
});

export default connect(mapStateToProps, {
    getLocations: createAction<actions.AddLocationRequestAction['payload']>(LOCATIONS.GET_ALL),
    getUnseenNotification: createAction<customerActions.GetUnseenNotificationsRequestAction['payload']>(
        CUSTOMERS.NOTIFICATIONS.GET_UNSEEN,
    ),
})(CustomerHome);
