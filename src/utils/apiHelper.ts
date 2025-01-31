import { ENV_INFO } from "../env";
import * as lark from "@larksuiteoapi/node-sdk";


export function getUserId(){
    console.log("get user id");
 
    const client = new lark.Client({
        appId: ENV_INFO.app_id,
        appSecret: ENV_INFO.app_secret,
        disableTokenCache: true
    });

    client.authen.oidcAccessToken.create({
        data: {
                grant_type:'authorization_code',
                code:'xMSldislSkdK',
        },
},
    lark.withTenantToken(ENV_INFO.tenant_token)
    ).then(res => {
        console.log(res);
    }).catch(e => {
        console.error(JSON.stringify(e.response.data, null, 4));
    });
}





export function getJson(){
    console.log("get json");
 
    const client = new lark.Client({
        appId: ENV_INFO.app_id,
        appSecret: ENV_INFO.app_secret,
        disableTokenCache: true
    });
    
    client.docx.document.get({
		path: {
			document_id: ENV_INFO.document_id,
		},
	},
	lark.withUserAccessToken(ENV_INFO.user_access_token)
    ).then(res => {
        console.log(res);
    }).catch(e => {
        console.error(JSON.stringify(e.response.data, null, 4));
    });
}




