import React from 'react';
import { StyleSheet, View, Picker, ImageBackground } from 'react-native';

import { Divider, Button, Text, Input } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import ipAdress from '../../config';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            choice: '',
            question: '',
            answer: '',
            displayError: null,
            rightEmail: false,
        };
    }

    retriveMe = () => {
        var ctx = this;
        fetch(`${ipAdress}/retrivepassword?email=${this.state.mail}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.result === true) {
                //ctx.props.navigation.navigate('DrawNav');
            } else {
                ctx.setState({
                    displayError: data.result
                })
            }
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }


    //pas fini
    answerMe = () => {
        var ctx = this;
        fetch(`${ipAdress}/recoverpassword?password=${this.state.pwd}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.result === true) {
                //ctx.props.navigation.navigate('DrawNav');
            } else {
                ctx.setState({
                    displayError: data.result
                })
            }
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    render() {

        const mail = React.createRef();
        const question = React.createRef();
        const answer = React.createRef();

        var errorMsg = null;
        if (this.state.displayError !== null) {
            errorMsg = <Text style={{color: 'red', textAlign: 'center'}}>{this.state.displayError}</Text>
        }

        var questionPerso = null;
        if(this.state.choice === 'Autres..'){
            questionPerso = <View style={{backgroundColor: 'white', borderRadius: 50}}>
                                <Input
                                placeholder='Question secrete'
                                leftIconContainerStyle={{marginLeft: 0}}
                                leftIcon={
                                    <FontAwesome
                                    name='question-circle'
                                    size={24}
                                    color='black'
                                    onPress={() => question.current.focus()}
                                    />
                                }
                                errorStyle={{ color: 'red' }}
                                onChangeText={(value) => this.setState({question: value})} value={this.state.question}
                                inputStyle={{paddingLeft: 10}}
                                ref={question}
                                />
                            </View>
        }

        return (
        <View style={{flex: 1, backgroundColor: 'lightgrey', justifyContent: 'center'}}>
            <ImageBackground source={require('../../assets/Cornered-Stairs.png')} style={{width: '100%', height: hp(100), resizeMode: 'contain'}}>
                <View style={{paddingHorizontal: wp(5), paddingTop: hp(20)}}>
                    <Text h2 style={{textAlign: 'center', color: '#272838'}}>Réinitialisation de votre mot de passe</Text>

                    <View style={{height: 20}}></View>
                    
                    <View style={{backgroundColor: 'white', borderRadius: 50}}>
                        <Input
                        placeholder='E-mail'
                        leftIconContainerStyle={{marginLeft: 0}}
                        leftIcon={
                            <FontAwesome
                            name='at'
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
                        returnKeyType='next'
                        />
                    </View>

                    <View style={{height: 20}}></View>

                    <View style={{backgroundColor: 'white', borderRadius: 50}}>
                        <Picker
                        prompt='Questions secrètes'
                        selectedValue={this.state.choice}
                        style={{height: 40, width: '100%'}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({choice: itemValue})
                        }>
                            <Picker.Item label="Quel est le nom de mon premier animal domestique ?" value="Quel est le nom de mon premier animal domestique ?" />
                            <Picker.Item label="Quel est le modèle de ma première voiture ?" value="Quel est le modèle de ma première voiture ?" />
                            <Picker.Item label="Quel est le nom de jeune fille de votre mère ?" value="Quel est le nom de jeune fille de votre mère ?" />
                            <Picker.Item label="Quel est votre repas préféré ?" value="Quel est votre repas préféré ?" />
                            <Picker.Item label="Quel est votre pays favori ?" value="Quel est votre pays favori ?" />
                            <Picker.Item label="Quel est le poste que je détesterais le plus occupé ?" value="Quel est le poste que je détesterais le plus occupé ?" />
                            <Picker.Item label="Quelle est la marque de la première voiture que j'ai rêvé de posséder ?" value="6Quelle est la marque de la première voiture que j'ai rêvé de posséder ?" />
                            <Picker.Item label="Quelle est votre couleur préférée ?" value="Quelle est votre couleur préférée ?" />
                            <Picker.Item label="Quelle est votre ville favorite ?" value="Quelle est votre ville favorite ?" />
                            <Picker.Item label="Quelle est votre groupe de musique préféré ?" value="Quelle est votre groupe de musique préféré ?" />
                            <Picker.Item label="Autres.." value="Autres.." />
                        </Picker>
                    </View>

                    <View style={{height: 10}}></View>

                    {questionPerso}

                    <View style={{height: 10}}></View>

                    <View style={{backgroundColor: 'white', borderRadius: 50}}>
                        <Input
                        placeholder='Réponse'
                        leftIconContainerStyle={{marginLeft: 0}}
                        leftIcon={
                            <MaterialCommunityIcons
                            name='lock-outline'
                            size={24}
                            color='black'
                            onPress={() => answer.current.focus()}
                            />
                        }
                        errorStyle={{ color: 'red' }}
                        onChangeText={(value) => this.setState({answer: value})} value={this.state.answer}
                        inputStyle={{paddingLeft: 10}}
                        ref={answer}
                        secureTextEntry={true}
                        />
                    </View>

                    <View style={{height: 20}}></View>
                    
                    <View style={{width:'50%', alignSelf:'center'}}>
                        <Button 
                        title="Next Step"
                        buttonStyle={{borderRadius: 50}}
                        onPress={this.retriveMe}
                        />
                    </View>

                    {errorMsg}
                </View>
            </ImageBackground>
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