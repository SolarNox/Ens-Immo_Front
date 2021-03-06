import React from 'react';

import { StyleSheet, View, Image, Picker, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Input, Divider, CheckBox } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ipAdress from '../../config';

class EauProbleme extends React.Component {


    constructor() {
        super();
        this.state = {
            choicePicker: "Fuites d'eau",
            autreProbleme: "",
            descriptionProblem: "",
            privateOrNot: true
        }
    }

    sendLogs = () => {

        var ctx = this;

        fetch(`${ipAdress}/users/coproSendLog`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `tokenUser=${this.props.user.token}&tokenCopro=${this.props.copro._id}&type=Eau&titleType=${this.state.choicePicker}&privateOrNot=${this.state.privateOrNot}&title=${this.state.autreProbleme}&description=${this.state.descriptionProblem}`
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.props.navigation.navigate('ActuCopro');
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });

    }

    render() {

        const autreProbleme = React.createRef();
        const descriptionProblem = React.createRef();

        var otherProblem = null;

        if(this.state.choicePicker == "Autres"){
            otherProblem = <View style={{backgroundColor: 'white', borderRadius: 50, width: wp(85)}}>
                                <View style={{height: hp(2)}}></View>
                                <Input
                                placeholder='Votre problème'
                                leftIconContainerStyle={{marginLeft: 0}}
                                leftIcon={
                                    <FontAwesome
                                    name='question-circle'
                                    size={24}
                                    color='black'
                                    onPress={() => autreProbleme.current.focus()}
                                    />
                                }
                                errorStyle={{ color: 'red' }}
                                onChangeText={(value) => this.setState({autreProbleme: value})} value={this.state.autreProbleme}
                                inputStyle={{paddingLeft: 10}}
                                ref={autreProbleme}
                                autoFocus={true}
                                />
                            </View>
        }

        return (
        <KeyboardAvoidingView behavior='padding' enabled>
        <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor:'white'}}>
            
            <View style={{paddingTop: hp(5)}}>
                <Button
                title="Eau"
                buttonStyle={{backgroundColor: "#2de1fc", width: wp(22), height: wp(22), flexDirection: 'column'}}
                icon={
                    <MaterialCommunityIcons
                    name="water"
                    size={50}
                    color="white"
                    />
                }
                raised
                />
            </View>

            <View style={{padding: hp(5), width: wp(100)}}>
                <Text h4 style={{textAlign: 'center'}}>Quelle est votre problème ?</Text>
            </View>

            <View style={{backgroundColor: 'white', borderRadius: 50, width: wp(85)}}>
                <Picker
                prompt='Type'
                selectedValue={this.state.choicePicker}
                style={{height: 40, width: '100%', textAlign: 'center'}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({choicePicker: itemValue})
                }>
                    <Picker.Item label="Fuites d'eau" value="Fuites d'eau" />
                    <Picker.Item label="Parquet bombé" value="Parquet bombé" />
                    <Picker.Item label="Peinture qui s'écaille" value="Peinture qui s'écaille" />
                    <Picker.Item label="Bruit d'eau" value="Bruit d'eau" />
                    <Picker.Item label="Problème du compteur d'eau" value="Problème du compteur d'eau" />
                    <Picker.Item label="Plus d'eau chaude" value="Plus d'eau chaude" />
                    <Picker.Item label="Mauvaise qualité de l'eau" value="Mauvaise qualité de l'eau"/>
                    <Picker.Item label="Autres.." value="Autres" />
                </Picker>
            </View>

            {otherProblem}

            <View style={{height: hp(2)}}></View>

            <View style={{backgroundColor: 'white', borderRadius: 50, width: wp(85)}}>
                <Input
                placeholder='Description'
                leftIconContainerStyle={{marginLeft: 0}}
                leftIcon={
                    <MaterialIcons
                    name='sync-problem'
                    size={24}
                    color='black'
                    onPress={() => descriptionProblem.current.focus()}
                    />
                }
                onChangeText={(value) => this.setState({descriptionProblem: value})} value={this.state.answer}
                inputStyle={{paddingLeft: 10}}
                ref={descriptionProblem}
                multiline
                numberOfLines={3}
                onSubmitEditing={Keyboard.dismiss}
                />
            </View>

            <View style={{height: hp(4)}}></View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>   
                <CheckBox
                center
                title='Partie privative'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.privateOrNot}
                onPress={() => this.setState({privateOrNot: true})}
                />
                <CheckBox
                center
                title='Partie commune'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!this.state.privateOrNot}
                onPress={() => this.setState({privateOrNot: false})}
                />
            </View>

            <View style={{height: hp(4)}}></View>

            <View style={{width:'50%', alignSelf:'center'}}>
                <Button 
                title="Soumettre"
                buttonStyle={{borderRadius: 50}}
                onPress={this.sendLogs}
                />
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

export default connect(mapStateToProps, null)(EauProbleme);