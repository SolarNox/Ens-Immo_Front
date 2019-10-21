import React from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ProblemeCopro extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    

    render() {
        return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor:'white'}}>
            <View style={{padding: hp(10)}}>
                <Text h4 style={{textAlign: 'center'}}>Quelle est la nature de votre problème ?</Text>
            </View>
            <View style={{flex: 1, width: "100%", justifyContent: "space-around"}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button
                    title="Eau"
                    buttonStyle={{backgroundColor: "#2de1fc", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <MaterialCommunityIcons
                        name="water"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('EauProbleme')}
                    raised
                    />
                    <Button 
                    title="Électricité"
                    buttonStyle={{backgroundColor: "#e8e288", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <FontAwesome
                        name="bolt"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('ElecProbleme')}
                    raised
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button 
                    title="Entretiens"
                    buttonStyle={{backgroundColor: "#7dce82", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <MaterialCommunityIcons
                        name="wrench"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('EntretienProbleme')}
                    raised
                    />
                    <Button 
                    title="Autres"
                    buttonStyle={{backgroundColor: "#ff8360", width: wp(33), height: wp(33), flexDirection: 'column'}}
                    icon={
                        <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={50}
                        color="white"
                        />
                    }
                    iconContainerStyle={{}}
                    onPress={() => this.props.navigation.navigate('AutreProbleme')}
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

export default connect(mapStateToProps, null)(ProblemeCopro);