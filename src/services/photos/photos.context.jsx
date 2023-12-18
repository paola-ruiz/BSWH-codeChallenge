import React, { createContext, useState } from "react";
import { photosPerAlbum } from "./photos.service";

export const PhotosContext = createContext();

export const PhotosContextProvider = ({children}) => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const photosInformation = async() => {
        setIsLoading(true);
        setError(false)
        photosPerAlbum(idAlbum).then((P) => {
            setPhotos(P);
            console.log("data photos response: ", P);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(true);
        })
    }

    return(
        <PhotosContext.Provider
            value={{
                photos,
                error, 
                isLoading,
                photosInformation,
            }}>
            {children}
        </PhotosContext.Provider>
    )
}