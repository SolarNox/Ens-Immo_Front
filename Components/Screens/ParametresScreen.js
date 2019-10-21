import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text, Avatar, CheckBox, Tooltip } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

// import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { withNavigation } from 'react-navigation';

class Parametres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationAllowed: true,
            shareInfos: true,
        };
    }

    async componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View>
                    <View style={{backgroundColor: '#1abc9c', width: wp(100), height: hp(10), position: "absolute"}}>
                    </View>

                    <View style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', width: wp(100), height: hp(90), padding: wp(5), paddingTop: hp(3), justifyContent: 'space-between'}}>

                        <View style={{height: hp(40), justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 22, color: 'grey'}}>Compte : </Text>
                            
                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Éditer votre profil</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    onPress={() => this.props.navigation.navigate('MesInfos')}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Changer votre mot de passe</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Notification</Text>
                                <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                    <CheckBox
                                    containerStyle={{marginRight: 0, marginLeft: 0, margin: 0, padding: 0}}
                                    center
                                    title='Oui'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.notificationAllowed}
                                    onPress={() => this.setState({notificationAllowed: !this.state.notificationAllowed})}
                                    />
                                    <CheckBox
                                    containerStyle={{marginRight: 0, marginLeft: 0, margin: 0, padding: 0}}
                                    center
                                    title='Non'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={!this.state.notificationAllowed}
                                    onPress={() => this.setState({notificationAllowed: !this.state.notificationAllowed})}
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Tooltip backgroundColor='#1abc9c' height={55} width={250} popover={<Text>Autorisation du partage de vos données avec les autres utilisateurs</Text>}>
                                    <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Partage des données</Text>
                                </Tooltip>
                                <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                    <CheckBox
                                    center
                                    containerStyle={{marginRight: 0, marginLeft: 0, margin: 0, padding: 0}}
                                    title='Oui'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.shareInfos}
                                    onPress={() => this.setState({notificationAllowed: !this.state.shareInfos})}
                                    />
                                    <CheckBox
                                    containerStyle={{marginRight: 0, marginLeft: 0, margin: 0, padding: 0}}
                                    center
                                    title='Non'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={!this.state.shareInfos}
                                    onPress={() => this.setState({shareInfos: !this.state.shareInfos})}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={{height: hp(40), justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 22, color: 'grey'}}>Support : </Text>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Contactez-nous</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Votre avis</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Signaler un bug</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Politique de confidentialité</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
                                    />
                                </View>
                            </View>
                            
                            <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>À propos de l'application</Text>
                                <View style={{width: wp(10)}}>
                                    <Ionicons 
                                    name='ios-arrow-forward'
                                    size={33}
                                    color='lightgrey'
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


export default withNavigation(Parametres);