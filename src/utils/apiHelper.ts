import { ENV_INFO } from "../env";
import axios from 'axios';

export async function getJson(documentId: string, accessToken: string){

    const url = `/api/${documentId}/blocks?document_revision_id=-1&page_size=500`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error(JSON.stringify(error.response.data, null, 4));
        throw error; 
    }
}


export async function getTenantAccessToken(){
    
    const url = '/ta-api/tenant_access_token/internal';

    try {
        const response = await axios.post(url, {
            app_id : ENV_INFO.app_id,
            app_secret : ENV_INFO.app_secret
        })
        
        return response.data.tenant_access_token;
        
    } catch (error){
        throw error; 
    }
}









