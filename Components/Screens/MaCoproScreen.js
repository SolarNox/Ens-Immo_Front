import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Avatar } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {connect} from 'react-redux';


class MaCopro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text h1>{this.props.copro.nom}</Text>
                <View style={{ flex: 1, justifyContent: 'space-around'}}>
                    <Button
                    title="Actualités"
                    titleStyle={{fontWeight: 'bold'}}
                    buttonStyle={{backgroundColor: "#fad390", width: wp(90), height: hp(10), justifyContent: "space-between"}}
                    icon={
                        <FontAwesome
                        name="newspaper-o"
                        size={50}
                        color="white"
                        />
                    }
                    onPress={() => this.props.navigation.navigate('ActuCopro')}
                    raised
                    />
                    <Button 
                    title="Informations"
                    titleStyle={{fontWeight: 'bold'}}
                    buttonStyle={{backgroundColor: "#78e08f", width: wp(90), height: hp(10), justifyContent: "space-between"}}
                    icon={
                        <Entypo
                        name="info"
                        size={50}
                        color="white"
                        />
                    }
                    onPress={() => this.props.navigation.navigate('InfoCopro')}
                    raised
                    />
                    <Button
                    title="Contacts"
                    titleStyle={{fontWeight: 'bold'}}
                    buttonStyle={{backgroundColor: "#82ccdd", width: wp(90), height: hp(10), justifyContent: "space-between"}}
                    icon={
                        <MaterialCommunityIcons
                        name="home-account"
                        size={50}
                        color="white"
                        />
                    }
                    onPress={() => this.props.navigation.navigate('ContactCopro')}
                    raised
                    />
                    <Button
                    title="Mes conversations"
                    titleStyle={{fontWeight: 'bold'}}
                    buttonStyle={{backgroundColor: "#079992", width: wp(90), height: hp(10), justifyContent: "space-between"}}
                    icon={
                        <Ionicons
                        name="md-chatboxes"
                        size={50}
                        color="white"
                        />
                    }
                    onPress={() => this.props.navigation.navigate('Home')}
                    raised
                    />
                    <Button
                    title="Signaler un problème"
                    titleStyle={{fontWeight: 'bold'}}
                    buttonStyle={{backgroundColor: "#e55039", width: wp(90), height: hp(10), justifyContent: "space-between"}}
                    icon={
                        <Entypo
                        name="warning"
                        size={50}
                        color="white"
                        />
                    }
                    onPress={() => this.props.navigation.navigate('ProblemeCopro')}
                    raised
                    />            
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

function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

export default connect(mapStateToProps, null)(MaCopro);