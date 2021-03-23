import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actions from '../actionTypes/AuthActionTypes';
import { CustomerHome, CustomerAccount, CustomerNotifications } from '../components/customer';
import { AdminHome, Customers } from '../components/admin';
import { store } from '../configure-store';
import createAction from '../utils/createAction';
import { AUTH } from '../actions';

const Drawer = createDrawerNavigator();

const logout = async () => {
    await AsyncStorage.setItem('jwtToken', '');
    store.dispatch(createAction<actions.LogoutRequestAction['payload']>(AUTH.LOGOUT)());
};

function DrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Log Out" onPress={logout} />
        </DrawerContentScrollView>
    );
}

export const CustomerDrawer = () => (
    <Drawer.Navigator initialRouteName="customer_home" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="customer_home" component={CustomerHome} options={{ title: 'Home' }} />
        <Drawer.Screen name="customer_account" component={CustomerAccount} options={{ title: 'Your Account' }} />
        <Drawer.Screen
            name="customer_notifications"
            component={CustomerNotifications}
            options={{ title: 'Notifications' }}
        />
    </Drawer.Navigator>
);

export const AdminDrawer = () => (
    <Drawer.Navigator initialRouteName="admin_home" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="admin_home" component={AdminHome} options={{ title: 'Home' }} />
        <Drawer.Screen name="admin_customers" component={Customers} options={{ title: 'Customers' }} />
        <Drawer.Screen name="admin_account" component={AdminHome} options={{ title: 'Your Account' }} />
    </Drawer.Navigator>
);
