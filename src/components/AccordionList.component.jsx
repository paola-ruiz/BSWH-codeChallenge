import React, { useContext, useEffect } from "react";
import { Text, FlatList, View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { UserContext } from "../services/users/users.context";
import { useDispatch } from "react-redux";
import { delAlbum } from "../redux/albumSlice";

export const Accordion = ({navigation}) => {
    const { 
        users,  
        albums,
        isLoading,
        complete, 
        usersInformation,
        albumsInformation} = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            usersInformation();
            albumsInformation();
        });
        return unsubscribe;
    }, []);

    function deleteitem(index) {
        const dispatch = useDispatch();
        dispatch(delAlbum(index));
        albumsInformation();
    }

    return(
        <SafeAreaView style={{ flex: 1}}>
        {isLoading ? (
            <View
                style={styles.loader}>
                <ActivityIndicator
                    animating={true}
                    color={'#2699E8'}
                    size={50}
                />
                <Text style={styles.textLoader}>Loading...</Text>
            </View>
        ):(
            <View style={styles.container}>
                <FlatList
                    data={users}
                    renderItem={({item, index}) => {
                        return (
                            <View>
                                <Text style={styles.nameText}>{item.name}</Text>
                                {complete ? (
                                    <FlatList
                                        data={albums}
                                        renderItem={({item, index}) => {
                                            return(
                                                <View style={styles.albumContainer}>
                                                    <TouchableOpacity onPress={() => navigation.navigate("Photos", {
                                                        navigation: navigation,
                                                        id: index,
                                                        title: item
                                                    })}>
                                                        <Text style={styles.albumText}>{item}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={deleteitem(index)}>
                                                        <Text style={styles.deleteBtn}>DEL</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }}>
                                    </FlatList>
                                ) : null}
                                    
                                
                            </View>
                        );
                    }}>
                </FlatList>
            </View>
        )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loader: {
        width: '100%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    textLoader: {
        color: '#000', 
        fontSize: 14, 
        marginVertical: 20, 
        fontWeight: '400'
    },
    container: {
        padding: 20
    },
    nameText: {
        fontSize: 24,
        color: "#207BB9",
        padding: 10
    },
    albumText: {
        fontSize: 16,
        paddingLeft: 30,
        justifyContent: "flex-start",
        alignContent: "flex-start"
    },
    deleteBtn: {
        color: "#FF0000",
        fontSize: 16,
        justifyContent: "flex-end",
        alignContent: "flex-end"
    },
    albumContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 2
    }
});