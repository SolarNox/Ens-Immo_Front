import React from 'react';

import * as Font from 'expo-font';

import { AppLoading } from 'expo';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import userData from './Reducers/user.reducer';
import coproData from './Reducers/copro.reducer';

const store = createStore(combineReducers({userData, coproData}));

import Navigation from './Components/Navigation/Navigation';

import { useScreens } from 'react-native-screens';
useScreens();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'gochiHand-regular': require('./assets/fonts/GochiHand-Regular.ttf'),
    });

    this.setState({ isReady: true });

  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }   
}