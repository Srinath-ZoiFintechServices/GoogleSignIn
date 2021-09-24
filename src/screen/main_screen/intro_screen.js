import React from 'react';
import { Dimensions, View, Image, Text, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';

export default class intro_screen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            slides: [
                {
                    key: 1,
                    image: require('../../utilities/images/splaceb.png'),
                    backgroundColor: commoncolor.splacea,
                },
                {
                    key: 2,
                    image: require('../../utilities/images/splacea.png'),
                    backgroundColor: commoncolor.splaceb,
                },
                {
                    key: 3,
                    image: require('../../utilities/images/splacec.png'),
                    backgroundColor: commoncolor.splacec,
                }
            ]
        }
    }

    _renderItem = ({ item }) => (
        <View style={{ flex: 1, backgroundColor: item.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.imagestyle} />
            </View>
        </View>
    )

    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Text>{'Go'}</Text>
            </View>
        );
    }

    _renderNextButton = () => {
        return (
            <View>
            </View>
        );
    };

    _onDone = () => {
        this.props.done();
    }

    _renderSkipButton = () => {
        return (
            <View>
                <Text style={{ fontSize: 14, textAlign: "left", color: commoncolor.black, lineHeight: 20, marginTop: "24%", marginLeft: "10%", fontFamily: fonts.globalrobotofonts.Rmedium }}>SKIP</Text>
            </View>
        );
    };

    render() {
        return (
            <AppIntroSlider renderItem={this._renderItem}
                showSkipButton={true}
                data={this.state.slides}
                activeDotStyle={{ backgroundColor: commoncolor.black }}
                renderSkipButton={this._renderSkipButton}
                onDone={this._onDone}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton} />
        )
    }
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#0072bc',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagestyle: {
        alignSelf: 'center',
        height: 300,
        width: 300
    },
    pageContainer: {
        marginTop: 45,
        justifyContent: 'center',

    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headingTestContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 2,
    },
    headingTestContainerText: {
        alignSelf: 'center',
        fontSize: 30,
        lineHeight: 42,
        color: commoncolor.introPageHeader,
        fontFamily: fonts.globalrobotofonts.Rblack
    },
    paraTextContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
    paraTextContainerText: {
        fontSize: 14,
        alignSelf: "flex-start",
        lineHeight: 20,
        color: commoncolor.Tableheader,
        fontFamily: fonts.globalrobotofonts.Rregular
    }
});
