type AuthReducer = {
    firstName: string;
    lastName: string;
    dob: string;
    type: string;
    isLoggedIn: boolean;
    isLoading: boolean;
};

type CustomersReducer = {
    list: Array<Customer>;
    isLoading: boolean;
    customer?: Customer;
};

interface IRootState {
    auth: AuthReducer;
    customers: CustomersReducer;
}
