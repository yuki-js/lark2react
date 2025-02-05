import { ENV_INFO } from "../env";
import axios from 'axios';

export async function connectApi(documentId: string, userAccessToken: string){

    const url = `/api/${documentId}/blocks?document_revision_id=-1&page_size=500`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${userAccessToken}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error(JSON.stringify(error.response.data, null, 4));
        throw error; 
    }
}






