import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { Toast } from 'native-base';

import createAction from '../utils/createAction';
import { LOCATIONS } from '../actions';
import * as actions from '../actionTypes/LocationActionTypes';
import requestLocationPermission from '../utils/requestLocationPermission';

type Props = {
    children: ReactNode;
    trackLocation: (payload: actions.TrackLocationRequestAction['payload']) => void;
};

class WatchLocation extends Component<Props> {
    watchID = 0;

    async componentDidMount() {
        await requestLocationPermission(this.watchPosition);
    }

    watchPosition = () => {
        this.watchID = Geolocation.watchPosition(this.handleSuccess, this.handleError, {
            maximumAge: 5000,
        });
        console.log('watchId', this.watchID);
    };

    handleSuccess = (position: GeolocationResponse) => {
        console.log('\nposition', position);
        this.props.trackLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
        });
    };

    handleError = (error: GeolocationError) => {
        console.log('\nerror', error);
        Toast.show({
            text: error.message,
            buttonText: 'Okay',
            type: 'danger',
        });
    };

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    };

    render() {
        return <>{this.props.children}</>;
    }
}

export default connect(null, {
    trackLocation: createAction(LOCATIONS.TRACK),
})(WatchLocation);
