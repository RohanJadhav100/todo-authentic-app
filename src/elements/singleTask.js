import { Checkbox } from "../components/ui/checkbox";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import classes from "./todoList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../redux/slice";
import { useState } from "react";

const SingleTask = (props) => {
  const [isCompleted, setIsCompleted] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [editText, setEditText] = useState(props.title);

  const dispatch = useDispatch();

  const todoData = useSelector((state) => state.todo.tasks);

  // -------DeleteTask-Handler--------
  const deleteHandler = async () => {
    const id = props.id;
    const response = await fetch(
      `https://todoproject-25f58-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
      { method: "DELETE" }
    );
    const index = todoData.findIndex((e) => {
      return e.id == id;
    });
    dispatch(todoAction.delete(index));
  };
  // -------CheckBox-Handler--------
  const checkHandler = async () => {
    const id = props.id;
    const response = await fetch(
      `https://todoproject-25f58-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
      { method: "PATCH", body: JSON.stringify({ isCompleted: isCompleted }) }
    );
    const index = todoData.findIndex((e) => {
      return e.id == id;
    });
    setIsCompleted(!isCompleted);
    dispatch(todoAction.completeHandler({ index, isCompleted }));
  };
  // -------EditTask-Handler--------
  const updateTaskHandler = async () => {
    const id = props.id;
    const response = await fetch(
      `https://todoproject-25f58-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
      { method: "PATCH", body: JSON.stringify({ title: editText }) }
    );
    const index = todoData.findIndex((e) => {
      return e.id == id;
    });
    dispatch(todoAction.editTask({ editedTitle: editText, position: index }));
    setIsEdited(!isEdited);
  };
  return (
    <li>
      <div className={classes.item}>
        <div className={classes.todo_text}>
          <Checkbox
            onClick={checkHandler}
            checked={props.completed}
            className={classes.checkbox}
          />
          {isEdited ? (
            <input
              value={editText}
              className={classes.editInput}
              type="text"
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <label className={!props.completed ? "" : classes.lineText}>
              {props.title}
            </label>
          )}
        </div>
        <div className={classes.icons}>
          {isEdited ? (
            <div>
              <MdDownloadDone onClick={updateTaskHandler} />
              <MdCancel onClick={() => setIsEdited(!isEdited)} />
            </div>
          ) : (
            <div>
              <MdDelete onClick={deleteHandler} />
              <FaEdit onClick={() => setIsEdited(!isEdited)} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default SingleTask;
