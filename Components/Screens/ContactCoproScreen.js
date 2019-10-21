import React from 'react';
import { StyleSheet, View, FlatList, Keyboard, TouchableOpacity, Clipboard, ActivityIndicator  } from 'react-native';
import { Button, Text, Input, Avatar, Overlay, CheckBox, ListItem, Divider, SearchBar } from 'react-native-elements';

import CustomSVG from '../../assets/SVG/Protruding-Squares.svg';

import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons, Entypo, Foundation } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ipAdress from '../../config';
import { ScrollView } from 'react-native-gesture-handler';

class ContactCopro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            overlayVisible: false,
            inputValue: '',
            whatToShow: false,
            loading: false,
            error: null,
            users: [],
            search: '',
        };
        // this.usersHolder = this.props.copro.syndicUsers;
        this.getUserFromBdd();
    }

    componentDidMount() {
    }

    getUserFromBdd = () => {

        var ctx = this;
        // this.setState({ loading: true });

        fetch(`${ipAdress}/users/copro?idCopro=${this.props.copro._id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log('je suis un accès aux data de ma Bdd dans ContactCopro avec getUsers', data);

            // this.usersHolder = data.syndicUsers;
            ctx.setState({users: data.syndicUsers})
            // ctx.setState({loading: false})
        })
        .catch(function(error) {
            // console.log('Request failed', error)
            this.setState({ error, loading: false });
        });

    }

    getInvitation = () => {

        var ctx = this;

        fetch(`${ipAdress}/users/invite?idCopro=${this.props.copro._id}&mail=${this.props.user.email}&mailToInvite=${this.state.inputValue}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            ctx.setState({invit: data.invit, whatToShow: data.result})
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });

    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.invit);
        alert('Copié dans le presse-papier!');
        this.setState({
            whatToShow: false,
            inputValue: '',
            overlayVisible: false
        })
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                height: hp(0.2),
                width: wp(85),
                backgroundColor: '#CED0CE',
                marginLeft: wp(15),
                }}
            />
        );
    };

    

    render() {

        var syndics = this.props.copro.syndicUsers.map((item, key) => (
            <ListItem
                key={key}
                title={item.firstName + ' ' + item.lastName}
                subtitle='Copropriétaire'
                leftAvatar={{
                    title: item.firstName[0] + item.lastName[0]
                }}
                bottomDivider
                chevron
            />
        ))

        var whatToShow;
        if(this.state.whatToShow){
            whatToShow= (<View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Voici le code invitation :</Text>
                            <Text h1 style={{textAlign: 'center', color: '#82ccdd'}}>{this.state.invit}</Text>
                            <Button 
                            title="Copier"
                            buttonStyle={{borderRadius: 20}}
                            onPress={this.writeToClipboard}
                            />
                        </View>)
        } else {
            whatToShow= (<View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Saisissez le mail de l'invité :</Text>
                            <Input
                            inputStyle={{textAlign: 'center', fontSize: 18}}
                            placeholder={this.state.fieldValue}
                            onChangeText={(value) => this.setState({inputValue: value})} value={this.state.inputValue}
                            keyboardType='email-address'
                            returnKeyType='done'
                            onSubmitEditing={Keyboard.dismiss}
                            autoFocus={true}
                            />
                            <Button 
                            title="Valider"
                            buttonStyle={{borderRadius: 20}}
                            onPress={this.getInvitation}
                            />
                        </View>)
        }

        // if (this.state.loading) {
        //     return (
        //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator />
        //         </View>
        //     );
        // }

        return (
            <View style={{flex: 1}}>
                <Overlay
                isVisible={this.state.overlayVisible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                
                animationType='fade'
                onBackdropPress={() => this.setState({ overlayVisible: !this.state.overlayVisible })}
                >
                    {whatToShow} 
                </Overlay>
                <View style={{position: 'absolute', bottom: hp(5), right: hp(5), justifyContent: 'center', alignItems: 'center', width: hp(8), height: hp(8), backgroundColor: '#82ccdd', borderRadius: 50, zIndex: 100}}>
                    <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => this.setState({ overlayVisible: true })}
                    >
                        <MaterialCommunityIcons
                        name='plus'
                        size={33}
                        color='black'
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        <SearchBar
                        lightTheme
                        round
                        placeholder="Rechercher..."
                        autoCorrect={false}
                        onChangeText={text => this.setState({ search: text })}
                        value={this.state.search}
                        />
                    </View>
                    <View>
                        
                        <Text h4 style={{paddingLeft: wp(2)}}>Conseil Syndical</Text>
                        <Divider style={{height:hp(0.2), backgroundColor: '#82ccdd'}}></Divider>
                        <View>
                            <ListItem
                                title='Jean Dujardin'
                                subtitle='Président du conseil syndical'
                                leftAvatar={{
                                title: 'J D'
                                }}
                                bottomDivider
                                chevron
                            />
                        </View>
                        <Divider style={{height:hp(0.5), backgroundColor: '#82ccdd'}}></Divider>
                        <ListItem
                            title='Jean Reno'
                            subtitle='Membres du conseil Syndical'
                            leftAvatar={{
                            title: 'J D'
                            }}
                            bottomDivider
                            chevron
                        />
                    </View>
                    <Divider style={{height:hp(1), backgroundColor: '#82ccdd'}}></Divider>
                    <View>
                        <Text h4 style={{paddingLeft: wp(2)}}>Syndicat des copropriétaires</Text>
                        <ListItem
                            title='Snoop Dogg'
                            subtitle='Copropriétaire'
                            leftAvatar={{
                            title: 'S D'
                            }}
                            bottomDivider
                            chevron
                        />

                        {syndics}
 
                    </View>
                </ScrollView>
            </View>
        );
    }   
}

/*
=> Method :

searchFilterFunction = text => {
    this.updateSearch(text);

    const newData = this.usersHolder.filter(item => {
        const itemData = `${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`;
            const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
    });
    
    console.log('ici ici ici ici ici ici', newData)
    this.setState({
        users: newData,
    });
};

keyExtractor = (item, index) => index.toString()

renderHeader = () => {
    return (
        <SearchBar
        lightTheme
        round
        placeholder="Rechercher..."
        autoCorrect={false}
        onChangeText={text => this.searchFilterFunction(text)}
        value={this.state.search}
        />
    );
};

updateSearch = search => {
    this.setState({ search });
};

=> JSX :

<FlatList
data={this.state.users}
renderItem={({ item }) => (
    <ListItem
    title={`${item.firstName} ${item.lastName}`}
    subtitle='Copropriétaire'
    leftAvatar={{ title: `${item.firstName[0]}${item.lastName[0]}` }}
    chevron
/>
)}
keyExtractor={this.keyExtractor}
ItemSeparatorComponent={this.renderSeparator}
ListHeaderComponent={this.renderHeader}
/>

*/

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

export default connect(mapStateToProps, null)(ContactCopro);