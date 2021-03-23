type Customer = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    statuses: Array<CustomerStatuses>;
};

type CustomerStatuses = {
    _id: string;
    userId: string;
    isInfected: boolean;
    isHealthy: boolean;
    isVaccinated: boolean;
    isRecovered: boolean;
    isPossiblyInfected: boolean;
};
