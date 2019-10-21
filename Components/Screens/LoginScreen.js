import React from 'react';
import { StyleSheet, View, Alert, AsyncStorage, Image } from 'react-native';
// onPress={()=> AsyncStorage.setItem("user", JSON.stringify(this.userData) ) } asyncstoragemaggle

import {BlurView} from 'expo';

import { LinearGradient } from 'expo-linear-gradient';

import { Divider, Button, Text, Input } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPassword from './ForgotPasswordScreen';

import {connect} from 'react-redux';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
        LogInView: true,
        };
        // this.authHandle();
    }

    authHandle = async () => {
      const user = await AsyncStorage.getItem('user'); 

      this.props.navigation.navigate(user ? 'DrawNav' : 'AuthStack');
    }

  render() {
    //<Text style={{ fontFamily: 'roboto-bold', fontSize: 36, color: 'white', textAlign: 'center'}}>Ens'Immo</Text>

    var size = null;
    var sizeText = null;
    if(!this.state.LogInView){
      size = hp(20);
      sizeText = 20;
    } else {
      size = hp(25);
      sizeText = 22;
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
            <View>
                <View>

                    <View style={{height: hp(3)}} />

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Image 
                      source={require('../../assets/logo_name.png')}
                      style={{width: '100%', height: size, resizeMode: 'contain'}}
                      />
                    </View>

                    <View style={{height: hp(2)}} />
                    
                    <Text style={{ fontFamily: 'gochiHand-regular', fontSize: sizeText, color: '#b4c5e4', letterSpacing: 4, textAlign: 'center' }}>Ensemble et facilement</Text>
                    <Text style={{ fontFamily: 'gochiHand-regular', fontSize: sizeText, color: '#b4c5e4', letterSpacing: 4, textAlign: 'center' }}>gérez votre copropriété !</Text>

                    <View style={{height: hp(2)}} />

                    <View style={{backgroundColor: 'white'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Button 
                                title="Sign In" 
                                onPress={() => this.setState({LogInView: true})} 
                                buttonStyle={{borderRadius: 0}}
                                type="outline"
                                disabled={this.props.user.invited ? true : (this.state.LogInView ? true : false)}
                                />
                            </View>
                            <View style={{flex: 1}}>
                                <Button 
                                title="Sign up" 
                                onPress={() => this.setState({LogInView: false})} 
                                buttonStyle={{borderRadius: 0}}
                                type="outline"
                                disabled={this.state.LogInView ? false : true}
                                />
                            </View>
                        </View>
                    
                        {this.state.LogInView ? <SignInScreen /> : <SignUpScreen />}

                    </View>

                    <Divider style={{height:10, backgroundColor: '#2089dc'}}></Divider>
                    <View style={styles.separator} />
        
                </View>
            </View>
        </LinearGradient>     
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    marginVertical: 20,
  }
});

function mapStateToProps(state) {
  return { user: state.userData }
}

export default connect(mapStateToProps, null)(Login);