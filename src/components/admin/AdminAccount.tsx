import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, ListItem, Text, Left, Body } from 'native-base';

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    type: string;
};

const AdminAccount = (props: Props) => {
    const { firstName, lastName, dob, type, email } = props;
    return (
        <Container>
            <Header>
                <Text style={styles.header}>My Account </Text>
            </Header>
            <Content>
                <ListItem>
                    <Left>
                        <Text> First Name:</Text>
                    </Left>
                    <Body>
                        <Text>{firstName}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Last Name:</Text>
                    </Left>
                    <Body>
                        <Text>{lastName}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Date Of Birth:</Text>
                    </Left>
                    <Body>
                        <Text>{dob}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Email:</Text>
                    </Left>
                    <Body>
                        <Text>{email}</Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text> Role:</Text>
                    </Left>
                    <Body>
                        <Text>{type === 'admin' ? 'Health services managers' : 'Customer'}</Text>
                    </Body>
                </ListItem>
            </Content>
        </Container>
    );
};

const mapStateToProps = (state: IRootState) => ({
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    dob: state.auth.dob,
    email: state.auth.email,
    type: state.auth.type,
});

const styles = StyleSheet.create({
    header: {
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});

export default connect(mapStateToProps)(AdminAccount);
