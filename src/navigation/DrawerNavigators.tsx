import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge, Text, View, Icon } from 'native-base';

import * as actions from '../actionTypes/AuthActionTypes';
import { CustomerHome, CustomerAccount, CustomerNotifications, CustomerHelp } from '../components/customer';
import { AdminHome, Customers, AdminAccount, AdminStatistics } from '../components/admin';
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

type CustomerNavigatorProps = {
    unseenNotifications: number;
};

export const CustomerDrawer = ({ unseenNotifications }: CustomerNavigatorProps) => (
    <Drawer.Navigator initialRouteName="customer_home" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="customer_home" component={CustomerHome} options={{ title: 'Home', unmountOnBlur: true }} />
        <Drawer.Screen
            name="customer_account"
            component={CustomerAccount}
            options={{ title: 'Your Account', unmountOnBlur: true }}
        />
        <Drawer.Screen
            name="customer_notifications"
            component={CustomerNotifications}
            options={{
                drawerLabel: () => (
                    // eslint-disable-next-line react-native/no-inline-styles
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'grey' }}>
                            Notifications
                            {unseenNotifications > 0 && (
                                <Badge>
                                    <Text>{unseenNotifications}</Text>
                                </Badge>
                            )}
                        </Text>
                    </View>
                ),
                unmountOnBlur: true,
            }}
        />
        <Drawer.Screen
            name="customer_help"
            component={CustomerHelp}
            options={{
                drawerLabel: () => (
                    <Text style={{ color: 'grey' }}>
                        Help
                        <Icon name="help-circle-outline" style={{ color: '#007AFF' }} />
                    </Text>
                ),
            }}
        />
    </Drawer.Navigator>
);

export const AdminDrawer = () => (
    <Drawer.Navigator initialRouteName="admin_home" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="admin_home" component={AdminHome} options={{ title: 'Home', unmountOnBlur: true }} />
        <Drawer.Screen name="admin_account" component={AdminAccount} options={{ title: 'Your Account' }} />
        <Drawer.Screen
            name="admin_customers"
            component={Customers}
            options={{ title: 'Customers', unmountOnBlur: true }}
        />
        <Drawer.Screen
            name="admin_statistics"
            component={AdminStatistics}
            options={{ title: 'Statistics', unmountOnBlur: true }}
        />
    </Drawer.Navigator>
);
