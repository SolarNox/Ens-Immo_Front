import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

// import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class MesContacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          text: 'Loading contacts...',
        };
    }
     
    async showFirstContactAsync() {
      const contacts = await Contacts.getContactsAsync();
      console.log(contacts)
      if (contacts.length > 0) {
        let contact = `Name: ${contacts[0].name}\n` +
          `Phone: ${JSON.stringify(contacts[0].phoneNumbers)}\n`;
          
        this.setState({text: contact});
      }
    }

    componentDidMount() {
      setTimeout(() => this.showFirstContactAsync(), 1);
    }

    render() {
        return (
            <View>
                <Button title='Get contacts' onPress={this.showFirstContactAsync} />
                <Text>{this.state.text}</Text>
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      justifyContent: 'center'
    },
    separator: {
      marginVertical: 20,
    }
  });