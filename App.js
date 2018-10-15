import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Home from './screens/Home';
import Basket from './screens/Basket';

const RootStack = createSwitchNavigator({
  Home: { screen: Home },
  Basket: { screen: Basket },
}, { initialRouteName: 'Home' }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}