import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';


export default class login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInformations: ''
        }
    }

    componentDidMount = () => {
        if (this.props.route.params.userInformations != undefined && this.props.route.params.userInformations != null && this.props.route.params.userInformations != '') {
            this.setState({ userInformations: this.props.route.params.userInformations }, () => { console.log(this.state.userInformations) })
        }
    }

    render() {
        return (
            this.state.userInformations != '' &&

            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: this.state.userInformations.user.photo }} style={styles.imagestyle} />
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
        width: 200,
        height: 200,
        borderRadius:200
    }
});
