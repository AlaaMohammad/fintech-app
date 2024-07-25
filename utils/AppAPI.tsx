import axios from 'axios'
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'web' ? 'http://localhost:8000/api/v1' : 'http://192.168.96.78:8081';

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

const AppAPI = {
    sendSMS: async (phoneNumber: string): Promise<void> => {
        try {
            const response = await instance.post(`${BASE_URL}/sms/${phoneNumber}`, {
                phoneNumber,
            });

            console.log('SMS sent successfully:', response.data);
        } catch (error) {
            console.error('Failed to send SMS:', error);
            throw new Error('Failed to send SMS');
        }
    },
};
export default AppAPI;
