import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, AsyncStorage, Keyboard } from 'react-native';

import { Divider, Button, Text, Input, Overlay } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import ipAdress from '../../config';

import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {connect} from 'react-redux';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            mail: '',
            pwd: '',
            displayError: null,
            error: null  
        };
    }

    validMe = () => {
        var ctx = this;
        fetch(`${ipAdress}/signin?email=${this.state.mail}&password=${this.state.pwd}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.result === true) {
                ctx.props.handleUserValid(data.users[0].lastName, data.users[0].firstName, data.users[0].email, data.users[0].telephone, data.users[0].token);
                AsyncStorage.setItem("user", JSON.stringify({lastName: data.users[0].lastName, firstName: data.users[0].firstName, email: data.users[0].email, token: data.users[0].token}))
                ctx.getCoproFromBdd(data.users[0].copro[0]);
                ctx.props.navigation.navigate('DrawNav');
            } else if (!data.result) {
                ctx.setState({
                    displayError: true
                })
            } else {
                ctx.setState({
                    displayError: data.result
                })
            }
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    };

    getCoproFromBdd = (valueIdUser) => {

        var ctx = this;

        fetch(`${ipAdress}/copro?token=${this.props.user.token}&id=${valueIdUser}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.props.handleCoproValid(data.copros._id, data.copros.nomCopro, data.copros.mail, data.copros.numeroTel, data.copros.tokenPrez, data.copros.conseilSyndical ,data.copros.syndicUsers);
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    checkUpBeforeLaunch = () => {
        this.setState({error: null})
        if(this.state.mail === '' || this.state.pwd === ''){
            this.setState({error: "Veuillez remplir tous les champs"})
        } else {
            this.setState({error: null})
            this.validMe();
        }
    }

  render() {

    const mail = React.createRef();
    const pwd = React.createRef();

    var errorMsg = null;
    if(this.state.displayError === true) {
      errorMsg = <Text style={{color: 'red', textAlign: 'center'}}>Votre email est introuvable, veuillez créer un compte !</Text>
    } else {
      errorMsg = <Text style={{color: 'red', textAlign: 'center'}}>{this.state.displayError}</Text>
    }
    // RAJOUTER UN FADE OUT SUR LE MESSAGE D'ERREUR !!!!!!!!!!!!

    var error = null;
    if(this.state.error){
        error = <Text style={{textAlign: "center", color: 'red'}}>{this.state.error}</Text>
    }

    return (
    <KeyboardAvoidingView behavior='padding' enabled>
        <View style={{backgroundColor: '#b4c5e4', padding: 20, opacity: 0.8}}>
            <View style={{backgroundColor: 'white', borderRadius: 50, elevation: 1}}>
                <Input
                placeholder='E-mail'
                inputContainerStyle={{borderBottomWidth: 0}}
                leftIconContainerStyle={{marginLeft: 0}}
                leftIcon={
                    <FontAwesome
                    name='user-circle'
                    size={24}
                    color='black'
                    onPress={() => mail.current.focus()}
                    />
                }
                errorStyle={{ color: 'red' }}
                onChangeText={(value) => this.setState({mail: value})} value={this.state.mail}
                inputStyle={{paddingLeft: 10}}
                ref={mail}
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType='next'
                onSubmitEditing={() => pwd.current.focus()}
                />
            </View>

            <View style={{height: 10}}></View>

            <View style={{backgroundColor: 'white', borderRadius: 50, elevation: 1}}>
                <Input
                placeholder='Mot de passe'
                inputContainerStyle={{borderBottomWidth: 0}}
                leftIconContainerStyle={{marginLeft: 0}}
                leftIcon={
                    <MaterialCommunityIcons
                    name='lock-outline'
                    size={24}
                    color='black'
                    onPress={() => pwd.current.focus()}
                    />
                }
                onChangeText={(value) => this.setState({pwd: value})} value={this.state.pwd}
                inputStyle={{paddingLeft: 10}}
                ref={pwd}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType='done'
                onSubmitEditing={this.checkUpBeforeLaunch}
                />
            </View>
            {error}
            {errorMsg}
            <View style={{height: 10}}></View>
            
            <View style={{width:'50%', alignSelf:'center'}}>
                <Button 
                title="Connexion "
                buttonStyle={{borderRadius: 50}}
                onPress={this.checkUpBeforeLaunch}
                />
            </View>

            <View style={{height: hp(1)}} />

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
                <Text style={{color: 'grey', textAlign: 'center'}}>Mot de passe oublié ?</Text>
            </TouchableOpacity>            
            
        </View>
    </KeyboardAvoidingView>
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

function mapDispatchToProps(dispatch) {
    return {
        handleUserValid: function(nameUser, firstNameUser, emailUser, telUser, tokenUser) {
            dispatch( {
                type: 'setUserData',
                name: nameUser,
                firstName: firstNameUser,
                email: emailUser,
                tel: telUser,
                token: tokenUser
            } )
        },
        handleCoproValid: function(idCopro, nameCopro, emailCopro, telCopro, tokenPrezCopro, conseilSyndicalUsersCopro, usersCopro) {
            dispatch({
                type: 'setCoproData',
                _id: idCopro,
                name: nameCopro,
                email: emailCopro,
                tel: telCopro,
                tokenPrez: tokenPrezCopro,
                conseilSyndicalUsers: conseilSyndicalUsersCopro,
                usersCopro: usersCopro
            })
        }
    }
}

function mapStateToProps(state) {
    return { user: state.userData }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignIn));

// export default withNavigation(SignIn);