import { PermissionsAndroid, Alert } from 'react-native';

async function requestLocationPermission(handleSuccess?: () => void, handleError?: () => void) {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: 'Contact Tracing',
            message: 'Contact Tracing access to your location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            handleSuccess && handleSuccess();
        } else {
            console.log('location permission denied');
            Alert.alert('Location permission denied');
            handleError && handleError();
        }
    } catch (err) {
        handleError && handleError();
        console.warn(err);
    }
}

export default requestLocationPermission;
