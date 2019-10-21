import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Divider, Button, Text, Input, CheckBox  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import ipAdress from '../../config';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';

import SetImmo from './SetImmoScreen';
import SetHouse from './SetHouseScreen';

import {connect} from 'react-redux';

class CreaCopro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           checked: true
        };
    }

    render() {

        var displayOrNot = null;

        if(this.props.user.setHouseDone){
            displayOrNot = styles.getOut
        }

        return (
            <View style={styles.container}>
                <LinearGradient
                colors={['#4776e6', '#8e54e9']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.2,1]}
                >
                    <View style={{position: 'absolute', top: 15, left: 15, zIndex: 100 }}>
                        <MaterialIcons 
                        name='keyboard-backspace'
                        size={24}
                        color='black'
                        onPress={() => this.props.navigation.navigate('Login')}
                        />
                    </View>
                    
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Image 
                      source={require('../../assets/logo.png')}
                      style={{width: hp(20), height: hp(20), resizeMode: 'contain'}}
                      />
                    </View>

                    <View style={{ flex: 1, alignItems: 'center'}}>
                        <KeyboardAvoidingView behavior='padding' enabled>
                            <ScrollView style={{backgroundColor: 'white', width: wp(80), height: '100%'}}>

                                {this.props.user.setHouseDone ? null : <SetHouse />}
                                <Divider style={{height:10, backgroundColor: '#3498db'}}></Divider>
                                {this.props.user.setHouseDone ? <SetImmo invitedOrNot={JSON.stringify(this.props.navigation.getParam('isInvited', null))} /> : null }
                                
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      justifyContent: 'center'
    },
    getOut: {
        display: 'none'
    },
    triangleUp: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: wp(50),
        borderRightWidth: wp(50),
        borderBottomWidth: hp(10),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#e74c3c'
    },
    separator: {
      marginVertical: 20,
    }
});


function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

export default connect(mapStateToProps, null)(CreaCopro);