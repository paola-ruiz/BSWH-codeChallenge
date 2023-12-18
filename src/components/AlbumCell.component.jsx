import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';

export const Album = ({navigation, title}) => {

    const saveInRedux = () => {
        console.log("saving with redux");
    }
    return(
        <View>
            <TouchableOpacity onPress={navigation.navigate("PhotosPage")}>
                <Text>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveInRedux}>
                <Text>DEL</Text>
            </TouchableOpacity>
        </View>
    );
}