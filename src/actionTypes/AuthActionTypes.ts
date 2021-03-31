import { AUTH } from '../actions';

export interface LoginSuccessAction {
    type: typeof AUTH.LOGIN.SUCCESS;
    payload: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        dob: string;
        type: string;
    };
}

export interface LoginRequestAction {
    type: typeof AUTH.LOGIN.REQUEST;
    payload: {
        email: string;
        password: string;
    };
}

export interface RegistrationRequestAction {
    type: typeof AUTH.REGISTRATION.REQUEST;
    payload: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        dob: string;
        confirmLicense: boolean;
    };
}

export interface LogoutRequestAction {
    type: typeof AUTH.REGISTRATION.REQUEST;
    payload: undefined;
}

type AuthActionTypes = LoginSuccessAction | LoginRequestAction | RegistrationRequestAction | LogoutRequestAction;

export default AuthActionTypes;
