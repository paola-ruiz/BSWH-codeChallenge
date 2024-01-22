import React, { useContext, useEffect, useState } from "react";
import { Text, FlatList, View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { UserContext } from "../services/users/users.context";
import { useDispatch } from "react-redux";
import { delAlbum } from "../redux/albumSlice";
import { useSelector } from "react-redux";

export const Accordion = ({navigation}) => {
    const { 
        users,  
        albums,
        isLoading,
        usersInformation,
        albumsInformation} = useContext(UserContext);

    const dispatch = useDispatch();
    const deletedAlbum = useSelector((state) => state.album);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            usersInformation();
            albumsInformation(1);
            setCurrentIndex(null);
            checkDeleted();
        });
        return unsubscribe;
    }, []);

    function checkDeleted(){
        //console.log(deletedAlbum.user);
        if(deletedAlbum.user === currentIndex + 1){ //exist a deleted album and user selected has one
            console.log("usuario tiene album eliminado");
        }
    }

    function deleteitem(indexList) {
        const arrAlbum = {"user": currentIndex + 1, "album": indexList}
        dispatch(delAlbum(arrAlbum));
        albums.splice(indexList, 1);
        checkDeleted();
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
                {users.map(({id, name}, index) => {
                    return(
                        <TouchableOpacity 
                            key={id} 
                            onPress={() => {
                                albumsInformation(id);
                                setCurrentIndex(index === currentIndex ? null : index);
                            }} 
                            style={styles.usersContainer}
                            activeOpacity={0.9}>
                            <View style={styles.users}>
                                <Text style={styles.nameText}>{name}</Text>
                               {index === currentIndex && (
                                <FlatList
                                    data={albums}
                                    renderItem={({item, index}) => {
                                    return(
                                        <View style={styles.albumContainer}>
                                            <TouchableOpacity
                                                onPress={() => deleteitem(index)}>
                                                <Text style={styles.deleteBtn}>DEL</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    navigation.navigate("Photos", {
                                                        id: item.id,
                                                        title: item.title
                                            })}}>
                                                <View style={styles.albumTextContainer}>
                                                    <Text style={styles.albumText}>{item.id} - {item.title}</Text> 
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}>
                                </FlatList>
                                ) }
                            </View>
                        </TouchableOpacity>
                    )
                })}
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
        flex: 1
    },
    usersContainer: {
        flexGrow: 1
    },
    users: {
        flexGrow: 1,
        backgroundColor: "#000000"
    },
    nameText: {
        fontSize: 30,
        color: "#FFFFFF",
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: -2
    },
    albumText: {
        fontSize: 20,
        lineHeight: 20 * 1.5,
        textAlign: "left",
        color: "#FFFFFF",
        paddingLeft: 10,
        justifyContent: "flex-start",
        alignContent: "flex-start"
    },
    deleteBtn: {
        color: "#FF0000",
        fontSize: 16,
        justifyContent: "flex-start",
        alignContent: "flex-start"
    },
    albumContainer: {
        flexDirection: 'row',
        padding: 2
    },
    albumTextContainer: {
        paddingLeft: 10
    }
});