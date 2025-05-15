// components/LoginPage.tsx
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useLazyQuery} from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { GET_USER_TOKEN, GET_USER_TOKEN_WITH_GOOGLE } from "../graphql/queries";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate= useNavigate();
  const [getToken, { loading: loadingLogin }] = useLazyQuery(GET_USER_TOKEN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.getUserToken);
      navigate('/dashboard')
    },
    onError: (err) => {
      alert("Login failed: " + err.message);
    },
  });

  const [googleLogin] = useLazyQuery(GET_USER_TOKEN_WITH_GOOGLE, {
  onCompleted: (data) => {
    setGoogleLoading(false);
    localStorage.setItem("token", data.getUserTokenWithGoogle);
    navigate('/dashboard');
  },
  onError: (err) => {
    setGoogleLoading(false);
    alert("Google login failed: " + err.message);
  },
  });


  const handleLogin = () => {
    if (!email || !password) return alert("Please enter both fields");
    getToken({ variables: { email, password } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleLogin}
            disabled={loadingLogin}
            className="w-full bg-black text-white hover:bg-gray-900"
          >
            {loadingLogin ? "Logging in..." : "Login"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">or</div>
          <div className="flex items-center justify-center">
            {googleLoading ? (
              <Button disabled className="w-full bg-gray-200 text-gray-600">
                Logging in with Google...
              </Button>
            ) : (
              <div className="w-full">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    setGoogleLoading(true); // set loader
                    googleLogin({
                      variables: { credential: credentialResponse.credential },
                    });
                  }
                }}
                onError={() => {
                  setGoogleLoading(false);
                  alert("Google login failed");
                }}
              />
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
