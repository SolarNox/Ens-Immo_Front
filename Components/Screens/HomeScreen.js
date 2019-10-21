import React from 'react';

import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userLocalStorage: null
        }
    }
    
    componentWillMount() {
        var ctx = this;
        AsyncStorage.getItem("user",
        function(err, data) {
            if (data !== null) {
            var userData = JSON.parse(data);
            ctx.setState({
                userLocalStorage: userData
            })
            }
        }
        )
    }

    render() {
        return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor:'white'}}>
            <View style={{ backgroundColor: '#3498db', alignItems: 'center', width: wp(100), minHeight: hp(28)}}>
                <View style={{position: "absolute", bottom: '-25%'}}>
                    <Avatar
                    title={this.props.user.firstName[0] + this.props.user.lastName[0]}
                    source= {require('../../assets/logo_noir_avatar.png')}
                    titleStyle={{color: 'black'}}
                    size="xlarge"
                    overlayContainerStyle={{borderRadius: 20, backgroundColor: 'white', shadowColor: 'rgba(0,0,0, .4)', shadowOffset: { height: 1, width: 1 }, shadowOpacity: 1, shadowRadius: 1, elevation: 8 }}
                    activeOpacity={0.7}
                    >     
                    </Avatar>
                </View>
            </View>
            <View style={{height: hp(10)}}></View>
            <View>
                <Text h2>{this.props.copro.nom}</Text>
            </View>
            <View style={{flex: 1, width: "100%", justifyContent: "space-around"}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button
                    title="ma Copro"
                    buttonStyle={{backgroundColor: "#9b59b6", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <MaterialCommunityIcons
                        name="home-heart"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('MaCopro')}
                    raised
                    />
                    <Button 
                    title="mes Infos"
                    buttonStyle={{backgroundColor: "#2ecc71", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <Ionicons
                        name="ios-information-circle-outline"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('MesInfos')}
                    raised
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button 
                    title="mes Contacts"
                    buttonStyle={{backgroundColor: "#e67e22", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <FontAwesome
                        name="users"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('MesContacts')}
                    raised
                    />
                    <Button 
                    title="Paramètres"
                    buttonStyle={{backgroundColor: "#1abc9c", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <FontAwesome
                        name="gears"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('Parametres')}
                    raised
                    />
                </View>
            </View>
            <View style={{height: hp(2)}}></View>
        </View>
        );
    }
}
// viewBox={`0 0 ${wp(100)} ${hp(100)}`}
/* <CustomSVG width="100%" height="100%" viewBox='0 0 100% 20%'>
    <View>
        
    </View>
</CustomSVG> */


/* <View style={{height: 200}}></View>
<View>
    <Text>Hey, You Did it !</Text>
    <Button title='Go Back !' style={{width: 200}} backgroundColor='#022F40' color='#FFFFFF' onPress={() => this.props.navigation.navigate('Login')}></Button>
    <Text>Go to , Setting !</Text>
    <Button type='outline' title='Setting Page' style={{width: 200}} backgroundColor='#022F40' color='#FFFFFF' onPress={() => this.props.navigation.openDrawer()}></Button>
    <Text>Name : {this.props.user.firstName}</Text>
    {willUserDisplay}
</View> */






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

export default connect(mapStateToProps, null)(HomeScreen);