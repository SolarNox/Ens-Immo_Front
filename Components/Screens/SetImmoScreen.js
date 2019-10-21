import React from 'react';
import { StyleSheet, View, Keyboard, Animated, Easing, TouchableOpacity } from 'react-native';
import { Divider, Button, Text, Input, CheckBox  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import ipAdress from '../../config';
import {connect} from 'react-redux';

import { withNavigation } from 'react-navigation';

class SetImmo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choice: true,
            choice2: true,
            nameCopro: '',
            mail: '',
            tel: '',
            rue: '',
            numeroRue: '',
            numeroImmeuble: '',
            codeImmeuble: '',
            codeImmeubleSecondaire: '',
            ville: '',
            codePostal: '',
            ViewArray: [], 
            Disable_Button: false
        };
        this.animatedValue = new Animated.Value(0);
        this.fadeInOut = new Animated.Value(0);
        this.index = 0;
    }

    componentDidMount () {
        this.animate()
    }

    animate () {
        this.fadeInOut.setValue(0)
        Animated.timing(
            this.fadeInOut,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start(() => this.animate())
    }

    CreateMe = () => {

        var ctx = this;

        fetch(`${ipAdress}/addbuildings`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${this.props.user.token}&prezCopro=${this.state.choice}&inSyndic=${this.state.choice2}&nomCopro=${this.state.nameCopro}&email=${this.state.mail}&tel=${this.state.tel}&numeroRue=${this.state.numeroRue}&rue=${this.state.rue}&codePostal=${this.state.codePostal}&ville=${this.state.ville}&numeroImmeuble=${this.state.numeroImmeuble}&codeImmeuble=${this.state.codeImmeuble}&codeImmeubleSecondaire=${this.state.codeImmeubleSecondaire}&isInvited=${this.props.user.invited}&idCopro=${ctx.setIdCoproToSend()}`
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.props.handleCoproValid(data.copros._id, data.copros.nomCopro, data.copros.mail, data.copros.numeroTel, data.copros.tokenPrez, );
            ctx.addCoproToUserFromBdd(data.copros._id, data.copros.nomCopro, data.copros.mail);
            ctx.props.navigation.navigate('Home');
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    setIdCoproToSend = () => {

        // var ctx = this;

        var idCoproToSend = '';
        if(this.props.user.invited){
            return idCoproToSend = this.props.copro._id;
        } else {
            return idCoproToSend;
        }
    }

    addCoproToUserFromBdd = (idCopro, nomCopro, emailCopro) => {

        var ctx = this;

        fetch(`${ipAdress}/addCoproToUser`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${this.props.user.token}&idCopro=${idCopro}&nomCopro=${nomCopro}&mailCopro=${emailCopro}`
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });

    }

    moreBuildings = () => {
        this.animatedValue.setValue(0);
        let New_Added_View_Value = { index: this.index }
        this.setState({ Disable_Button: true, ViewArray: [ ...this.state.ViewArray, New_Added_View_Value ] }, () =>
        {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start(() =>
            {
                this.index = this.index + 1;
 
                this.setState({ Disable_Button: false });
            }); 
        });  
    }

    render() {

        const opacity = this.fadeInOut.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        })

        const AnimationValue = this.animatedValue.interpolate({
            inputRange: [ 0, 1 ],  
            outputRange: [ -59, 0 ]
        });
     
        function isEven(value) {
            if (value%2 == 0)
                return true;
            else
                return false;
        }

        let buildings = this.state.ViewArray.map(( item, key ) =>
        {
            // test => this["numeroRue"+key] = "some stuff";
            
            // const numeroRue = React.createRef();
            // const rue = React.createRef();
            // const codePostal = React.createRef();
            // const ville = React.createRef();
            // const numeroImmeuble = React.createRef();
            // const codeImmeuble = React.createRef();
            // const codeImmeubleSecondaire = React.createRef();

            if(( key ) == this.index)
            {
                return(
 
                    <Animated.View 
                      key = { key } 
                      style = {[ styles.Animated_View_Style, { opacity: this.animatedValue, transform: [{ translateY: AnimationValue }] }]}>
                        
                        <View style={{backgroundColor: 'white', borderRadius: 50}}>
                            <Input
                            placeholder={`Numéro de la rue ${item.index}`}
                            leftIconContainerStyle={{marginLeft: 0}}
                            leftIcon={
                                <FontAwesome
                                name={isEven(item.index) ? 'building-o' : 'building'}
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
                            placeholder={`Libellé de la rue ${item.index}`}
                            leftIconContainerStyle={{marginLeft: 0}}
                            leftIcon={
                                <FontAwesome
                                name={isEven(item.index) ? 'building-o' : 'building'}
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
                            onSubmitEditing={() => numeroImmeuble.current.focus()}
                            />
                        </View>

                        <View style={{height: 10}}></View>

                        <View style={{backgroundColor: 'white', borderRadius: 50}}>
                            <Input
                            placeholder="N° de l'immeuble"
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
                            onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                        <View style={{height: 10}}></View>

                    </Animated.View>
                
              );
            }
            else
            {
                return(
 
                    <View 
                      key = { key } 
                      style = { styles.Animated_View_Style }>

                        <View style={{backgroundColor: 'white', borderRadius: 50}}>
                            <Input
                            placeholder={`Numéro de la rue ${item.index}`}
                            leftIconContainerStyle={{marginLeft: 0}}
                            leftIcon={
                                <FontAwesome
                                name={isEven(item.index) ? 'building-o' : 'building'}
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
                            placeholder={`Libellé de la rue ${item.index}`}
                            leftIconContainerStyle={{marginLeft: 0}}
                            leftIcon={
                                <FontAwesome
                                name={isEven(item.index) ? 'building-o' : 'building'}
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
                            onSubmitEditing={() => numeroImmeuble.current.focus()}
                            />
                        </View>

                        <View style={{height: 10}}></View>

                        <View style={{backgroundColor: 'white', borderRadius: 50}}>
                            <Input
                            placeholder="N° de l'immeuble"
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
                            onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                        <View style={{height: 10}}></View>
 
                    </View>
 
                );
            }
        });

        const nameCopro = React.createRef();
        const mail = React.createRef();
        const tel = React.createRef();

        const numeroRue = React.createRef();
        const rue = React.createRef();
        const codePostal = React.createRef();
        const ville = React.createRef();
        const numeroImmeuble = React.createRef();
        const codeImmeuble = React.createRef();
        const codeImmeubleSecondaire = React.createRef();

        var displayOrNot;
        if(this.props.user.invited === false){
            displayOrNot = (<View>
                                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                                    <Input
                                    placeholder='Nom de la copropriété'
                                    leftIconContainerStyle={{marginLeft: 0}}
                                    leftIcon={
                                        <MaterialCommunityIcons
                                        name='home-circle'
                                        size={24}
                                        color='black'
                                        onPress={() => nameCopro.current.focus()}
                                        />
                                    }
                                    errorStyle={{ color: 'red' }}
                                    onChangeText={(value) => this.setState({nameCopro: value})} value={this.state.nameCopro}
                                    inputStyle={{paddingLeft: 10}}
                                    ref={nameCopro}
                                    returnKeyType='next'
                                    onSubmitEditing={() => mail.current.focus()}
                                    />
                                </View>

                                <View style={{height: 10}}></View>

                                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                                    <Input
                                    placeholder='Mail de la copropriété'
                                    leftIconContainerStyle={{marginLeft: 0}}
                                    leftIcon={
                                        <Entypo
                                        name='mail'
                                        size={22}
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
                                    onSubmitEditing={() => tel.current.focus()}
                                    />
                                </View>

                                <View style={{height: 10}}></View>

                                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                                    <Input
                                    placeholder='Numéro de la copropriété'
                                    leftIconContainerStyle={{marginLeft: 0}}
                                    leftIcon={
                                        <MaterialIcons
                                        name='perm-phone-msg'
                                        size={24}
                                        color='black'
                                        onPress={() => tel.current.focus()}
                                        />
                                    }
                                    errorStyle={{ color: 'red' }}
                                    onChangeText={(value) => this.setState({tel: value})} value={this.state.tel}
                                    inputStyle={{paddingLeft: 10}}
                                    ref={tel}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    onSubmitEditing={() => numeroRue.current.focus()}
                                    />
                                </View>

                                <View style={{height: 10}}></View>

                                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                                    <Input
                                    placeholder='Numéro de la rue'
                                    leftIconContainerStyle={{marginLeft: 0}}
                                    leftIcon={
                                        <FontAwesome
                                        name='building'
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
                                    placeholder='Libellé de la rue'
                                    leftIconContainerStyle={{marginLeft: 0}}
                                    leftIcon={
                                        <FontAwesome
                                        name='building'
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
                                    onSubmitEditing={() => numeroImmeuble.current.focus()}
                                    />
                                </View>

                                <View style={{height: 10}}></View>

                                <View style={{backgroundColor: 'white', borderRadius: 50}}>
                                    <Input
                                    placeholder="N° de l'immeuble"
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
                                    onSubmitEditing={Keyboard.dismiss}
                                    />
                                </View>

                                <View style={{height: 10}}></View>

                                {
                                    buildings
                                }
                                
                                <TouchableOpacity
                                activeOpacity = { 0.7 }
                                disabled = { this.state.Disable_Button } 
                                onPress = { this.moreBuildings }
                                >
                                    <Animated.View style={{opacity}}>
                                        <Ionicons
                                                name='md-add'
                                                size={24}
                                                color='black'
                                                style={{textAlign: 'center'}}
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>)
        } else {
            displayOrNot = null;
        }

        return (
            <View>
                <Text h4 style={{textAlign: 'center'}}>Votre copropriété :</Text>

                {displayOrNot}

                <View style={{height: 10}}></View>

                <Text style={{textAlign: 'center'}}>Êtes-vous le président de la Copropriété ?</Text>
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
                
                <Text style={{textAlign: 'center'}}>Êtes-vous du conseil syndical ?</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>   
                    <CheckBox
                    center
                    title='Oui'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.choice2}
                    onPress={() => this.setState({choice2: !this.state.choice2})}
                    />
                    <CheckBox
                    center
                    title='Non'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={!this.state.choice2}
                    onPress={() => this.setState({choice2: !this.state.choice2})}
                    />
                </View>

                <View style={{width:'50%', alignSelf:'center'}}>
                    <Button 
                    title="Validation"
                    buttonStyle={{borderRadius: 50}}
                    onPress={this.CreateMe}
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


function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

function mapDispatchToProps(dispatch) {
    return {
        handleCoproValid: function(idCopro, nameCopro, emailCopro, telCopro, tokenPrezCopro, usersTokenCopro, usersCopro) {
            dispatch({
                type: 'setCoproData',
                _id: idCopro,
                name: nameCopro,
                email: emailCopro,
                tel: telCopro,
                tokenPrez: tokenPrezCopro,
                usersToken: usersTokenCopro,
                usersCopro: usersCopro
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SetImmo));