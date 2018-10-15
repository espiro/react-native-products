import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableHighlight, AsyncStorage, Button, Modal } from 'react-native';

import Basket from '../screens/Basket';

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

class RenderBasket extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ position: 'absolute', top: 50 }}>
                {
                    (Object.values(this.props.ProductsInBasket).length != 0) ?
                        <FlatList
                            data={this.props.ProductsInBasket}
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
                            keyExtractor={(Product, index) => index.toString()}
                        />
                        :
                        <Text>Empty Basket</Text>
                }
            </View>
        );
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            modalVisible: false,
            basket: {},
            countBasketItems: 0
        }

    }

    fetchData = () => {
        fetch(server + 'data.php')
            .then((response) => {
                return response.json();
            }).then((response) => {
                this.setState({ data: response });
            }).catch((error) => {
                console.log(error);
            })
    }

    _addToBasket = (item) => {
        if (Object.values(this.state.basket).length == 0) {
            this.setState({ basket: [item], countBasketItems: this.state.countBasketItems + 1 });
        }

        let idis = [];
        Object.values(this.state.basket).map((basketItem) => {
            for (var key in basketItem) {
                idis.push(basketItem['id']);
            }
        });

        if (idis.indexOf(item.id) == -1) {
            //add to basket
            this.setState({ basket: Object.values(this.state.basket).concat(item), countBasketItems: this.state.countBasketItems + 1 });
        } else {
            //item already exists in basket
            alert('این کالا در سبد خرید شما می باشد.');
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Button onPress={() => { this.props.navigation.navigate('Basket', { data: this.state.basket }) }} title='Basket' /> */}
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={{ color: '#FFF', borderRadius: 10, backgroundColor: '#05a5d1', margin: 10, paddingHorizontal: 10, paddingVertical: 5 }}>{this.state.countBasketItems}</Text>
                    <Button onPress={() => { this.setState({ modalVisible: true }) }} title='مشاهده سبد خرید' />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Text style={{ width: Dimensions.get('window').width, padding: 10, backgroundColor: '#05a5d1', color: '#fff', textAlign: 'center', position: 'absolute', top: 10 }}>Your Basket</Text>

                        <RenderBasket ProductsInBasket={this.state.basket} />

                        <TouchableHighlight
                            style={{ width: Dimensions.get('window').width / 2, padding: 10, backgroundColor: '#05a5d1', position: 'absolute', bottom: 10 }}
                            onPress={() => { this.setState({ modalVisible: false }) }}>
                            <Text style={{ textAlign: 'center', color: '#fff' }}>Close</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={styles.productBox}>
                            <View style={{ flex: 1, marginRight: 3 }}>
                                <Text style={{ textAlign: 'right' }}>{item.name}</Text>
                                <Text style={{ textAlign: 'right', fontSize: 10 }}>
                                    قیمت :
                  {item.price}
                                    تومان
                </Text>
                                <Text style={{ textAlign: 'right', fontSize: 10 }}>
                                    موجودی :
                {item.qty}
                                </Text>
                                <TouchableHighlight
                                    style={{ padding: 3, backgroundColor: 'white', width: 100, borderRadius: 8, backgroundColor: '#05a5d1' }}
                                    onPress={() => this._addToBasket(item)}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white', padding: 4 }}>
                                        افزودن به سبد خرید
                  </Text>
                                </TouchableHighlight>
                            </View>
                            <Image style={{ width: 48, height: 48 }} source={{ uri: server + item.thumb }} />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}