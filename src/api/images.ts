import axios from "axios";

export const getRandomImages = async() => {

    const config = {
        method: 'get',
        url: 'https://picsum.photos/v2/list?page=12&limit=15',
    };

    const resp = await axios(config);
   
    return resp.data;

}