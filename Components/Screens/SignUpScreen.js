import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, AsyncStorage, ActionSheetIOS, Keyboard } from 'react-native';

import { Divider, Button, Text, Input, Overlay } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import ipAdress from '../../config';

import {connect} from 'react-redux';

import { withNavigation } from 'react-navigation';

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            nom: '',
            prenom: '',
            mailsignup: '',
            pwd: '',
            confirmpwd: '',
            messageVide: false,
            errorInvit: null,
            overlayVisible: false,
            inputValue: '',
            displayError: null,
            error: null
        };
    }

    createMe = () => {
        var ctx = this;

        ctx.setState({displayError: null})

        fetch(`${ipAdress}/signup`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `prenom=${this.state.prenom}&nom=${this.state.nom}&email=${this.setEmailToSend()}&password=${this.state.pwd}`
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data.result){
                ctx.props.handleUserValid(data.users.lastName, data.users.firstName, data.users.email, data.users.telephone, data.users.token);
                ctx.props.navigation.navigate('CreaCopro', {isInvited: ctx.props.user.invited});    
            } else {
                ctx.setState({displayError: data.error})
            }
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    retriveInvitation = () => {

        var ctx = this;

        this.setState({mailsignup: this.props.user.email})

        if(this.state.inputValue == ''){
            ctx.setState({messageVide: true, errorInvit: null})
        } else if(this.state.pwd !== this.state.confirmpwd ){
            ctx.setState({errorInvit: 'Les deux mots de passe sont différents'}) // ici
        } else {

            fetch(`${ipAdress}/users/retriveInvite?invitCode=${this.state.inputValue}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if(data.result === true){
                    ctx.setState({overlayVisible: false})
                    ctx.props.handleInviteValid(data.mail, data.coproId);
                    ctx.props.navigation.navigate('SignUpStack')
                } else if(data.result === false) {
                    ctx.setState({errorInvit: data.error, inputValue: ''})
                }
            })
            .catch(function(error) {
                console.log('Request failed', error)
            });
        }
    }

    setEmailToSend = () => {

        var emailToSend = '';
        if(this.props.user.invited){
            return emailToSend = this.props.user.email;
        } else {
            return emailToSend = this.state.mailsignup;
        }
    }

    checkUpBeforeLaunch = () => {
        this.setState({error: null, displayError: null})
        if(this.state.nom === '' || this.state.prenom === '' || this.state.mailsignup === '' || this.state.pwd === '' || this.state.confirmpwd === '' ){
            this.setState({error: "Veuillez remplir tous les champs"})
        } else if (this.props.user.invited){
            this.retriveInvitation();
        } else {
            if(this.state.pwd !== this.state.confirmpwd){
                this.setState({error: 'Les deux mots de passe sont différents'})
            } else {
                this.setState({error: null})
                this.createMe();
            }        
        }
    }

  render() {

    const nom = React.createRef();
    const prenom = React.createRef();
    const mailForSignUp = React.createRef();
    const pwdForSignUp = React.createRef();
    const pwdForSignUpConfirmation = React.createRef();

    var errorInvit;
    if(this.state.messageVide === true){
        errorInvit = (<Text style={{textAlign: 'center', color: 'red'}}>Votre saisie est vide</Text>)
    }
    if(this.state.errorInvit !== null){
        errorInvit = (<Text style={{textAlign: 'center', color: 'red'}}>{this.state.errorInvit}</Text>)
    }

    var error = null;
    if(this.state.displayError){
        error = <Text style={{textAlign: "center", color: 'red'}}>{this.state.displayError}</Text>
    }

    var displayError = null;
    if(this.state.error){
        displayError = <Text style={{textAlign: "center", color: 'red'}}>{this.state.error}</Text>
    }

    return (
    <KeyboardAvoidingView behavior="padding" enabled>
    <View style={{backgroundColor: '#b4c5e4', padding: 20, flexDirection: 'column'}}>
        <View style={{backgroundColor: 'white', borderRadius: 50, elevation: 1}}>
            <Input
            placeholder='Nom'
            inputContainerStyle={{borderBottomWidth: 0}}
            leftIconContainerStyle={{marginLeft: 0}}
            leftIcon={
                <FontAwesome
                name='user-circle'
                size={24}
                color='black'
                onPress={() => nom.current.focus()}
                />
            }
            errorStyle={{ color: 'red' }}
            onChangeText={(value) => this.setState({nom: value})} value={this.state.nom}
            inputStyle={{paddingLeft: 10}}
            ref={nom}
            returnKeyType='next'
            onSubmitEditing={() => prenom.current.focus()}
            />
        </View>

        <View style={{height: 10}}></View>

        <View style={{backgroundColor: 'white', borderRadius: 50, elevation: 1}}>
            <Input
            placeholder='Prénom'
            inputContainerStyle={{borderBottomWidth: 0}}
            leftIconContainerStyle={{marginLeft: 0}}
            leftIcon={
                <FontAwesome
                name='user-circle-o'
                size={24}
                color='black'
                onPress={() => prenom.current.focus()}
                />
            }
            errorStyle={{ color: 'red' }}
            onChangeText={(value) => this.setState({prenom: value})} value={this.state.prenom}
            inputStyle={{paddingLeft: 10}}
            ref={prenom}
            returnKeyType='next'
            onSubmitEditing={() => mailForSignUp.current.focus()}
            />
        </View>

        <View style={{height: 10}}></View>

        <View style={{backgroundColor: 'white', borderRadius: 50, elevation: 1}}>
            <Input
            placeholder='E-mail'
            value={this.props.user.email ? this.props.user.email : this.state.mailsignup}
            editable={this.props.user.email ? false : true}
            inputContainerStyle={{borderBottomWidth: 0}}
            leftIconContainerStyle={{marginLeft: 0}}
            leftIcon={
                <FontAwesome
                name='at'
                size={24}
                color='black'
                onPress={() => mailForSignUp.current.focus()}
                />
            }
            errorStyle={{ color: 'red' }}
            onChangeText={this.props.user.email ? null : (value) => this.setState({mailsignup: value})}
            inputStyle={{paddingLeft: 10}}
            ref={mailForSignUp}
            keyboardType='email-address'
            autoCorrect={false}
            returnKeyType='next'
            onSubmitEditing={() => pwdForSignUp.current.focus()}
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
                onPress={() => pwdForSignUp.current.focus()}
                />
            }
            errorStyle={{ color: 'red' }}
            onChangeText={(value) => this.setState({pwd: value})} value={this.state.pwd}
            inputStyle={{paddingLeft: 10}}
            ref={pwdForSignUp}
            secureTextEntry={true}
            returnKeyType='next'
            onSubmitEditing={() => pwdForSignUpConfirmation.current.focus()}
            />
        </View>

        <View style={{height: 10}}></View>

        <View style={{backgroundColor: 'white', borderRadius: 50, elevation: 1}}>
            <Input
            placeholder='Confirmation du mot de passe'
            inputContainerStyle={{borderBottomWidth: 0}}
            leftIconContainerStyle={{marginLeft: 0}}
            leftIcon={
                <MaterialCommunityIcons
                name='lock-outline'
                size={24}
                color='black'
                onPress={() => pwdForSignUpConfirmation.current.focus()}
                />
            }
            errorStyle={{ color: 'red' }}
            onChangeText={(value) => this.setState({confirmpwd: value})} value={this.state.confirmpwd}
            inputStyle={{paddingLeft: 10}}
            ref={pwdForSignUpConfirmation}
            secureTextEntry={true}
            returnKeyType='done'
            onSubmitEditing={this.checkUpBeforeLaunch}
            />
        </View>

        <View style={{height: 10}}></View>

        {error}
        {displayError}

        <View style={{height: 10}}></View>
        
        <View style={{width:'50%', alignSelf:'center'}}>
            <Button 
            title="Inscription"
            buttonStyle={{borderRadius: 50}}
            onPress={this.checkUpBeforeLaunch}
            />
        </View>

        <View style={{height: hp(1)}} />

        <View>
            <TouchableOpacity onPress={() => this.setState({overlayVisible: true})}>
                <Text style={{color: 'grey', textAlign: 'center'}}>Avez-vous reçu une invitation ?</Text>
            </TouchableOpacity>
        </View>
        <Overlay
        isVisible={this.state.overlayVisible}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="white"
        
        animationType='fade'
        onBackdropPress={() => this.setState({ overlayVisible: !this.state.overlayVisible, errorInvit: null, messageVide: false })}
        >
            <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Quel est votre code invitation ?</Text>
                <Input
                inputStyle={{textAlign: 'center', fontSize: 18}}
                placeholder={this.state.fieldValue}
                onChangeText={(value) => this.setState({inputValue: value})} value={this.state.inputValue}
                returnKeyType='done'
                onSubmitEditing={Keyboard.dismiss}
                autoFocus={true}
                />
                {errorInvit}
                <Button 
                title="Valider"
                buttonStyle={{borderRadius: 20}}
                onPress={this.retriveInvitation}
                />
            </View> 
        </Overlay>
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

function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

function mapDispatchToProps(dispatch) {
    return {
        handleUserValid: function(nameUser, firstNameUser, emailUser, telUser, tokenUser) {
            dispatch({
                type: 'setUserData',
                name: nameUser,
                firstName: firstNameUser,
                email: emailUser,
                tel: telUser,
                token: tokenUser
            })
        },
        handleInviteValid: function(emailUser, coproIdUser) {
            dispatch({
                type: 'inviteUserData',
                email: emailUser,
                coproId: coproIdUser
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignUp));
   
// export default withNavigation(SignUp);