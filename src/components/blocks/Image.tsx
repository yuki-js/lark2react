import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { useState } from "react";

const imageContainerStyle = css({
  position: "relative",
  marginBottom: "16px",
  maxWidth: "100%",
});

const imageWrapperStyle = css({
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
});

const imageStyle = css({
  display: "block",
  maxWidth: "100%",
  height: "auto",
  transition: "opacity 0.3s ease",
});

const placeholderStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666",
  fontSize: "14px",
});

const errorStyle = css({
  padding: "16px",
  backgroundColor: "#fff3f3",
  color: "#dc3545",
  borderRadius: "4px",
  fontSize: "14px",
  textAlign: "center",
});

export const Image: React.FC = () => {
  const { block } = useCurrentBlock();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!block.image?.token || !block.image.width || !block.image.height) {
    return null;
  }

  const { width, height, token } = block.image;
  const aspectRatio = height / width;

  // In a real implementation, you would construct the image URL using the token
  // This is a placeholder implementation
  const imageUrl = `https://your-api-endpoint/images/${token}`;

  const containerStyle = css({
    paddingBottom: `${aspectRatio * 100}%`,
  });

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setIsLoading(false);
    setError("Failed to load image");
  };

  return (
    <div css={imageContainerStyle}>
      <div css={imageWrapperStyle}>
        <div css={containerStyle}>
          {isLoading && <div css={placeholderStyle}>Loading...</div>}
          {error ? (
            <div css={errorStyle}>{error}</div>
          ) : (
            <img
              src={imageUrl}
              alt=""
              css={[imageStyle, { opacity: isLoading ? 0 : 1 }]}
              onLoad={handleLoad}
              onError={handleError}
              width={width}
              height={height}
            />
          )}
        </div>
      </div>
    </div>
  );
};
