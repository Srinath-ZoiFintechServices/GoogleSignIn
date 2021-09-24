import React from 'react'
import { View, Text, AsyncStorage, StyleSheet, Image, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId:
      '88984268841-6k021c9vnu7ev04mq68e216s4anp42ud.apps.googleusercontent.com',
  });

export default class GoogleAuth extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.signinWithGoogle}>
                        <View style={{ flex: 0.3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../utilities/images/Google.png')} style={styles.imagestyle} />
                        </View>
                        <View style={styles.buttonLayout}>
                            <Text style={styles.signInTextColor}>Signin With Google</Text>
                        </View>
                    </View>
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
