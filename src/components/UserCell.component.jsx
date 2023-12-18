import React, { useContext, useEffect } from "react";
import { Text, FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Album } from "./AlbumCell.component";

export const UserInfo = ({navigation, index, name, albums}) => {

    return(
        <View>
            <Text>{name}</Text>
            <FlatList
                data={albums}
                renderItem={({item, index}) => {
                    return (
                        <Album 
                            navigation={navigation}
                            title={item.title}/>
                    );
                }}>
            </FlatList>
        </View>
    )
}