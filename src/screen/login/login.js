import React from 'react'
import { View, Text, AsyncStorage, StyleSheet, Image, TouchableOpacity, Alert, ToastAndroid, BackHandler, NativeModules } from 'react-native';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure({
    scopes: [], // if you want access over any api
    webClientId: '88984268841-a991slkhp5p0juiq6ag8qa2udocqscg2.apps.googleusercontent.com', // ClientID from firebase
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const { BatteryManager } = NativeModules;

export default class login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: '',
            currentUser: '',
            charging: false,
            batteryPercentage: ''
        }
    }
    revokeAccess = async () => {
        try {
            await GoogleSignin.revokeAccess();
            console.log('deleted');
        } catch (error) {
            console.error(error);
        }
    };

    toasterMessage = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            (message),
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }


    signInGoogle = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo !== null) {
                this.props.navigation.navigate('Dashboard', { userInformations: userInfo })
            }

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                this.toasterMessage('You have canceled the login, Please click the button to SignIn')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.toasterMessage('Service not available, Please try again sometime.')
            } else {
                this.toasterMessage('Check you internet connection or Please try again sometime.')
            }
        }
    };

    componentDidMount = () => {
        BatteryManager.updateBatteryLevel().then(resp => {
            this.setState({ charging: resp.isPlugged, batteryPercentage: resp.level })
        })
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }



    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }



    handleBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert("Hold on!", "Are you sure you want to exit?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: commoncolor.topDivider, }}>
                <View style={{ margin: 10, padding: 20, flex: 1, backgroundColor: '#fff', borderRadius: 10, borderColor: '#000', borderWidth: 0.5 }}>
                    <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text>Battery Level</Text>
                            <Text style={{ fontSize: 22 }}>
                                {this.state.charging &&
                                    <Image style={{ width: 25, height: 25 }} source={require('../../utilities/images/Circle-charging.png')} />
                                }
                                {this.state.batteryPercentage}{` %`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.signInGoogle() }} activeOpacity={0.8} style={styles.signinWithGoogle}>
                        <View style={{ flex: 0.3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: commoncolor.White }}>
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
