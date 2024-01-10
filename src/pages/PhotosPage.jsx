import React, { useContext, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, FlatList, Dimensions, Image } from 'react-native';
import { PhotosContext } from "../services/photos/photos.context";
import { ActivityIndicator } from 'react-native-paper';

export const PhotosPage = ({navigation, id, title}) => {

    const {
        photos,
        error,
        isLoading,
        photosInformation
    } = useContext(PhotosContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({ title: title });
            photosInformation(id);
        });
        return unsubscribe;
    }, []);

    return(
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={styles.loader}>
                    <ActivityIndicator
                        animating={true}
                        color={'#2699E8'}
                        size={50}
                    />
                    <Text style={styles.textLoader}>Loading...</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={photos}
                        numColumns={3}
                        renderItem={(item, index) => {
                            return(
                                <View style={styles.image}>
                                    <Image source={{uri: item.thumbnailUrl}} />
                                </View>
                            );
                        }}
                        >
                        </FlatList>
                </View>
            )}
        </SafeAreaView>
    )
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
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get("window").width / 3
    }
})