import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import classes from "./addtask.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../redux/slice";
import { useState } from "react";
import { json } from "react-router-dom";

const AddTask = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const localId = localStorage.getItem("localId");

  const addData = async () => {
    const data = { title: text, isCompleted: false, createdBy: localId };
    const response = await fetch(
      "https://todoproject-25f58-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      { method: "POST", body: JSON.stringify(data) }
    );

    const taskData = await response.json();
    console.log(taskData);
    dispatch(
      todoAction.add({
        id: taskData.name,
        title: text,
        isCompleted: false,
        createdBy: localId,
      })
    );
    setText("");
  };

  return (
    <div className={classes.addInp}>
      <Input
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
        type="text"
        placeholder="Write Your Task..."
      />
      <Button onClick={addData} className={classes.button} type="submit">
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
