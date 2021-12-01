import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, BackHandler, Modal, Pressable, ActivityIndicator } from 'react-native';
import commoncolor from '../../utilities/constants/color/commoncolor';
import fonts from '../../utilities/constants/fonts/fonts';
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
} from 'react-native-tourguide';

// Add <TourGuideProvider/> at the root of you app!
export default function TourPage() {
    return (
        <TourGuideProvider {...{ borderRadius: 16 }}>
            <AppContent />
        </TourGuideProvider>
    )
}

const AppContent = () => {
    const iconProps = { size: 40, color: '#888888' }

    // Use Hooks to control!
    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    } = useTourGuideController()

    // Can start at mount 🎉
    // you need to wait until everything is registered 😁
    React.useEffect(() => {
        if (canStart) {
            // 👈 test if you can start otherwise nothing will happen
            start()
        }
    }, [canStart]) // 👈 don't miss it!

    const handleOnStart = () => console.log('start')
    const handleOnStop = () => console.log('stop')
    const handleOnStepChange = () => console.log(`stepChange`)

    React.useEffect(() => {
        eventEmitter.on('start', handleOnStart)
        eventEmitter.on('stop', handleOnStop)
        eventEmitter.on('stepChange', handleOnStepChange)

        return () => {
            eventEmitter.off('start', handleOnStart)
            eventEmitter.off('stop', handleOnStop)
            eventEmitter.off('stepChange', handleOnStepChange)
        }
    }, [])

    return (
        <View style={styles.container}>
            {/*
  
            Use TourGuideZone only to wrap your component
  
        */}
            <TourGuideZone
                zone={2}
                text={'A react-native-copilot remastered! 🎉'}
                borderRadius={16}>
                <Text style={styles.title}>
                    {'Welcome to the demo of\n"react-native-tourguide"'}
                </Text>
            </TourGuideZone>
            <View style={styles.middleView}>
                <TouchableOpacity style={styles.button} onPress={() => start()}>
                    <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
                </TouchableOpacity>

                <TourGuideZone zone={3} shape={'rectangle_and_keep'}>
                    <TouchableOpacity style={styles.button} onPress={() => start(4)}>
                        <Text style={styles.buttonText}>Step 4</Text>
                    </TouchableOpacity>
                </TourGuideZone>
                <TouchableOpacity style={styles.button} onPress={() => start(2)}>
                    <Text style={styles.buttonText}>Step 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={stop}>
                    <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
                <TourGuideZone
                    zone={1}
                    shape='circle'
                    text={'With animated SVG morphing with awesome flubber 🍮💯'}
                >
                    {/* <Image source={{ uri }} style={styles.profilePhoto} /> */}
                </TourGuideZone>
            </View>
            <View style={styles.row}>
                <TourGuideZone zone={4} shape={'circle'}>
                    {/* <Ionicons name='ios-contact' {...iconProps} /> */}
                </TourGuideZone>
                {/* <Ionicons name='ios-chatbubbles' {...iconProps} />
                <Ionicons name='ios-globe' {...iconProps} /> */}
                <TourGuideZone zone={5}>
                    {/* <Ionicons name='ios-navigate' {...iconProps} /> */}
                </TourGuideZone>
                <TourGuideZone zone={6} shape={'circle'}>
                    {/* <Ionicons name='ios-rainy' {...iconProps} /> */}
                </TourGuideZone>
                <TourGuideZoneByPosition
                    zone={7}
                    shape={'circle'}
                    isTourGuide
                    bottom={30}
                    left={35}
                    width={300}
                    height={300}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontFamily: fonts.globalrobotofonts.Rregular
    },
    middleView: {
        flex: 1
    },
    button: {
        width: 50,
        height: 100
    },
    buttonText: {
        fontFamily: fonts.globalrobotofonts.Rregular,
        fontSize: 16
    },
    profilePhoto: {
        width: 'auto',
        height: 'auto'
    },
    row:{
        flex:1
    }
});