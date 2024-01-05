import classes from "./brand.module.css";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todoAction } from "../redux/slice";
const Brand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storageDeleteHandler = () => {
    localStorage.clear();
    dispatch(todoAction.clearTasks());
    navigate("/auth");
  };
  return (
    <div className={classes.brandLogo}>
      <h1>WebTodo</h1>
      <Button onClick={storageDeleteHandler} className={classes.logoutButton}>
        Logout
      </Button>
    </div>
  );
};

export default Brand;
