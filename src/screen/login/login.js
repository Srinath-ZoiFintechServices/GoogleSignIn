import React from 'react'
import { View, Text, AsyncStorage, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure({
    scopes: [], // if you want access over any api
    webClientId: '88984268841-a991slkhp5p0juiq6ag8qa2udocqscg2.apps.googleusercontent.com', // ClientID from firebase
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});


export default class login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: ''
        }
    }

    signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo }, () => {
                if (this.state.userInfo !== '') {
                    this.props.navigation.navigate('Dashboard', { userInformations: this.state.userInfo })
                }
            });

        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };


    componentDidMount = () => {

    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.signInGoogle() }} activeOpacity={0.8} style={styles.signinWithGoogle}>
                        <View style={{ flex: 0.3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../utilities/images/Google.png')} style={styles.imagestyle} />
                        </View>
                        <View style={styles.buttonLayout}>
                            <Text style={styles.signInTextColor}>Signin With Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    signinWithGoogle: {
        height: 50,
        width: '80%',
        borderColor: commoncolor.LightBlue,
        borderWidth: 1,
        flexDirection: 'row'
    },
    buttonLayout: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: commoncolor.LightBlue,
        justifyContent: 'center'
    },
    signInTextColor: {
        alignSelf: 'center',
        fontFamily: fonts.globalrobotofonts.Rbold,
        fontSize: 16,
        color: commoncolor.White
    },
    imagestyle: {
        width: 50,
        height: 50
    }
});
