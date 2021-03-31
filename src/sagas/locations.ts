import { takeLatest, call, put } from 'redux-saga/effects';
import { Toast } from 'native-base';

import { LOCATIONS } from '../actions';
import * as api from '../api';
import * as actions from '../actionTypes/LocationActionTypes';

function* addLocationSaga(action: actions.AddLocationRequestAction) {
    try {
        yield call(api.addLocationService, action.payload);
        yield put({ type: LOCATIONS.ADD.SUCCESS });
        yield put({ type: LOCATIONS.GET_ALL.REQUEST });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: LOCATIONS.ADD.FAILURE, payload: err.message });
    }
}

function* getLocationsSaga(action: actions.GetAllLocationsRequestAction) {
    try {
        const { data } = yield call(api.getLocationsService, action.payload);
        yield put({ type: LOCATIONS.GET_ALL.SUCCESS, payload: data.locations });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: LOCATIONS.GET_ALL.FAILURE, payload: err.message });
    }
}

function* removeLocationByIdSaga(action: actions.GetLocationByIdRequestAction) {
    try {
        yield call(api.removeLocationByIdService, action.payload);
        yield put({ type: LOCATIONS.REMOVE_BY_ID.SUCCESS });
        yield put({ type: LOCATIONS.GET_ALL.REQUEST });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: LOCATIONS.REMOVE_BY_ID.FAILURE, payload: err.message });
    }
}

function* getLocationByIdSaga(action: actions.GetLocationByIdRequestAction) {
    try {
        const { data } = yield call(api.getLocationByIdService, action.payload);
        yield put({ type: LOCATIONS.GET_BY_ID.SUCCESS, payload: data });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: LOCATIONS.GET_BY_ID.FAILURE, payload: err.message });
    }
}

function* trackLocationSaga(action: actions.TrackLocationRequestAction) {
    try {
        yield call(api.trackLocationService, action.payload);
        yield put({ type: LOCATIONS.TRACK.SUCCESS });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: LOCATIONS.TRACK.FAILURE, payload: err.message });
    }
}

export default function* watchSagas() {
    yield takeLatest(LOCATIONS.ADD.REQUEST, addLocationSaga);
    yield takeLatest(LOCATIONS.GET_ALL.REQUEST, getLocationsSaga);
    yield takeLatest(LOCATIONS.REMOVE_BY_ID.REQUEST, removeLocationByIdSaga);
    yield takeLatest(LOCATIONS.GET_BY_ID.REQUEST, getLocationByIdSaga);
    yield takeLatest(LOCATIONS.TRACK.REQUEST, trackLocationSaga);
}
