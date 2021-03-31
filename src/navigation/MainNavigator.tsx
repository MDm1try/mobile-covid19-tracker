import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { EditCustomer } from '../components/admin';
import { CustomerRegister } from '../components/customer';

import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';
import RegistrationSuccessful from '../components/RegistrationSuccessful';
import WatchLocation from '../components/WatchLocation';
import { CustomerDrawer, AdminDrawer } from './DrawerNavigators';

import { USER_TYPES } from '../utils/constants';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="customer_register" options={{ title: 'Back' }} component={CustomerRegister} />
        <Stack.Screen name="forgot_password" options={{ title: 'Back' }} component={ForgotPassword} />
        <Stack.Screen
            name="registration_successful"
            options={{ headerShown: false }}
            component={RegistrationSuccessful}
        />
    </Stack.Navigator>
);

type CustomerNavigatorProps = {
    unseenNotifications: number;
};

const CustomerNavigator = ({ unseenNotifications }: CustomerNavigatorProps) => (
    <WatchLocation>
        <Stack.Navigator initialRouteName="customer_home">
            <Stack.Screen
                name="customer_home"
                options={{ headerShown: false }}
                children={(rest) => <CustomerDrawer {...rest} unseenNotifications={unseenNotifications} />}
            />
        </Stack.Navigator>
    </WatchLocation>
);

const AdminNavigator = () => (
    <Stack.Navigator initialRouteName="admin_home">
        <Stack.Screen name="admin_home" options={{ headerShown: false }} component={AdminDrawer} />
        <Stack.Screen name="edit_customer" options={{ title: 'Back' }} component={EditCustomer} />
    </Stack.Navigator>
);

type Props = {
    isLoggedIn: boolean;
    type: string;
    unseenNotifications: number;
};

const MainNavigator = ({ unseenNotifications, isLoggedIn, type }: Props) => {
    if (isLoggedIn) {
        switch (type) {
            case USER_TYPES.ADMIN:
                return <AdminNavigator />;
            case USER_TYPES.CUSTOMERS:
                return <CustomerNavigator unseenNotifications={unseenNotifications} />;
            default:
                break;
        }
    }
    return <AuthNavigator />;
};

const mapStateToProps = (state: IRootState) => ({
    isLoggedIn: state.auth.isLoggedIn,
    type: state.auth.type,
    unseenNotifications: state.notifications.unseenNotifications,
});

export default connect(mapStateToProps)(MainNavigator);
