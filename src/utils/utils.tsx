//共有されたリンク(URL)から、document_idを抽出する。
export function extractDocId(url: string): string {
  const match = url.match(/docx\/([a-zA-Z0-9]+)\?/);
  if (!match) {
    throw new Error("Invalid URL: Document ID not found");
  }
  return match[1];
}

//文字列からURLを検出する
export function containsUrl(text: string): boolean {
  const urlPattern = /\bhttps?:\/\/[^\s]+/g;
  // 正規表現がマッチするかをチェック
  return urlPattern.test(text);
}
