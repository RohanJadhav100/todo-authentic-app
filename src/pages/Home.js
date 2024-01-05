import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("localId");
    console.log(id);
    if (id == null) {
      navigate("/auth");
    }
  }, []);
  return (
    <>
      <h1>HOmepage</h1>
    </>
  );
};

export default Homepage;
