import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { UsersPage } from "../pages/UsersPage";
import { PhotosPage } from "../pages/PhotosPage";

export const AppNavigation = () => {
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Users" component={UsersPage} options={{ title: "Users" }}/>
                <Stack.Screen name="Photos" component={PhotosPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}