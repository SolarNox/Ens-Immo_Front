import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Divider, Button, Text, Input, CheckBox  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import ipAdress from '../../config';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import { withNavigation } from 'react-navigation';

class SetHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choice: true,
            numeroRue: '',
            rue: '',
            codePostal: '',
            ville: '',
            numeroImmeuble: '',
            numeroAppartement: '',
            etageAppartement: '',
            numeroParking: '',
            numeroCave: '',
            codeImmeuble: '',
            codeImmeubleSecondaire: '',
            codeAccesLogement: '',
        };
    }

    createMe = () => {

        var ctx = this;

        fetch(`${ipAdress}/addhouse`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `numeroRue=${this.state.numeroRue}&rue=${this.state.rue}&codePostal=${this.state.codePostal}&ville=${this.state.ville}&numeroImmeuble=${this.state.numeroImmeuble}&numeroAppartement=${this.state.numeroAppartement}&etageAppartement=${this.state.etageAppartement}&numeroParking=${this.state.numeroParking}&numeroCave=${this.state.numeroCave}&codeImmeuble=${this.state.codeImmeuble}&codeImmeubleSecondaire=${this.state.codeImmeubleSecondaire}&codeAccesLogement=${this.state.codeAccesLogement}&tokens=${this.props.user.token}&proprioOuLoc=${this.state.choice}`
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.props.handleImmoValid(true);
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    render() {

        const numeroRue = React.createRef();
        const rue = React.createRef();
        const codePostal = React.createRef();
        const ville = React.createRef();
        const numeroImmeuble = React.createRef();
        const numeroAppartement = React.createRef();
        const etageAppartement = React.createRef();
        const numeroParking = React.createRef();
        const numeroCave = React.createRef();
        const codeImmeuble = React.createRef();
        const codeImmeubleSecondaire = React.createRef();
        const codeAccesLogement = React.createRef();

        return (
            <View>
                <Text h4 style={{textAlign: 'center'}}>Votre adresse :</Text>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder='Numéro de votre rue'
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialCommunityIcons
                        name='numeric'
                        size={24}
                        color='black'
                        onPress={() => numeroRue.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={numeroRue}
                    onChangeText={(value) => this.setState({numeroRue: value})} value={this.state.numeroRue}
                    inputStyle={{paddingLeft: 10}}
                    keyboardType='numeric'
                    returnKeyType='next'
                    onSubmitEditing={() => rue.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder='Libellé de votre rue'
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialIcons
                        name='home'
                        size={24}
                        color='black'
                        onPress={() => rue.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={rue}
                    onChangeText={(value) => this.setState({rue: value})} value={this.state.rue}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => codeImmeuble.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="Code de l'immeuble"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialCommunityIcons
                        name='lock-smart'
                        size={24}
                        color='black'
                        onPress={() => codeImmeuble.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={codeImmeuble}
                    onChangeText={(value) => this.setState({codeImmeuble: value})} value={this.state.codeImmeuble}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => codeImmeubleSecondaire.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="Code de l'immeuble secondaire (facultatif)"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialCommunityIcons
                        name='lock-smart'
                        size={24}
                        color='black'
                        onPress={() => codeImmeubleSecondaire.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={codeImmeubleSecondaire}
                    onChangeText={(value) => this.setState({codeImmeubleSecondaire: value})} value={this.state.codeImmeubleSecondaire}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => codeAccesLogement.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="Code d'accès à votre logement"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialCommunityIcons
                        name='home-lock'
                        size={24}
                        color='black'
                        onPress={() => codeAccesLogement.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={codeAccesLogement}
                    onChangeText={(value) => this.setState({codeAccesLogement: value})} value={this.state.codeAccesLogement}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => codePostal.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder='Votre Code Postal'
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialIcons
                        name='location-city'
                        size={24}
                        color='black'
                        onPress={() => codePostal.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={codePostal}
                    onChangeText={(value) => this.setState({codePostal: value})} value={this.state.codePostal}
                    inputStyle={{paddingLeft: 10}}
                    keyboardType='numeric'
                    returnKeyType='next'
                    onSubmitEditing={() => ville.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder='Votre ville'
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialIcons
                        name='location-city'
                        size={24}
                        color='black'
                        onPress={() => ville.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={ville}
                    onChangeText={(value) => this.setState({ville: value})} value={this.state.ville}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => numeroImmeuble.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="N° de l'immeuble (Optionnel)"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <FontAwesome
                        name='sort-numeric-desc'
                        size={24}
                        color='black'
                        onPress={() => numeroImmeuble.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={numeroImmeuble}
                    onChangeText={(value) => this.setState({numeroImmeuble: value})} value={this.state.numeroImmeuble}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => numeroAppartement.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="N° de l'appartement"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <FontAwesome
                        name='sort-numeric-asc'
                        size={24}
                        color='black'
                        onPress={() => numeroAppartement.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={numeroAppartement}
                    onChangeText={(value) => this.setState({numeroAppartement: value})} value={this.state.numeroAppartement}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => etageAppartement.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="Étage de l'appartement"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialCommunityIcons
                        name='numeric'
                        size={24}
                        color='black'
                        onPress={() => etageAppartement.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={etageAppartement}
                    onChangeText={(value) => this.setState({etageAppartement: value})} value={this.state.etageAppartement}
                    inputStyle={{paddingLeft: 10}}
                    keyboardType='numeric'
                    returnKeyType='next'
                    onSubmitEditing={() => numeroParking.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="N° de la place de parking (Optionnel)"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <MaterialIcons
                        name='local-parking'
                        size={24}
                        color='black'
                        onPress={() => numeroParking.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={numeroParking}
                    onChangeText={(value) => this.setState({numeroParking: value})} value={this.state.numeroParking}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='next'
                    onSubmitEditing={() => numeroCave.current.focus()}
                    />
                </View>

                <View style={{height: 10}}></View>

                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                    <Input
                    placeholder="N° de la cave (Optionnel)"
                    leftIconContainerStyle={{marginLeft: 0}}
                    leftIcon={
                        <Feather
                        name='box'
                        size={24}
                        color='black'
                        onPress={() => numeroCave.current.focus()}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    ref={numeroCave}
                    onChangeText={(value) => this.setState({numeroCave: value})} value={this.state.numeroCave}
                    inputStyle={{paddingLeft: 10}}
                    returnKeyType='done'
                    onSubmitEditing={Keyboard.dismiss}
                    />
                </View>

                <View style={{height: 10}}></View>
                <View style={{height: 10}}></View>

                <Text style={{textAlign: 'center'}}>Êtes-vous le propriétaire ?</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>   
                    <CheckBox
                    center
                    title='Oui'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.choice}
                    onPress={() => this.setState({choice: !this.state.choice})}
                    />
                    <CheckBox
                    center
                    title='Non'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={!this.state.choice}
                    onPress={() => this.setState({choice: !this.state.choice})}
                    />
                </View>       

                <View style={{width:'50%', alignSelf:'center'}}>
                    <Button 
                    title="Validation"
                    buttonStyle={{borderRadius: 50}}
                    onPress={this.createMe}
                    />
                </View>

                <View style={{height: 10}}></View>
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
    separator: {
      marginVertical: 20,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        handleImmoValid: function(trueOrFalse) {
            dispatch( {
                type: 'updateImmoData',
                setHouseDone: trueOrFalse
            } )
        }
    }
}

function mapStateToProps(state) {
    return { user: state.userData }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SetHouse));