import classes from "./todoList.module.css";
import { useEffect, useState } from "react";
import SingleTask from "./singleTask";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../redux/slice";

const TodoList = () => {
  const [loading, setLoading] = useState(false);
  const task = useSelector((state) => state.todo.tasks);
  console.log(loading);
  console.log(task);
  const dispatch = useDispatch();
  console.log("BUILD");
  const localId = localStorage.getItem("localId");

  useEffect(() => {
    fetch(
      `https://todoproject-25f58-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json?orderBy="createdBy"&equalTo="${localId}"`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(todoAction.addInitial(data));
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <ul className={classes.list}>
          {task.map((item) => {
            return (
              <SingleTask
                key={item.id}
                id={item.id}
                title={item.title}
                completed={item.isCompleted}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default TodoList;
