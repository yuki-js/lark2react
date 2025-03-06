import { useState, useEffect } from "react";
import { getTenantAccessToken, getFile } from "../../utils/apiHelper";
import { HORIZONTAL_ALIGN } from "../../styles/horizontalAlign";

// Define the type for the blockData parameter
interface ImageData {
  token: string;
  height: number;
  width: number;
  align: keyof typeof HORIZONTAL_ALIGN;
}

interface BlockData {
  image: ImageData;
}

// Define the props for the Image component
interface ImageProps {
  blockData: BlockData;
}

export function Image({ blockData }: ImageProps) {
  const token = blockData.image.token;
  const imageHeight = blockData.image.height;
  const imageWidth = blockData.image.width;
  const alignType = HORIZONTAL_ALIGN[blockData.image.align];

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const tenantAccessToken = await getTenantAccessToken();
        const blob = await getFile(token, tenantAccessToken);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);

        //メモリリークを防ぐため
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: alignType,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="image"
          height={imageHeight}
          width={imageWidth}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
