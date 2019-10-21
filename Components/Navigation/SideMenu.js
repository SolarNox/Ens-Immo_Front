import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {StyleSheet, ScrollView, Text, View, ImageBackground, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation-stack';

import CustomSVG from '../../assets/SVG/Large-Triangles.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class SideMenu extends Component {
    
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
        routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    logOut = () => {
        AsyncStorage.clear()
        this.props.navigation.navigate('AuthStack')
    }

    render () {

    {/* <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center'}]}>
        <CustomSVG width="100%" height="100%" />
    </View> */}


        return (
            <View style={styles.container}> 
                
                <View style={{alignItems: 'center', justifyContent: 'center', height: hp(30) }}>
                    <ImageBackground
                    source={require('../../assets/Large-Triangles.png')}
                    style={{width: '100%', height: hp(30), resizeMode: 'cover', position: 'absolute'}}
                    >
                        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                            <MaterialCommunityIcons
                            name='home-account'
                            size={77}
                            color='black'
                            />
                        </View>
                    </ImageBackground>
                </View>

                <ScrollView style={{marginVertical: hp(3), height: '100%'}}>  
                    <View style={{flex: 1, height: '100%', justifyContent: 'space-evenly'}}>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: wp(1)}}>
                                    <MaterialCommunityIcons
                                    name='home'
                                    size={33}
                                    color='black'
                                    />
                                </View>
                                <View style={{flex: 5}}>
                                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 22, paddingRight: wp(5)}}>Acceuil</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.navigateToScreen('MaCopro')}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: wp(1)}}>
                                    <MaterialCommunityIcons
                                    name='account-group'
                                    size={33}
                                    color='black'
                                    />
                                </View>
                                <View style={{flex: 5}}>
                                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 22, paddingRight: wp(5)}}>Votre Copropriété</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.navigateToScreen('MesInfos')}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: wp(1)}}>
                                    <MaterialCommunityIcons
                                    name='account-heart'
                                    size={33}
                                    color='black'
                                    />
                                </View>
                                <View style={{flex: 5}}>
                                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 22, paddingRight: wp(5)}}>Votre profil</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.navigateToScreen('Parametres')}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: wp(1)}}>
                                    <FontAwesome
                                    name='gears'
                                    size={33}
                                    color='black'
                                    />
                                </View>
                                <View style={{flex: 5}}>
                                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 22, paddingRight: wp(5)}}>Votre compte</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.navigateToScreen('ActuCopro')}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: wp(1)}}>
                                    <MaterialCommunityIcons
                                    name='information'
                                    size={33}
                                    color='black'
                                    />
                                </View>
                                <View style={{flex: 5}}>
                                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 22, paddingRight: wp(5)}}>Actualités</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.navigateToScreen('ProblemeCopro')}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                <View style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: wp(1)}}>
                                    <Entypo
                                    name='warning'
                                    size={33}
                                    color='black'
                                    />
                                </View>
                                <View style={{flex: 5}}>
                                    <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 22, paddingRight: wp(5)}}>Signaler un problème</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>

                    
                </ScrollView>
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={this.logOut}>
                        <FontAwesome
                        name='power-off'
                        size={24}
                        color='black'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

/*
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

const CustomDrawerContentComponent = props => (
<ScrollView>
    <SafeAreaView
    style={styles.container}
    forceInset={{ top: 'always', horizontal: 'never' }}
    >
    <DrawerNavigatorItems {...props} />
    </SafeAreaView>
</ScrollView>
);

const styles = StyleSheet.create({
container: {
    flex: 1,
},
});
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: hp(100)
    }, pattern: {
        backgroundColor: '#0099ff',
    },
        navItemStyle: {
        padding: 10
    },
        navSectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        width: '100%'
    },
        sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
        footerContainer: {
        padding: hp(2.5),
        backgroundColor: '#3498db',
        alignItems: 'center'
    }
});

export default SideMenu;