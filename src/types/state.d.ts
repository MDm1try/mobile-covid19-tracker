type AuthReducer = {
    _id: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    type: string;
    isLoggedIn: boolean;
    isLoading: boolean;
};

type CustomersReducer = {
    list: Array<Customer>;
    isLoading: boolean;
    lastCustomerStatus?: CustomerStatuses;
};

type NotificationsReducer = {
    list: Array<Notification>;
    unseenNotifications: number;
    isLoading: boolean;
};

type LocationsReducer = {
    list: Array<Location>;
    isLoading: boolean;
    location?: Location;
};

interface IRootState {
    auth: AuthReducer;
    customers: CustomersReducer;
    locations: LocationsReducer;
    notifications: NotificationsReducer;
}
