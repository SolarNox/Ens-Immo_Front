import React from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import DrawerMenu from './DrawerNav';
import SideMenu from './SideMenu'

import LoginScreen from '../Screens/LoginScreen';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import CreaCoproScreen from '../Screens/CreaCoproScreen';
import SetHouseScreen from '../Screens/SetHouseScreen';
import SetImmoScreen from '../Screens/SetImmoScreen';
import ForgotScreen from '../Screens/ForgotPasswordScreen';
import HomeScreen from '../Screens/HomeScreen';
import MaCoproScreen from '../Screens/MaCoproScreen';
import ActuCoproScreen from '../Screens/ActuCoproScreen';
import InfoCoproScreen from '../Screens/InfoCoproScreen';
import ProblemeCoproScreen from '../Screens/ProblemeCoproScreen';
import EauProblemeScreen from '../Screens/EauProblemeScreen';
import ElecProblemeScreen from '../Screens/ElecProblemeScreen';
import EntretienProblemeScreen from '../Screens/EntretienProblemeScreen';
import AutreProblemeScreen from '../Screens/AutreProblemeScreen';
import ContactCoproScreen from '../Screens/ContactCoproScreen';
import MesInfosScreen from '../Screens/MesInfosScreen';
import MesContactsScreen from '../Screens/MesContactsScreen';
import ParametresScreen from '../Screens/ParametresScreen';

// Exemple final
const SignUpStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
    CreaCopro: CreaCoproScreen,
    SetHouse: SetHouseScreen,
    SetImmo: SetImmoScreen
  },
  {headerMode: 'none'}
);

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,        
    })
  },
  SignIn: SignInScreen,
  Forgot: {
      screen: ForgotScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#3498db',
        },
        title: 'Question secrète',        
      })
  },
  SignUp: {
    screen: SignUpStack,
    navigationOptions: ({ navigation }) => ({
      header: null,        
    })
  },
  // Home: {
  //     screen: HomeScreen,
  //     navigationOptions: ({ navigation }) => ({
  //       headerLeft:(DrawerMenu
  //       ),
  //       headerStyle: {
  //         backgroundColor: '#FF9800'
  //       },
  //       headerTintColor: '#fff',
  //     })
  // },
}, {headerLayoutPreset: 'center'});



const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      // headerLeft:(DrawerMenu
      // ),
      // headerStyle: {
      //   backgroundColor: '#3498db',
      //   elevation: 0
      // },
      // headerTintColor: '#fff',
      header: null     
    })
  },
  MaCopro: {
    screen: MaCoproScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#9b59b6',
        // elevation: 0,
        },
        title: 'Ma Copropriété',       
    })
  },
  ActuCopro: {
    screen: ActuCoproScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#fad390',
        // elevation: 0,
        },
        title: 'Timeline',       
    })
  },
  InfoCopro: {
    screen: InfoCoproScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#78e08f',
        // elevation: 0,
        },
        title: 'Informations de la copropriété',       
    })
  },
  ProblemeCopro: {
    screen: ProblemeCoproScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#e55039',
        // elevation: 0,
        },
        title: 'Signaler un problème',       
    })
  },
  EauProbleme: {
    screen: EauProblemeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#e55039',
        // elevation: 0,
        },
        title: 'Signaler un problème',       
    })
  },
  ElecProbleme: {
    screen: ElecProblemeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#e55039',
        // elevation: 0,
        },
        title: 'Signaler un problème',       
    })
  },
  EntretienProbleme: {
    screen: EntretienProblemeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#e55039',
        // elevation: 0,
        },
        title: 'Signaler un problème',       
    })
  },
  AutreProbleme: {
    screen: AutreProblemeScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#e55039',
        // elevation: 0,
        },
        title: 'Signaler un problème',       
    })
  },
  ContactCopro: {
    screen: ContactCoproScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#82ccdd',
        // elevation: 0,
        },
        title: 'Contacts de la Copropriété',       
    })
  },
  MesInfos: {
    screen: MesInfosScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#2ecc71',
        // elevation: 0,
        },
        title: 'Mes informations',       
    })
  },
  MesContacts: MesContactsScreen,
  Parametres: {
    screen: ParametresScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#1abc9c',
        elevation: 0
      },
      title: 'Paramètres'       
    })
  },
},{
  navigationOptions: ({ navigation }) => ({
      headerLeft:(DrawerMenu
      ),
      headerStyle: {
        backgroundColor: '#FF9800'
      },
      headerTintColor: '#fff',
  })
});

const DrawNav = createDrawerNavigator({
  Homepage: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        headerLeft:(DrawerMenu
        ),
        headerStyle: {
          backgroundColor: '#FF9800'
        },
        headerTintColor: '#fff',
      })
    }     
},{
  contentComponent: SideMenu,
  drawerWidth: Dimensions.get('window').width - 120, 
});

const RootSwitch = createSwitchNavigator({ AuthStack, DrawNav }, {initialRouteName: 'AuthStack'});

export default Navigation = createAppContainer(RootSwitch);




























// ROUTER DE TEST POUR CREATION

// const Home = createStackNavigator({
//     CreaCopro: CreaCoproScreen,
//     Login: LoginScreen,
//     SignIn: SignInScreen,
//     SignUp: SignUpScreen,
//     Forgot: ForgotScreen,
//     Home: HomeScreen,
//     MaCopro: MaCoproScreen,
//     MesInfos: MesInfosScreen,
//     MesContacts: MesContactsScreen,
//     Parametres: ParametresScreen,
// }, {
//     headerMode: 'none',
//     initialRouteName: 'Home'
// });

// export default Navigation = createAppContainer(Home);
