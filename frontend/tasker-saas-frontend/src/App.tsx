import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function App() {
  const responseGoogle = (response: any) => {
    console.log("Google login response:", response);
  };

  return (
    <>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => console.error("Login failed")}
      />
    </>
  );
}

export default App;
