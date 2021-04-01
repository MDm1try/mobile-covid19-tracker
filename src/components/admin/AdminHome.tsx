import * as React from 'react';
import { Container, Header, Tab, Tabs, Text, TabHeading, Icon } from 'native-base';
import { StyleSheet } from 'react-native';

import AdminListTab from './AdminListTab';
import AdminMapTab from './AdminMapTab';

const AdminHome = () => {
    return (
        <Container>
            <Header hasTabs>
                <Text style={styles.header}>COVID-19 Public Places</Text>
            </Header>
            <Tabs>
                <Tab
                    heading={
                        <TabHeading>
                            <Icon name="map-outline" />
                            <Text>Map</Text>
                        </TabHeading>
                    }
                >
                    <AdminMapTab />
                </Tab>
                <Tab
                    heading={
                        <TabHeading>
                            <Icon name="list-outline" />
                            <Text>List</Text>
                        </TabHeading>
                    }
                >
                    <AdminListTab />
                </Tab>
            </Tabs>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AdminHome;
