import React, { Component } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { withNavigation } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

class NavigationDrawerStructure extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          {/*Donute Button Image */}
          <Ionicons name="ios-menu" size={30} style={{ width: 30, height: 30, marginLeft: 5 }}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(NavigationDrawerStructure);