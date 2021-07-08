import React, { useCallback } from 'react';
import { StyleSheet, Linking, Alert } from 'react-native';
import { Container, Header, Content, ListItem, Text, List, Left, Right, Icon } from 'native-base';

const CustomerHelp = () => {
    const openUrl = useCallback(
        (url) => async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        },
        [],
    );
    return (
        <Container>
            <Header>
                <Text style={styles.header}>COVID-19 Frequently Asked Questions</Text>
            </Header>
            <Content>
                <List>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>What is COVID19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>What are the symptoms of COVID-19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>What happens to people who get COVID-19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl(
                            'https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19-how-is-it-transmitted',
                        )}
                    >
                        <Left>
                            <Text>How does COVID-19 spread between people?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>Who is most at risk of severe illness from COVID-19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>Are there treatments for COVID-19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>Are antibiotics effective in preventing or treating COVID-19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={openUrl('https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19')}
                    >
                        <Left>
                            <Text>Is there a vaccine for COVID-19?</Text>
                        </Left>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
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
    statusTitle: {
        marginTop: 20,
    },
});

export default CustomerHelp;
