import axios from 'axios';

const API_URI = 'http://localhost:8080/api/v1';

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const GetLinks= async (data)=>{
    try {
        const response = await axios.post(`${API_URI}/getlinks`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}