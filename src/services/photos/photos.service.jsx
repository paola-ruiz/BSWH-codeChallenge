export const photosPerAlbum = async(idAlbum) => {
    const url = "https://jsonplaceholder.typicode.com/photos?albumId=" + idAlbum;
    try{
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.text();
        let responseJson = JSON.parse(data);
        return responseJson;
    } 
    catch (error){
        
    }
}