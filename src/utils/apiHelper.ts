import { ENV_INFO } from "../env";
import axios from "axios";

const TOKEN_KEY = "tenant_access_token";
const TOKEN_TIMESTAMP_KEY = "tenant_access_token_timestamp";
const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

export async function getDocumentBlocks(
  documentId: string,
  accessToken: string,
) {
  const url = `/api/${documentId}/blocks?document_revision_id=-1&page_size=500`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error(JSON.stringify(error.response?.data, null, 4));
    } else {
        console.error(error);
    }
    throw error;
  }
}

// トークンをRSまたはAPIから取得する関数
export async function getTenantAccessToken(): Promise<string> {
  // ローカルストレージからトークンとタイムスタンプを取得
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);

  if (storedToken && storedTimestamp) {
    const timestamp = parseInt(storedTimestamp, 10);
    const currentTime = new Date().getTime();

    // トークンが有効期限内
    if (currentTime - timestamp < TOKEN_EXPIRATION_TIME) {
      console.log("RSにあるトークンを使用しました。");
      return storedToken;
    }
  }

  // トークンが存在しないor期限切れの場合は新しいトークンを取得
  return await fetchNewToken();
}

// トークンをAPIから取得する関数
export async function fetchNewToken() {
  const url = "/ta-api/tenant_access_token/internal";

  console.log("新しいtenant_access_tokenを取得します");

  try {
    const response = await axios.post(url, {
      app_id: ENV_INFO.app_id,
      app_secret: ENV_INFO.app_secret,
    });

    const newToken = response.data.tenant_access_token;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, new Date().getTime().toString());

    console.log("ローカルストレージに保存しました");
    return newToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error(JSON.stringify(error.response?.data, null, 4));
    } else {
        console.error(error);
    }
    throw error;
  }
}

export async function getFile(fileToken: string, accessToken: string) {
  const url = `/get_file_api/medias/${fileToken}/download`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "arraybuffer",
    });

    // バイナリデータをBlobオブジェクトに変換
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    return blob;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error(JSON.stringify(error.response?.data, null, 4));
    } else {
        console.error(error);
    }
    throw error;
  }
}
