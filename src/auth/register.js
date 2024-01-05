import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";
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
// import { ProfileForm } from "./form";

const Register = (props) => {
  const [text, setText] = useState(false);
  const [errorText, setErrorTxt] = useState("");
  const registerHandler = async (e) => {
    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;
    e.preventDefault();
    if (email == "" || password == "" || confirmPassword == "") {
      return alert("All fields Neccessary");
    }

    if (password == confirmPassword) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9TKebj2BHlEflTTkF_CLumyrAVWkHU5s",
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
        return;
      }
      if (!response.ok) {
        setErrorTxt("Some Error Occurred");
        return;
      }
      props.toggleAuthHandler();
    } else {
      setText(true);
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Creat An Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={registerHandler}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Enter Email</Label>
                  <Input type="email" placeholder="Email" />
                </div>
                {errorText == "" ? (
                  <p style={{ display: "none" }}></p>
                ) : (
                  <p>{errorText}</p>
                )}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Password</Label>
                  <Input id="name" placeholder="Set your Password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Confirm Password</Label>
                  <Input id="name" placeholder="Confirm Password" />
                </div>
                {text ? (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Password does not match
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-4">
                <Button>Register</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <p className="my-6">or</p>
        <Button onClick={props.toggleAuthHandler}>Login</Button>
      </div>
    </>
  );
};

export default Register;
