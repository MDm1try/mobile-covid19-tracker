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
    payload: CustomerStatuses;
}

export interface UpdateCustomerStatusByIdSuccessAction {
    type: typeof CUSTOMERS.UPDATE_STATUS_BY_ID.SUCCESS;
    payload: undefined;
}

type CustomersActionTypes =
    | GetAllCustomersSuccessAction
    | GetAllCustomersRequestAction
    | GetCustomerByIdRequestAction
    | GetByIdCustomerSuccessAction
    | UpdateCustomerStatusByIdRequestAction
    | UpdateCustomerStatusByIdSuccessAction;

export default CustomersActionTypes;
