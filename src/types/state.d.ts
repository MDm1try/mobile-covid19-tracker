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

type StatisticsReducer = {
    countInfectedCustomers: number;
    countHealthyCustomers: number;
    countVaccinatedCustomers: number;
    countRecoveredCustomers: number;
    countPossiblyInfectedCustomers: number;
    countLocations: number;
    isLoading: boolean;
};

interface IRootState {
    auth: AuthReducer;
    customers: CustomersReducer;
    locations: LocationsReducer;
    notifications: NotificationsReducer;
    statistics: StatisticsReducer;
}
