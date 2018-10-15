import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, AsyncStorage, Image, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    productBox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 40,
        marginVertical: 3,
        width: Dimensions.get('window').width * 0.98,
        justifyContent: "space-around",
        backgroundColor: '#ebf9ff'
    }
});
const server = 'http://192.168.20.33:8000/';
export default class Basket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {}
        }

    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.data);
        this.setState({ items: [this.props.navigation.state.params.data] });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => { this.props.navigation.navigate('Home') }} title='Back' />
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) =>
                        <View style={styles.productBox}>
                            <View style={{ flex: 1, marginRight: 3 }}>
                                <Text style={{ textAlign: 'right' }}>{item.name}</Text>
                                <Text style={{ textAlign: 'right', fontSize: 10 }}>
                                    قیمت :
                  {item.price}
                                    تومان
                </Text>
                            </View>
                            <Image style={{ width: 48, height: 48 }} source={{ uri: server + item.thumb }} />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}