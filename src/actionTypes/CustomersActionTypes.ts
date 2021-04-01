import { CUSTOMERS } from '../actions';

export interface GetAllCustomersSuccessAction {
    type: typeof CUSTOMERS.GET_ALL.SUCCESS;
    payload: Array<Customer>;
}

export interface GetAllCustomersRequestAction {
    type: typeof CUSTOMERS.GET_ALL.REQUEST;
    payload: {
        name?: string;
    };
}

export interface GetCustomerByIdRequestAction {
    type: typeof CUSTOMERS.GET_BY_ID.REQUEST;
    payload: string;
}

export interface GetByIdCustomerSuccessAction {
    type: typeof CUSTOMERS.GET_BY_ID.SUCCESS;
    payload: Customer;
}

export interface UpdateCustomerStatusByIdRequestAction {
    type: typeof CUSTOMERS.UPDATE_STATUS_BY_ID.REQUEST;
    payload: {
        _id: string;
        userId: string;
        isInfected: boolean;
        isHealthy: boolean;
        isVaccinated: boolean;
        isRecovered: boolean;
        isPossiblyInfected: boolean;
        hours: number;
    };
}

export interface UpdateCustomerStatusByIdSuccessAction {
    type: typeof CUSTOMERS.UPDATE_STATUS_BY_ID.SUCCESS;
    payload: undefined;
}

export interface GetLastCustomerStatusRequestAction {
    type: typeof CUSTOMERS.GET_LAST_STATUS.REQUEST;
    payload: string;
}

export interface GetLastCustomerStatusSuccessAction {
    type: typeof CUSTOMERS.GET_LAST_STATUS.SUCCESS;
    payload: CustomerStatuses;
}

export interface GetAllCustomerNotificationsRequestAction {
    type: typeof CUSTOMERS.NOTIFICATIONS.GET_ALL.REQUEST;
    payload: string;
}
export interface GetAllCustomerNotificationsSuccessAction {
    type: typeof CUSTOMERS.NOTIFICATIONS.GET_ALL.SUCCESS;
    payload: {
        notifications: Array<Notification>;
        unseenNotifications: number;
    };
}

export interface ReadCustomerNotificationsRequestAction {
    type: typeof CUSTOMERS.NOTIFICATIONS.READ.REQUEST;
    payload: {
        notificationId: string;
        customerId: string;
    };
}

export interface GetUnseenNotificationsRequestAction {
    type: typeof CUSTOMERS.NOTIFICATIONS.GET_UNSEEN.REQUEST;
    payload: string;
}
export interface GetUnseenNotificationsSuccessAction {
    type: typeof CUSTOMERS.NOTIFICATIONS.GET_UNSEEN.SUCCESS;
    payload: number;
}

type CustomersActionTypes =
    | GetAllCustomersSuccessAction
    | GetAllCustomersRequestAction
    | GetCustomerByIdRequestAction
    | GetByIdCustomerSuccessAction
    | UpdateCustomerStatusByIdRequestAction
    | UpdateCustomerStatusByIdSuccessAction
    | GetAllCustomerNotificationsRequestAction
    | GetAllCustomerNotificationsSuccessAction
    | ReadCustomerNotificationsRequestAction
    | GetUnseenNotificationsRequestAction
    | GetUnseenNotificationsSuccessAction
    | GetLastCustomerStatusRequestAction
    | GetLastCustomerStatusSuccessAction;

export default CustomersActionTypes;
