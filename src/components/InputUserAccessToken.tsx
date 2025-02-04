import { useState } from "react";

function InputUserAccessToken() {
  const [userAccessToken, setUserAccessToken] = useState("");

  const handleChange = (event: { target: { value: any } }) => {
    setUserAccessToken(event.target.value);
  };

  return (
    <div>
      <input
        value={userAccessToken}
        onChange={handleChange}
        placeholder="ここにuser access tokenを入力"
        style={{
          padding: "10px",
          width: "70%",
          marginBottom: "10px",
        }}
      />
    </div>
  );
}

export default InputUserAccessToken;
