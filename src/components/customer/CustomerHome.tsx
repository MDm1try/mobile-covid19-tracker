import * as React from 'react';
import { View, Text } from 'react-native';

type Props = {};

const CustomerHome = (props: Props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
        </View>
    );
};

export default CustomerHome;
