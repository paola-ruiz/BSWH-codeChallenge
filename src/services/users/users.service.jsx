export const infoUsers = async() => {
    const url = "https://jsonplaceholder.typicode.com/users";
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
        console.log(error);
    }
}

export const albumsPerUser = async(idUser) => {
    const url = "https://jsonplaceholder.typicode.com/albums?userId=" + idUser;
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