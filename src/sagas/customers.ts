import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import { Toast } from 'native-base';

import * as navigation from '../RootNavigation';
import { CUSTOMERS } from '../actions';
import * as api from '../api';
import * as actions from '../actionTypes/CustomersActionTypes';

function* getCustomersSaga(action: actions.GetAllCustomersRequestAction) {
    try {
        const { data } = yield call(api.getCustomersService, action.payload);
        yield put({ type: CUSTOMERS.GET_ALL.SUCCESS, payload: data.users });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.GET_ALL.FAILURE, payload: err.message });
    }
}

function* getCustomerSaga(action: actions.GetCustomerByIdRequestAction) {
    try {
        const { data } = yield call(api.getCustomerByIdService, action.payload);
        yield put({ type: CUSTOMERS.GET_BY_ID.SUCCESS, payload: data });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.GET_BY_ID.FAILURE, payload: err.message });
    }
}

function* updateCustomerStatusesSaga(action: actions.UpdateCustomerStatusByIdRequestAction) {
    try {
        const statuses = action.payload;
        let errorText = '';
        if (statuses.isInfected && statuses.isHealthy) {
            errorText = 'The patient cannot be simultaneously infected and healthy.';
        } else if (statuses.isPossiblyInfected && statuses.isInfected) {
            errorText = 'The patient cannot be possibly infected and infected at the same time.';
        }
        if (errorText) {
            Toast.show({
                text: errorText,
                buttonText: 'Okay',
                type: 'danger',
            });
            yield put({ type: CUSTOMERS.UPDATE_STATUS_BY_ID.FAILURE, payload: errorText });
            return;
        }
        yield call(api.updateCustomerStatusesByIdService, statuses);
        yield put({ type: CUSTOMERS.UPDATE_STATUS_BY_ID.SUCCESS });
        yield put({ type: CUSTOMERS.GET_ALL.REQUEST, payload: {} });
        navigation.goBack();
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.UPDATE_STATUS_BY_ID.FAILURE, payload: err.message });
    }
}

function* getNotificationsSaga(action: actions.GetAllCustomerNotificationsRequestAction) {
    try {
        const { data } = yield call(api.getNotificationsService, action.payload);
        yield put({ type: CUSTOMERS.NOTIFICATIONS.GET_ALL.SUCCESS, payload: data });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.NOTIFICATIONS.GET_ALL.FAILURE });
    }
}

function* readNotificationSaga(action: actions.ReadCustomerNotificationsRequestAction) {
    try {
        yield call(api.readNotificationsService, action.payload.customerId, action.payload.notificationId);
        yield put({ type: CUSTOMERS.NOTIFICATIONS.READ.SUCCESS });
        yield put({ type: CUSTOMERS.NOTIFICATIONS.GET_ALL.REQUEST, payload: action.payload.customerId });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.NOTIFICATIONS.READ.FAILURE });
    }
}

function* getUnseenNotificationSaga(action: actions.GetUnseenNotificationsRequestAction) {
    try {
        const { data } = yield call(api.getUnseenNotificationsService, action.payload);
        yield put({ type: CUSTOMERS.NOTIFICATIONS.GET_UNSEEN.SUCCESS, payload: data.unseenNotifications });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.NOTIFICATIONS.GET_UNSEEN.FAILURE });
    }
}

function* getLastCustomerStatusSaga(action: actions.GetLastCustomerStatusRequestAction) {
    try {
        const { data } = yield call(api.getLastCustomerStatusesService, action.payload);
        yield put({ type: CUSTOMERS.GET_LAST_STATUS.SUCCESS, payload: data });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: CUSTOMERS.GET_LAST_STATUS.FAILURE });
    }
}

export default function* watchSagas() {
    yield debounce(500, CUSTOMERS.GET_ALL.REQUEST, getCustomersSaga);
    yield takeLatest(CUSTOMERS.GET_BY_ID.REQUEST, getCustomerSaga);
    yield takeLatest(CUSTOMERS.UPDATE_STATUS_BY_ID.REQUEST, updateCustomerStatusesSaga);
    yield takeLatest(CUSTOMERS.NOTIFICATIONS.GET_ALL.REQUEST, getNotificationsSaga);
    yield takeLatest(CUSTOMERS.NOTIFICATIONS.READ.REQUEST, readNotificationSaga);
    yield takeLatest(CUSTOMERS.NOTIFICATIONS.GET_UNSEEN.REQUEST, getUnseenNotificationSaga);
    yield takeLatest(CUSTOMERS.GET_LAST_STATUS.REQUEST, getLastCustomerStatusSaga);
}
