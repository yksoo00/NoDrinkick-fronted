import axios from 'axios';

const BASE_URL = 'http://localhost:8080/notices';

export const fetchNoticeDetail = async (noticeId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${noticeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notice details:', error);
        throw error;
    }
};

export const editNotice = async (noticeId, notice) => {
    try {
        const response = await axios.put(`${BASE_URL}/${noticeId}`, notice);
        return response.data;
    } catch (error) {
        console.error('Error editing notice:', error);
        throw error;
    }
};

export const deleteNotice = async (noticeId) => {
    try {
        await axios.delete(`${BASE_URL}/${noticeId}`);
    } catch (error) {
        console.error('Error deleting notice:', error);
        throw error;
    }
};
