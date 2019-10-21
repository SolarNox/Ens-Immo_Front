import React from 'react';
import { StyleSheet, View, AsyncStorage, Keyboard, TouchableOpacity, Image } from 'react-native';
import { Button, Text, Input, Avatar, Overlay, CheckBox } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Entypo, Foundation } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ipAdress from '../../config';

class InfoCopro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            overlayVisible: false,
        };
        this.getCoproFromBdd();
    }

    setModalVisible = (fieldName, fieldValue) => {
        this.setState({
            overlayVisible: true,
            fieldName,
            fieldValue
            
        });
    }

    updateMe = () => {

        var ctx = this;

        fetch(`${ipAdress}/users/updateCoproData`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${this.props.user.token}&updateValue=${this.state.fieldName}&newValue=${this.state.inputValue}`
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.setState({overlayVisible: false, inputValue: ''})
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });

    }

    getCoproFromBdd = () => {

        var ctx = this;

        fetch(`${ipAdress}/copro?token=${this.props.user.token}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.setState({copro: data})
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });

    }

    componentDidMount() {
        
    }

    render() {

        let displayInputOrNot;
        if(this.state.fieldName == 'sexe'){
            displayInputOrNot = <View style={{flexDirection: 'row', justifyContent: 'center'}}>   
                                    <CheckBox
                                    center
                                    title='Homme'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.sexe}
                                    onPress={() => this.setState({sexe: true})}
                                    />
                                    <CheckBox
                                    center
                                    title='Femme'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={!this.state.sexe}
                                    onPress={() => this.setState({sexe: false})}
                                    />
                                </View>
        } else {
            displayInputOrNot = <Input
                                inputStyle={{textAlign: 'center', fontSize: 18}}
                                placeholder={this.state.fieldValue}
                                onChangeText={(value) => this.setState({inputValue: value})} value={this.state.inputValue}
                                returnKeyType='done'
                                onSubmitEditing={Keyboard.dismiss}
                                />
        }

        var femaleOrMale;
        if(this.props.user.sexe === undefined){
            femaleOrMale = 'Inconnu'
        } else if(this.state.sexe){
            femaleOrMale = 'Homme'
        } else {
            femaleOrMale = 'Femme'
        }

        return (
            <View style={{flex: 1}}>
                <Overlay
                isVisible={this.state.overlayVisible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                
                animationType='fade'
                onBackdropPress={() => this.setState({ overlayVisible: !this.state.overlayVisible, inputValue: '' })}
                >
                    <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Saisissez la valeur à modifier :</Text>
                        {displayInputOrNot}
                        <Button 
                        title="Valider"
                        buttonStyle={{borderRadius: 20}}
                        onPress={this.updateMe}
                        />
                    </View>
                </Overlay>
                <View>
                    <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: '#78e08f', height: hp(15), paddingLeft: wp(15), paddingRight: wp(15)}}>
                        <Image 
                        source={require('../../assets/logo.png')}
                        style={{width: '100%', height: hp(10), resizeMode: 'contain'}}
                        />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%'}}>
                        <View style={{backgroundColor: '#78e08f', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, height: hp(10), width: wp(100), position: 'absolute', top: 0}}></View>
                        <View style={{borderRadius: 15, width: wp(90), backgroundColor: 'white', height: hp(70), zIndex: 100, marginTop: hp(-33), padding: '3%', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 18}}>Profil :</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <FontAwesome 
                                        name='home'
                                        size={33}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Nom : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>{this.props.copro.nom}</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('lastName', this.props.user.lastName)}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <Entypo 
                                        name='email'
                                        size={33}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Mail : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>{this.props.copro.email}</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('email', this.props.copro.email)}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <Foundation 
                                        name='telephone'
                                        size={33}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Téléphone : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>{this.props.copro.tel ? this.props.copro.tel : 'Non renseigné'}</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('telephone', (this.props.copro.telephone ? this.props.user.telephone : 'Non renseigné'))}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <FontAwesome 
                                        name='users'
                                        size={28}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Nombre d'utilisateurs : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>{this.props.copro.syndicUsers.length}</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('telephone2', (this.props.user.telephone2 ? this.state.user.telephone2 : 'Non renseigné'))}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <FontAwesome 
                                        name='building'
                                        size={28}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Nombre d'habitations : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>{this.props.copro.syndicUsers.length}</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('password', '********')}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <MaterialIcons 
                                        name='person'
                                        size={33}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Nom du président : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>{this.props.user.firstName}</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('firstName', this.props.user.firstName)}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: wp(10)}}>
                                        <FontAwesome 
                                        name='users'
                                        size={28}
                                        color='#78e08f'
                                        />
                                    </View>
                                    <Text style={{marginLeft: wp(2), width: wp(33), fontWeight: 'bold'}}>Conseil syndical : </Text>
                                </View>
                                <Text style={{width: wp(35)}}>...</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.setModalVisible('sexe', this.state.sexe)}
                                    />
                                </View>
                            </View>
                        </View>  
                    </View>
                </View>
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

function mapDispatchToProps(dispatch) {
    return {
       
    }
}

function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCopro);