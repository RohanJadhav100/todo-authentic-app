import Brand from "../elements/brand";
import TodoList from "../elements/todoList";
import AddTask from "../elements/addtask";

const Todo = () => {
  return (
    <>
      <div className="container">
        <Brand />
        <AddTask />
        <TodoList />
      </div>
    </>
  );
};

export default Todo;
