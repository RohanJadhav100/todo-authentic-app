import { useEffect, useState } from "react";
import Login from "./login";
import Register from "./register";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/slice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    const id = localStorage.getItem("localId");
    console.log(id);
    if (id != null) {
      dispatch(authAction.login());
      navigate("/");
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <Login toggleAuthHandler={toggleAuth} />
      ) : (
        <Register toggleAuthHandler={toggleAuth} />
      )}
    </>
  );
};

export default Auth;

// export async function action({ request }) {
//   const formData = await request.formData();
//   const userData = {
//     email: formData.get("userEmail"),
//     password: formData.get("userPassword"),
//     returnSecureToken: true,
//   };

//   const response = await fetch(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9TKebj2BHlEflTTkF_CLumyrAVWkHU5s",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     }
//   );

//   return redirect("/");
// }
