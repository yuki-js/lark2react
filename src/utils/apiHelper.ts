import { ENV_INFO } from "../env";
import * as lark from "@larksuiteoapi/node-sdk";
import axios from 'axios';

export function connectApi(){
    console.log("connect");

    const documentId = "Lqzudvi1DokvIqxBn2rj94udpob"
    const userAccessToken = "u-eMpvBRUY954ajvojewvyBKYlnPt7k1R9UU0wk4102G81"

    const url = `/api/${documentId}/blocks?document_revision_id=-1&page_size=500`;

    var config = {
        method: 'GET',
        url: url,
        headers: {
          'Authorization': `Bearer ${userAccessToken}`
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.error(JSON.stringify(error.response.data, null, 4));
      });
}






