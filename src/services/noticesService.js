import axios from 'axios';

const BASE_URL = 'http://13.125.168.244:8080/notices';

export const fetchNotices = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch notices:', error);
        throw error;
    }
};

export const createNotice = async (notice) => {
    try {
        const response = await axios.post(BASE_URL, notice);
        return response.data;
    } catch (error) {
        console.error('Failed to create notice:', error);
        throw error;
    }
};
