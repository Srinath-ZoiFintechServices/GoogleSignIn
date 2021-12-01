import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, BackHandler, Modal, Pressable, ActivityIndicator } from 'react-native';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
} from 'react-native-tourguide';

GoogleSignin.configure({
    scopes: [], // if you want access over any api
    webClientId: '88984268841-a991slkhp5p0juiq6ag8qa2udocqscg2.apps.googleusercontent.com', // ClientID from firebase
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

// const {
//     canStart, // a boolean indicate if you can start tour guide
//     start, // a function to start the tourguide
//     stop, // a function  t  o stopping it
//     eventEmitter, // an object for listening some events
// } = useTourGuideController()

export default class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInformations: '',
            modalVisible: false,
        }
    }

    componentDidMount = () => {
        
        if (useTourGuideController.canStart) {
            // 👈 test if you can start otherwise nothing will happen
            start()
        }
        if (this.props.route.params.userInformations != undefined && this.props.route.params.userInformations != null && this.props.route.params.userInformations != '') {
            this.setState({ userInformations: this.props.route.params.userInformations }, () => { console.log(this.state.userInformations) })
        }

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

    signOut = async () => {
        this.setState({ modalVisible: true })
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ modalVisible: false })
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            this.setState({ modalVisible: false })
        }
    };

    render() {
        return (
            this.state.userInformations != '' &&

            <View style={{ flex: 1, }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.centeredView}>
                            <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                <ActivityIndicator size="large" />
                            </View>
                            <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                <Text>  Signing Out...</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ flex: 0.5, }}>
                    <TouchableOpacity onPress={() => { this.signOut() }} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={styles.signOutText}>{'Sign Out'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: this.state.userInformations.user.photo }} style={styles.imagestyle} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                        <Text style={styles.welcomeStyle}>{'Welcome!'}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.nameStyle}>{this.state.userInformations.user.givenName} {this.state.userInformations.user.familyName}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, }}>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    signOutText: {
        padding: '5%',
        fontSize: 15,
        fontFamily: fonts.globalrobotofonts.Rbold,
        lineHeight: 19,
        color: commoncolor.ErrorColor,
        alignSelf: 'center'
    },
    welcomeStyle: {
        fontSize: 19,
        fontFamily: fonts.globalrobotofonts.Rbold,
        lineHeight: 19,
        color: commoncolor.blue
    },
    nameStyle: {
        fontSize: 18,
        fontFamily: fonts.globalrobotofonts.Rbold,
        lineHeight: 19,
        color: commoncolor.black
    },
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
        width: 200,
        height: 200,
        borderRadius: 200
    },
    centeredView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        height: 60,
        width: '80%',
        backgroundColor: commoncolor.White
    }
});
