import * as React from "react";
import { Form, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";

const Login = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");

  const LoginHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (email == "" || password == "") {
      alert("All fields are neccessary");
      return;
    }
    setIsLoading(true);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9TKebj2BHlEflTTkF_CLumyrAVWkHU5s",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (response.status == 400) {
      const result = await response.json();
      setErrorTxt(result.error.message);
      setIsLoading(false);
      return;
    }
    if (!response.ok) {
      setErrorTxt("Some error occurred");
      setIsLoading(false);
      return;
    }

    const result = await response.json();
    console.log(result);

    localStorage.setItem("email", result.email);
    localStorage.setItem("idToken", result.idToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("localId", result.localId);
    localStorage.setItem("expiresIn", result.expiresIn);

    navigate("/");
  };
  console.log(errorTxt);
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form onSubmit={LoginHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username or Email</Label>
                  <Input name="userEmail" type="email" placeholder="Email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Password</Label>
                  <Input
                    name="userPassword"
                    id="name"
                    placeholder="Enter your Password"
                  />
                </div>
              </div>
              {errorTxt == "" ? (
                <p></p>
              ) : (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  {errorTxt}
                </p>
              )}

              {isLoading ? (
                <Button className="mt-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button className="mt-4">Login</Button>
              )}
            </Form>
          </CardContent>
        </Card>
        <p className="my-6">or</p>
        <Button onClick={props.toggleAuthHandler}>Register</Button>
      </div>
    </>
  );
};

export default Login;
