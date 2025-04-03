import { ENV_INFO } from "../env";

const TOKEN_KEY = "tenant_access_token";
const TOKEN_TIMESTAMP_KEY = "tenant_access_token_timestamp";
const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

// APIのベースURLを環境に応じて取得する関数
export function getApiBaseUrl(): string {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? "/proxy" : "https://open.larksuite.com/open-apis";
}

async function handleFetch(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    console.error(JSON.stringify(errorData, null, 4));
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function getValidAccessToken(): Promise<string> {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);

  if (storedToken && storedTimestamp) {
    const timestamp = parseInt(storedTimestamp, 10);
    const currentTime = Date.now();

    if (currentTime - timestamp < TOKEN_EXPIRATION_TIME) {
      return storedToken;
    }
  }

  return await fetchNewToken();
}

export async function getDocumentBlocks(documentId: string) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/docx/v1/documents/${documentId}/blocks?document_revision_id=-1&page_size=500`;
  const accessToken = await getValidAccessToken();

  return await handleFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// トークンをAPIから取得する関数
export async function fetchNewToken(): Promise<string> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/auth/v3/tenant_access_token/internal`;

  const response = await handleFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: ENV_INFO.app_id,
      app_secret: ENV_INFO.app_secret,
    }),
  });

  const newToken = response.tenant_access_token;
  localStorage.setItem(TOKEN_KEY, newToken);
  localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());

  return newToken;
}

export async function getFile(fileToken: string): Promise<Blob> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/drive/v1/medias/${fileToken}/download`;
  const accessToken = await getValidAccessToken();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(JSON.stringify(errorData, null, 4));
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.blob();
}

export async function getCommentContent(fileToken: string) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/drive/v1/files/${fileToken}/comments/?file_type=docx`;
  const accessToken = await getValidAccessToken();

  return await handleFetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
