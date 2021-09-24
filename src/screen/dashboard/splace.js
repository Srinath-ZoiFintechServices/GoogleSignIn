import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure({
    scopes: [], // if you want access over any api
    webClientId: '88984268841-a991slkhp5p0juiq6ag8qa2udocqscg2.apps.googleusercontent.com', // ClientID from firebase
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

export default class Splace extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser != null) {
            this.props.navigation.navigate('Dashboard', { userInformations: currentUser })
        } else {
            this.props.navigation.navigate('Login')
        }
    };


    componentDidMount = () => {
        this.getCurrentUser();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: commoncolor.LoremIpsum }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../utilities/images/Google.png')} style={styles.imagestyle} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    imagestyle: {
        width: 200,
        height: 200,
        borderRadius: 200
    }
});
