import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { GOOGLE_SIGNUP, CREATE_USER } from "../graphql/queries"; // Ensure this is your Google Signup mutation

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();


  const [googleSignup, { error: googleError }] = useMutation(GOOGLE_SIGNUP, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.googleSignup);
      navigate('/dashboard')

    },
  });
  
  const [createUser, { loading: createUserLoading}] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.createUser);
      navigate('/dashboard')

    },
  });
  
  const handleGoogleSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse.credential;
    if (!credential) return;
    try {
      // Call the GoogleSignup mutation
      const { data } = await googleSignup({
        variables: { credential },
      });

      console.log("Google signup success:", data);
      // You can store the token or redirect user to the main dashboard here
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPasswordMatch(true);
      return;
    }
    setPasswordMatch(false);
  
    try {
      const { data } = await createUser({
        variables: {
          email:email,
          password:password,
          firstName:fname,
          lastName:lname
        }
      });
      console.log("User created:", data);
      navigate('/dashboard');
      
    } catch (err) {
      console.error("User creation failed:", err);
    }
  };
  



  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">SignUp to Tasker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* First Name and Last Name Inputs */}
          <Input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />

          {/* Email and Password Inputs */}
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
          {passwordMatch && (
            <p className="text-red-500 text-sm">Passwords do not match.</p>
          )}
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Regular Sign-Up Button */}
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            onClick={handleSignup}
            disabled={createUserLoading}
          >
            {createUserLoading ? "Signing Up..." : "Submit"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">or</div>

          {/* Google Sign-Up Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Sign In Failed")}
          />

          {/* Error Handling */}
          {googleError && <p className="text-red-500 text-sm">Error: {googleError.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
