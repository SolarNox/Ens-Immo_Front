import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Text, Button, List, ListItem, Input} from 'react-native-elements';

import {connect} from 'react-redux';

import socketIOClient from "socket.io-client";

class ChatScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      messageToSend: '',
      messageList: []
    };
  }

  componentDidMount(){
    this.socket = socketIOClient("https://app-locapic.herokuapp.com");

    this.socket.on('sendMessageFromBack', (message)=> {
      var messageListCopy = [...this.state.messageList];
      messageListCopy.push(message);

      this.setState({
        messageList: messageListCopy
      })
    });
  }

  handleSubmit = () => {
    this.socket.emit("sendMessage", {
      message: this.state.messageToSend,
      user: this.props.user.firstName,
      picture: this.props.user.picture
    })
    this.setState({messageToSend : ''});
  }

  render() {
    var renderMessage = this.state.messageList.map((data, i) => (<ListItem
                                                                  roundAvatar
                                                                  hideChevron
                                                                  key={i}
                                                                  avatar={{uri:data.picture}}
                                                                  title={data.user}
                                                                  subtitle={data.message}
                                                                />)
    );

    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text h4>{this.props.user.name}</Text>
        <Text h4>{this.props.user.firstName}</Text>
        <ScrollView>
          <List containerStyle={{marginBottom: 20, paddingLeft: 20}}>
            <ListItem
              roundAvatar
              hideChevron
              avatar={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
              title='Bernard Doe'
              subtitle='Message'
            />
            {renderMessage}
          </List>

          <KeyboardAvoidingView behavior="padding" enabled>
            <Input
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({messageToSend: text})}
              value={this.state.messageToSend}
              placeholder='Write your message here'
              containerStyle={styles.formBorder}
            />
            <Button title="Send Message" onPress={this.handleSubmit} backgroundColor='#3498db' textStyle={styles.homeBtn} containerViewStyle={{margin: 20}}/>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
 return { user: state.userData }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  homeBtn: {
    textTransform: 'lowercase',
  },
  formBorder : {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
  }
});


export default connect(mapStateToProps, null)(ChatScreen);
