import React, { useCallback, useEffect } from 'react';
import {
    Container,
    Content,
    Text,
    Header,
    Item,
    List,
    ListItem,
    Spinner,
    Button,
    Right,
    Left,
    Icon,
    Input,
    Body,
    View,
    Badge,
} from 'native-base';
import { connect } from 'react-redux';
import { Alert, StyleSheet } from 'react-native';
import moment from 'moment';

import createAction from '../../utils/createAction';
import { CUSTOMERS } from '../../actions';
import * as actions from '../../actionTypes/CustomersActionTypes';
import { NOTIFICATION_STATUSES } from '../../utils/constants';

type Props = {
    isLoading: boolean;
    list: Array<Notification>;
    customerId: string;
    unseenNotifications: number;
    getNotifications: (customerId: string) => void;
    readNotification: (payload: actions.ReadCustomerNotificationsRequestAction['payload']) => void;
};

const CustomerNotifications = ({
    isLoading,
    list,
    customerId,
    unseenNotifications,
    getNotifications,
    readNotification,
}: Props) => {
    useEffect(() => {
        getNotifications(customerId);
    }, [getNotifications, customerId]);

    const getStatusIconNames = useCallback((status: string) => {
        switch (status) {
            case NOTIFICATION_STATUSES.MAJOR:
                return 'chevron-triple-up';
            case NOTIFICATION_STATUSES.MEDIUM:
                return 'chevron-double-up';
            case NOTIFICATION_STATUSES.MINOR:
                return 'chevron-up';
            default:
                return 'chevron-up';
        }
    }, []);

    const handleOpenNotification = useCallback(
        (notification: Notification) => () => {
            Alert.alert('Notification', notification.message, [
                {
                    text: 'OK',
                    onPress: () =>
                        readNotification({
                            customerId,
                            notificationId: notification._id,
                        }),
                },
            ]);
        },
        [readNotification, customerId],
    );

    return (
        <Container>
            <Header>
                <Text style={styles.header}>
                    Your Notifications
                    {unseenNotifications > 0 && (
                        <Badge>
                            <Text>{unseenNotifications}</Text>
                        </Badge>
                    )}
                </Text>
            </Header>
            <Content>
                {isLoading ? (
                    <Spinner color="blue" />
                ) : (
                    <List>
                        {list.map((notification) => (
                            <ListItem
                                key={notification._id}
                                style={styles.listItem}
                                onPress={handleOpenNotification(notification)}
                                button
                            >
                                <View style={styles.itemLeft}>
                                    <Icon
                                        type="MaterialCommunityIcons"
                                        name={getStatusIconNames(notification.status)}
                                        style={styles.iconNotification}
                                    />
                                </View>
                                <View style={styles.itemBody}>
                                    <Text style={notification.seen ? styles.infoMsgSeen : styles.infoMsgUnseen}>
                                        {notification.message}
                                    </Text>
                                    <Text style={styles.infoDate}>
                                        Date: {moment(notification.createdAt).format('ddd DD-MMM-YYYY, hh:mm A')}
                                    </Text>
                                </View>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    itemLeft: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    itemBody: {
        display: 'flex',
        flexDirection: 'column',
    },
    infoMsgSeen: {
        fontWeight: '400',
    },
    infoMsgUnseen: {
        fontWeight: 'bold',
    },
    infoDate: {
        marginTop: 10,
        textAlign: 'left',
        fontSize: 12,
        width: '100%',
    },
    iconNotification: {
        fontSize: 40,
        padding: 0,
        margin: 0,
        color: '#C41717',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 0,
        paddingRight: 80,
    },
});

const mapStateToProps = (state: IRootState) => ({
    isLoading: state.notifications.isLoading,
    list: state.notifications.list,
    unseenNotifications: state.notifications.unseenNotifications,
    customerId: state.auth._id,
});

export default connect(mapStateToProps, {
    getNotifications: createAction<actions.GetAllCustomerNotificationsRequestAction['payload']>(
        CUSTOMERS.NOTIFICATIONS.GET_ALL,
    ),
    readNotification: createAction<actions.ReadCustomerNotificationsRequestAction['payload']>(
        CUSTOMERS.NOTIFICATIONS.READ,
    ),
})(CustomerNotifications);
