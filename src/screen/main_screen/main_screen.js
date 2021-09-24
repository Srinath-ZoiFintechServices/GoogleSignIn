import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from '../login/login';
import IntroScreen from './intro_screen';
import Navigation from '../../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MainScreen() {

    const [LoginFlag, setLoginFlag] = React.useState(false);

    useEffect(() => {
        AsyncStorage.getItem("LoginScreen").then((val) => {
            if (val != null) {
                if (val == 'true') {
                    setLoginFlag(true)
                } else {
                    setLoginFlag(false)
                }
            }
        });
    }, [])

    const fontConfig = {
        android: {
            regular: {
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'sans-serif-medium',
                fontWeight: 'normal',
            },
            light: {
                fontFamily: 'sans-serif-light',
                fontWeight: 'normal',
            },
            thin: {
                fontFamily: 'sans-serif-thin',
                fontWeight: 'normal',
            },
        }
    };

    const theme = {
        ...DefaultTheme,
        fonts: configureFonts(fontConfig),
    };

    const Done = () => {
        AsyncStorage.setItem("LoginScreen", 'true');
        setLoginFlag(true);
    }

    return (
        LoginFlag ?
            <PaperProvider theme={theme}>
                <Navigation />
            </PaperProvider>
            :
            <IntroScreen done={() => Done()} />
    )
}
