import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/login/login';
import Dashboard from '../screen/dashboard/dashboard';

const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialRouteName="LoginScreen"
            // screenOptions={{
            //     headerStyle: {
            //         backgroundColor: commoncolor.Primary,
            //     },
            //     headerTintColor: commoncolor.White,
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //     },
            // }}
            >
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={Login}
                />
                 <Stack.Screen
                    options={{ headerShown: false }}
                    name="Dashboard"
                    component={Dashboard}
                />
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default Navigation;